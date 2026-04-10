"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence} from "framer-motion";

export default function SplashScreen() {
    const [show, setShow] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2200);

        return() => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    // Animasi saat layar intro menghilang (fade out)
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8}}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-white text-4xl md:text-6xl font-bold tracking-[0.2em]"
                    >
                        𝒵𝑒𝒹𝓏𝓏
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}