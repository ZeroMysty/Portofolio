'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

interface ModelViewerProps {
  modelUrl?: string;
  className?: string;
  color?: string;
  metalness?: number;
  roughness?: number;
}

export default function ModelViewer({
  modelUrl = '/models/LogoZ.fbx',
  className = 'w-full h-[360px] md:h-[450px]',
  color = '#BABABA0F', // Warna gelap elegan (charcoal / dark graphite)
  metalness = 0.65,
  roughness = 0.3,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup (Aesthetic Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xded8cc, 2.0);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    let loadedObject: THREE.Group | null = null;

    // Target rotasi yang akan diinterpolasi secara halus
    let targetRotationX = 0;
    let targetRotationY = 0;

    // 4. Mouse Tracking Event
    const handleMouseMove = (e: MouseEvent) => {
      // Hitung posisi mouse dari tengah (-1 sampai +1)
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Batasi kemiringan agar proporsional dan elegan
      targetRotationY = normX * (Math.PI / 4); // Maksimal ~45 derajat ke kiri/kanan
      targetRotationX = normY * (Math.PI / 6); // Maksimal ~30 derajat ke atas/bawah
    };

    const handleMouseLeave = () => {
      // Kembali menghadap ke depan saat kursor meninggalkan layar
      targetRotationX = 0;
      targetRotationY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // 5. Load FBX Model
    const loader = new FBXLoader();
    loader.load(
      modelUrl,
      (object) => {
        // Hitung Bounding Box untuk memusatkan dan menormalkan skala
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Pusatkan geometri model
        object.position.x = -center.x;
        object.position.y = -center.y;
        object.position.z = -center.z;

        // Bungkus dalam parent group agar rotasi poros tepat di titik pusat
        const wrapper = new THREE.Group();
        wrapper.add(object);

        // Skala proporsional
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / (maxDim || 1);
        wrapper.scale.setScalar(scale);

        // Terapkan material metalik gelap
        const objectMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: metalness,
          roughness: roughness,
        });

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.material = objectMaterial;
          }
        });

        scene.add(wrapper);
        loadedObject = wrapper;
        setLoading(false);

        // Render frame pertama segera untuk kompilasi shader ke GPU
        renderer.render(scene, camera);

        if (typeof window !== "undefined") {
          (window as any).__MODEL_READY__ = true;
          window.dispatchEvent(new CustomEvent("model-ready"));
        }
      },
      (xhr) => {
        if (xhr.lengthComputable && typeof window !== "undefined") {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99);
          window.dispatchEvent(new CustomEvent("model-progress", { detail: { percent } }));
        }
      },
      (err) => {
        console.error('Error loading FBX 3D model:', err);
        setError('Gagal memuat objek 3D');
        setLoading(false);
        if (typeof window !== "undefined") {
          (window as any).__MODEL_READY__ = true;
          window.dispatchEvent(new CustomEvent("model-ready"));
        }
      }
    );

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 7. Animation Loop (Smooth Lerp Mengikuti Mouse)
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (loadedObject) {
        // Damping / Lerp halus menuju rotasi target
        loadedObject.rotation.y += (targetRotationY - loadedObject.rotation.y) * 0.06;
        loadedObject.rotation.x += (targetRotationX - loadedObject.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);

      if (loadedObject) {
        scene.remove(loadedObject);
      }

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, color, metalness, roughness]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          <span className="text-[11px] font-geo uppercase tracking-widest text-neutral-500">
            Memuat Objek 3D...
          </span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-red-500 font-geo uppercase tracking-wider">
          {error}
        </div>
      )}

      <div ref={containerRef} className="w-full h-full pointer-events-none" />
      
      {!loading && !error && (
        <div className="absolute bottom-2 text-center pointer-events-none text-[10px] font-geo tracking-[0.2em] text-neutral-400 uppercase">
          Arahkan kursor untuk menggerakkan objek 3D
        </div>
      )}
    </div>
  );
}
