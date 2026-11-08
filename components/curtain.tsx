"use client";

import { motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function Curtain() {
  const { status, isMenuOpen } = useTransition();

  const isIdle = status === "idle" && !isMenuOpen;

  if (isIdle) return null;

  const isClosed = status === "closing" || isMenuOpen;

  return (
    <>
      {/* Panel Kiri: Bawah -> Tengah (0%) -> Atas (-100%) */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ 
          y: isClosed ? "0%" : "-100%" 
        }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "50%",
          height: "100vh",
          backgroundColor: "#beb4a7",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Panel Kanan: Atas -> Tengah (0%) -> Bawah (100%) */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ 
          y: isClosed ? "0%" : "100%" 
        }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: "fixed",
          left: "50%",
          top: 0,
          width: "50%",
          height: "100vh",
          backgroundColor: "#beb4a7",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
