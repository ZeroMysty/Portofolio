"use client";
import { motion } from "framer-motion";

// Tambahkan tipe data { children: React.ReactNode }
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
