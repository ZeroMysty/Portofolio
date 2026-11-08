import ModelViewer from "@/components/model-viewer";
import TransitionLink from "@/components/transition-link";
import RollingText from "@/components/rolling-text";
import ZigzagPattern from "@/components/zigzag-pattern";

export default function Home() {
  const capabilities = [
    {
      num: "01",
      title: "Full-Stack Development",
      desc: "Building scalable, high-performance web applications with Next.js, TypeScript, and modern backend architecture.",
      tags: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    },
    {
      num: "02",
      title: "Creative 3D & WebGL",
      desc: "Crafting immersive visual experiences, spatial 3D interactions, and smooth physics-driven motion design.",
      tags: ["Three.js", "WebGL", "Framer Motion", "GLSL", "Blender"],
    },
    {
      num: "03",
      title: "Robotics & Embedded Systems",
      desc: "Designing real-time IoT telemetry, microcontroller hardware integration, and robotics control interfaces.",
      tags: ["IoT", "Arduino", "ESP32", "Python", "Sensors"],
    },
  ];

  const featuredProjects = [
    {
      title: "Aether Robotics Interface",
      category: "Robotics & IoT",
      year: "2026",
      desc: "Real-time telemetry dashboard & 3D digital twin controller for multi-axis robotic hardware.",
    },
    {
      title: "OmniStore Platform",
      category: "E-Commerce Architecture",
      year: "2025",
      desc: "High-throughput modular commerce system with instant search, headless CMS, and payment gateways.",
    },
    {
      title: "Zenith Kinetic Canvas",
      category: "Creative Engineering",
      year: "2025",
      desc: "Interactive WebGL visualizer with fluid typography and audio-reactive particle simulations.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-background text-black font-geo animate-fade-in-up overflow-hidden">
      {/* Background Sharp Zigzag Geometric Pattern */}
      <ZigzagPattern opacity={0.09} />

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 md:px-16 pt-20 pb-10">
        {/* Center 3D Object & Hero Headline */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-4">
          <div className="w-full max-w-3xl flex items-center justify-center z-10">
            <ModelViewer
              modelUrl="/models/LogoZ.fbx"
              className="w-full h-[340px] md:h-[440px]"
            />
          </div>

          <div className="text-center z-10 space-y-2 mt-1">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              Creative Developer
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 max-w-md mx-auto font-sans font-light">
              Crafting immersive digital experiences, interactive web applications, and robotics interfaces.
            </p>
          </div>
        </div>

        {/* Scroll Indicator & Direct Nav */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] pt-6">
          <TransitionLink
            href="/project"
            className="group inline-flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
          >
            <RollingText text="Selected Works" />
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
          </TransitionLink>
          <TransitionLink
            href="/about"
            className="group inline-flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
          >
            <RollingText text="About Me" />
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
          </TransitionLink>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PHILOSOPHY QUOTE / INTRO BANNER */}
      {/* ============================================================ */}
      <section className="relative px-6 md:px-16 py-20 border-t border-black/10">

        {/* 1. Teks atas dipindah ke sini agar bisa melebar penuh mengikuti padding container luar (px-6 md:px-16) */}
        <div className="flex justify-between items-center w-full text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
          <span>Philosophy</span>
          <span>&amp;</span>
          <span>Vision</span>
        </div>

        {/* 2. Kontainer max-w-5xl sekarang hanya membungkus kutipan dan nama di bawahnya */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight leading-snug">
            “Bridging the physical and digital world through purposeful code, expressive 3D interactions, and reliable engineering.”
          </h2>

          <div className="flex items-center gap-4 text-xs tracking-wider text-neutral-500 uppercase font-sans">
            <span>Zaid Hifdzul M. (Zedzz)</span>
            <span>—</span>
            <span>SMK Wikrama Bandung</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CAPABILITIES / WHAT I DO */}
      {/* ============================================================ */}
      <section className="relative px-6 md:px-16 py-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-black/10 pb-6">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">
              Core Capabilities
            </h2>
            <span className="text-xs uppercase tracking-widest text-neutral-500">
              Disciplines &amp; Skills
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.num}
                className="group border border-black/10 p-8 flex flex-col justify-between hover:border-black transition-all duration-300 bg-background/50 backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {cap.num}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans font-light leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-8">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-black/5 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FEATURED WORKS PREVIEW */}
      {/* ============================================================ */}
      <section className="relative px-6 md:px-16 py-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end border-b border-black/10 pb-6">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">
              Featured Works
            </h2>
            <TransitionLink
              href="/project"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors cursor-pointer"
            >
              <RollingText text="View All Projects" />
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
            </TransitionLink>
          </div>

          <div className="divide-y divide-black/10">
            {featuredProjects.map((item, idx) => (
              <div
                key={idx}
                className="group py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors hover:px-4 duration-300 cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                    {item.category} • {item.year}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 font-sans max-w-xl">
                    {item.desc}
                  </p>
                </div>

                <TransitionLink
                  href="/project"
                  className="group/btn inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <RollingText text="Explore Work" />
                  <span className="inline-block transition-transform duration-300 ease-out group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">↗</span>
                </TransitionLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="relative px-6 md:px-16 py-24 border-t border-black/10 bg-black text-[#ede8df]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">
              Have a project in mind?
            </span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">
              Let&apos;s Build Something Iconic.
            </h2>
          </div>

          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#ede8df] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300"
          >
            <RollingText text="Start Conversation" />
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
