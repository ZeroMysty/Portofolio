"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ENVIRONMENT");
  const [isRenderComplete, setIsRenderComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Ref untuk memastikan interval dibersihkan
  const isReadyRef = useRef(false);

  useEffect(() => {
    // Kunci scroll halaman saat splash screen masih aktif
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    const isHomePage = pathname === "/";

    // Fungsi saat seluruh render dan aset selesai
    const handleAllReady = () => {
      isReadyRef.current = true;
      setIsRenderComplete(true);
    };

    // 1. Pantau event model 3D (khusus halaman beranda)
    const handleModelReady = () => {
      handleAllReady();
    };

    const handleModelProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ percent: number }>;
      if (customEvent.detail?.percent) {
        // Skalakan progres unduhan model hingga 92%
        const mapped = Math.min(Math.round(customEvent.detail.percent * 0.92), 92);
        if (mapped > currentProgress && !isReadyRef.current) {
          currentProgress = mapped;
          setProgress(mapped);
          setStatusText("STREAMING 3D GEOMETRY // " + mapped + "%");
        }
      }
    };

    window.addEventListener("model-ready", handleModelReady);
    window.addEventListener("model-progress", handleModelProgress);

    // Jika model ternyata sudah siap sebelum event listener terpasang
    if (typeof window !== "undefined" && (window as unknown as { __MODEL_READY__?: boolean }).__MODEL_READY__) {
      handleAllReady();
    }

    // 2. Pantau kesiapan dokumen & font sistem
    const checkDocumentAndFonts = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch {
        // Fallback jika browser tidak mendukung FontFaceSet
      }

      // Jika bukan di halaman beranda (tidak ada model 3D), langsung siap setelah dokumen & font siap
      if (!isHomePage) {
        handleAllReady();
      }
    };

    checkDocumentAndFonts();

    // 3. Interval progres halus
    // Progres akan bergerak bertahap, namun AKAN BERHENTI dan DIAM di ~90%
    // sampai proses render (model 3D & WebGL frame pertama) benar-benar beres!
    const timer = setInterval(() => {
      if (isReadyRef.current) {
        // Render sudah beres! Naikkan cepat ke 100%
        currentProgress += 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          setStatusText("RENDER COMPLETE // READY");
          clearInterval(timer);

          // Tunggu jeda sejenak (350ms) agar transisi 100% terlihat elegan, lalu buka tirai
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "";
          }, 400);
        } else {
          setProgress(currentProgress);
        }
      } else {
        // Render belum beres: naikkan perlahan hanya sampai batas 90%
        if (currentProgress < 88) {
          currentProgress += Math.floor(Math.random() * 3) + 1;
          setProgress(currentProgress);

          if (currentProgress < 30) {
            setStatusText("INITIALIZING ENVIRONMENT");
          } else if (currentProgress < 65) {
            setStatusText("LOADING ASSETS & TYPOGRAPHY");
          } else {
            setStatusText(isHomePage ? "WAITING FOR 3D RENDER ENGINE..." : "FINALIZING BUFFERS...");
          }
        } else {
          // DIAM DI SINI! Tidak akan pernah melebihi 90% sebelum render selesai
          setStatusText(isHomePage ? "COMPILING 3D SHADERS & BUFFERS..." : "PREPARING SCENE...");
        }
      }
    }, 45);

    // Fallback darurat (maksimum 12 detik) agar tidak macet selamanya jika file FBX gagal total di jaringan pengguna
    const emergencyTimeout = setTimeout(() => {
      if (!isReadyRef.current) {
        handleAllReady();
      }
    }, 12000);

    return () => {
      clearInterval(timer);
      clearTimeout(emergencyTimeout);
      window.removeEventListener("model-ready", handleModelReady);
      window.removeEventListener("model-progress", handleModelProgress);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            }
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#beb4a7] text-[#161108] px-8 md:px-16 py-10 select-none overflow-hidden"
        >
          {/* Subtle noise grain texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Bar: Brand & Context Meta */}
          <div className="relative z-10 flex justify-between items-center text-xs font-mono uppercase tracking-[0.25em]">
            <span className="font-serif italic font-black text-2xl tracking-normal normal-case text-[#161108]">
              Zedzz
            </span>
            <div className="hidden sm:flex items-center gap-3 text-[#161108]/60 text-[10px]">
              <span className={`w-2 h-2 rounded-full ${isRenderComplete ? "bg-[#161108]" : "bg-[#161108] animate-ping"}`} />
              <span>SYS.ARCH // PORTFOLIO 2026</span>
            </div>
          </div>

          {/* Center Stage: Giant Percentage Counter & Live Status */}
          <div className="relative z-10 my-auto flex flex-col items-start space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-8xl sm:text-9xl md:text-[12rem] font-black font-geo tracking-tighter leading-none text-[#161108] tabular-nums">
                {progress.toString().padStart(2, "0")}
              </span>
              <span className="text-3xl sm:text-5xl md:text-6xl font-light font-geo text-[#161108]/40">
                %
              </span>
            </div>

            {/* Dynamic Status Indicator */}
            <div className="flex items-center space-x-3 text-xs md:text-sm font-mono tracking-widest uppercase">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                isRenderComplete ? "bg-[#161108]" : "bg-[#161108] animate-ping"
              }`} />
              <span className="text-[#161108]/80 font-semibold">
                {statusText}
              </span>
            </div>
          </div>

          {/* Bottom Bar: Precision Loading Track & Subtext */}
          <div className="relative z-10 space-y-4 w-full">
            {/* Ultra Thin Progress Bar */}
            <div className="w-full h-[1.5px] bg-black/15 overflow-hidden relative">
              <motion.div
                className="h-full bg-[#161108]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono tracking-[0.2em] text-[#161108]/60 uppercase gap-2">
              <span>SMK WIKRAMA BANDUNG // ROBOTICS &amp; WEB</span>
              <span>
                {isRenderComplete ? "READY TO ENTER" : "HOLD ON — RENDERING SCENE"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
