"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionStatus = "idle" | "closing" | "opening";

interface TransitionContextType {
  status: TransitionStatus;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  navigateFromMenu: (href: string) => void;
  startTransition: (href: string, callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<TransitionStatus>("opening");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  // Trigger "opening" animation whenever pathname actually changes
  useEffect(() => {
    setStatus("opening");
    setIsMenuOpen(false);
    isNavigatingRef.current = false;
    const timer = setTimeout(() => setStatus("idle"), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Klik '=' -> berubah jadi 'x' dan tirai menutup (animasi closing curtain)
  const openMenu = () => {
    if (status === "closing" || isNavigatingRef.current) return;
    setIsMenuOpen(true);
    setStatus("closing");
  };

  // Klik 'x' (batal) -> tirai terbuka kembali (animasi opening curtain) dan 'x' kembali jadi '='
  const closeMenu = () => {
    setIsMenuOpen(false);
    setStatus("opening");
    setTimeout(() => {
      setStatus("idle");
    }, 500);
  };

  // Klik halaman baru di menu -> tirai terbuka (animasi opening curtain) dan 'x' berubah jadi '=' lagi
  const navigateFromMenu = (href: string) => {
    setIsMenuOpen(false);
    const targetPath = href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    const currentPath = pathname.replace(/\/$/, "") || "/";

    if (targetPath === currentPath) {
      // Halaman sama: cukup buka tirai kembali
      setStatus("opening");
      setTimeout(() => setStatus("idle"), 500);
      return;
    }

    // Tirai sudah dalam posisi tertutup, langsung arahkan ke halaman baru
    // Perubahan pathname di useEffect akan otomatis menjalankan animasi 'opening'
    router.push(href);
  };

  const startTransition = (href: string, callback: () => void) => {
    const targetPath = href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    const currentPath = pathname.replace(/\/$/, "") || "/";

    if (targetPath === currentPath) return;
    if (status === "closing" || isNavigatingRef.current) return;

    setStatus("closing");
    isNavigatingRef.current = true;

    setTimeout(() => {
      callback();
    }, 500);
  };

  return (
    <TransitionContext.Provider
      value={{
        status,
        isMenuOpen,
        openMenu,
        closeMenu,
        navigateFromMenu,
        startTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
