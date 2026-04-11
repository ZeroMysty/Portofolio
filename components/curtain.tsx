"use client";

import { motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

export default function Curtain() {
  const { status } = useTransition();

  const isIdle = status === "idle";

  if (isIdle) return null;

  return (
    <>
      {/* Panel Kiri: Bawah -> Tengah -> Atas */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ 
          y: status === "closing" ? "0%" : "-100%" 
        }}
        transition={{
          duration: 0.8,
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
        }}
      />

      {/* Panel Kanan: Atas -> Tengah -> Bawah */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ 
          y: status === "closing" ? "0%" : "100%" 
        }}
        transition={{
          duration: 0.8,
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
        }}
      />
    </>
  );
}
