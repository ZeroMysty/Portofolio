"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type TransitionStatus = "idle" | "closing" | "opening";

interface TransitionContextType {
  status: TransitionStatus;
  startTransition: (href: string, callback: () => void) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<TransitionStatus>("opening");
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);

  // Trigger "opening" animation whenever the pathname actually changes
  useEffect(() => {
    setStatus("opening");
    isNavigatingRef.current = false;
    const timer = setTimeout(() => setStatus("idle"), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  const startTransition = (href: string, callback: () => void) => {
    // Prevent double-clicking during an active transition
    if (status !== "idle" && !isNavigatingRef.current) return;

    setStatus("closing");
    isNavigatingRef.current = true;

    // Wait for the closing animation to finish (0.8s)
    setTimeout(() => {
      // Normalize href for comparison (remove trailing slashes, etc.)
      const targetPath = href.split('?')[0].split('#')[0].replace(/\/$/, "") || "/";
      const currentPath = pathname.replace(/\/$/, "") || "/";

      if (targetPath === currentPath) {
        // SAME PAGE: Manually trigger the opening animation since pathname won't change
        callback(); 
        setStatus("opening");
        isNavigatingRef.current = false;
        setTimeout(() => setStatus("idle"), 800);
      } else {
        // DIFFERENT PAGE: Perform navigation and let useEffect [pathname] handle the opening
        callback();
      }
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ status, startTransition }}>
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
