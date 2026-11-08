"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import RollingText from "./rolling-text";

export default function Navbar() {
    const pathname = usePathname();
    const { isMenuOpen, openMenu, closeMenu, navigateFromMenu } = useTransition();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Project", href: "/project" },
        { name: "Contact", href: "/contact" },
    ];

    const menuImages: Record<string, { src: string; caption: string; tag: string }> = {
        "/": {
            src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
            caption: "Kinetic Spatial 3D Web",
            tag: "Hero // 2026",
        },
        "/about": {
            src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
            caption: "Software Engineering & Craft",
            tag: "Biography",
        },
        "/project": {
            src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
            caption: "Robotics, WebGL & IoT Systems",
            tag: "Archive",
        },
        "/contact": {
            src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
            caption: "Available For Global Inquiries",
            tag: "Connect",
        },
    };

    const [activeHover, setActiveHover] = useState<string>(pathname || "/");

    // Sinkronkan active hover dengan rute saat ini
    useEffect(() => {
        setActiveHover(pathname || "/");
    }, [pathname, isMenuOpen]);

    // Tutup menu jika pengguna menekan tombol Escape di keyboard
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                closeMenu();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen, closeMenu]);

    // Kunci scroll body saat tirai/menu terbuka
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const currentMedia = menuImages[activeHover] || menuImages["/"];

    return (
        <>
            {/* Header / Navbar Bar */}
            <nav className="fixed top-0 left-0 w-full z-[10002] pointer-events-none bg-transparent py-6 font-geo uppercase tracking-[0.2em]">
                <div className="max-w-[1920px] mx-auto px-8 md:px-14 flex justify-between items-center pointer-events-none">
                    {/* Logo: Rata kiri dengan panduan kontainer */}
                    <button
                        onClick={() => {
                            if (isMenuOpen) {
                                navigateFromMenu("/");
                            } else if (pathname !== "/") {
                                navigateFromMenu("/");
                            }
                        }}
                        className="text-2xl md:text-3xl font-black text-[#000000] tracking-tighter normal-case py-1 p-0 m-0 text-left relative z-[10003] cursor-pointer focus:outline-none pointer-events-auto"
                    >
                        𝒵𝑒𝒹𝓏𝓏
                    </button>

                    {/* Tombol Hamburger: '=' berubah menjadi 'x' saat diklik */}
                    <button
                        onClick={() => {
                            if (isMenuOpen) {
                                closeMenu();
                            } else {
                                openMenu();
                            }
                        }}
                        className="relative z-[10003] flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer focus:outline-none p-2 pointer-events-auto"
                        aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                    >
                        <span
                            className={`h-[2px] w-6 bg-black transition-all duration-300 ease-in-out ${
                                isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                            }`}
                        />
                        <span
                            className={`h-[2px] w-6 bg-black transition-all duration-300 ease-in-out ${
                                isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                            }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Menu Overlay: Tampilan Split dengan Garis Sejajar Presisi di Sisi Kiri */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="fixed inset-0 z-[10000] flex flex-col justify-between pt-24 pb-8 pointer-events-auto overflow-y-auto"
                    >
                        {/* Kontainer Master Berbagi Padding yang Persis dengan Navbar (px-8 md:px-14) */}
                        <div className="max-w-[1920px] w-full mx-auto px-8 md:px-14 flex-1 flex flex-col justify-between">
                            {/* ============================================================ */}
                            {/* MAIN CONTENT: SPLIT MENU & SHOWCASE PHOTO */}
                            {/* ============================================================ */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto py-6">
                                {/* Kolom Kiri: Daftar Menu Navigasi & Socials Sejajar Lurus */}
                                <div className="lg:col-span-6 flex flex-col justify-center items-start space-y-8">
                                    <div className="flex flex-col space-y-2 md:space-y-4 items-start w-full">
                                        {navLinks.map((link) => {
                                            const isActive = pathname === link.href;
                                            const isHovered = activeHover === link.href;

                                            return (
                                                <button
                                                    key={link.href}
                                                    onMouseEnter={() => setActiveHover(link.href)}
                                                    onClick={() => navigateFromMenu(link.href)}
                                                    className={`group relative flex items-center text-left p-0 m-0 py-1 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-geo uppercase cursor-pointer ${
                                                        isActive
                                                            ? "text-[#000000]"
                                                            : "text-[#69645d]"
                                                    }`}
                                                >
                                                    <span className="relative flex overflow-hidden leading-none text-left">
                                                        {link.name.split("").map((char, i) => (
                                                            <span
                                                                key={i}
                                                                className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                                                                style={{ transitionDelay: `${i * 0.03}s` }}
                                                            >
                                                                <span className="block italic">
                                                                    {char === " " ? "\u00A0" : char}
                                                                </span>
                                                                <span className="absolute italic left-0 top-full block">
                                                                    {char === " " ? "\u00A0" : char}
                                                                </span>
                                                            </span>
                                                        ))}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Social Links di Bawah Menu Kiri (Sejajar Lurus dengan Menu & Zedzz) */}
                                    <div className="pt-4 flex items-center gap-6 text-[#161108] p-0 m-0">
                                        <a
                                            href="https://www.instagram.com/zaidhifdzulm/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-60 transition-opacity p-0"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-60 transition-opacity p-0"
                                            aria-label="GitHub"
                                        >
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://linkedin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:opacity-60 transition-opacity p-0"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Showcase Image */}
                                <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center">
                                    <div className="w-full max-w-lg lg:max-w-xl space-y-3">
                                        <div className="relative aspect-[16/10] w-full overflow-hidden border border-black/15 shadow-2xl bg-black/10">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentMedia.src}
                                                    src={currentMedia.src}
                                                    alt={currentMedia.caption}
                                                    initial={{ opacity: 0, scale: 1.05 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="w-full h-full object-cover select-none"
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {/* Caption Image */}
                                        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-neutral-700 uppercase tracking-widest pt-1">
                                            <span>{currentMedia.caption}</span>
                                            <span className="font-bold opacity-60">{currentMedia.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ============================================================ */}
                            {/* FOOTER: SEJAJAR LURUS DENGAN MENU DI KIRI & FOTO DI KANAN */}
                            {/* ============================================================ */}
                            {/* FOOTER: 4 EQUAL COLUMNS DENGAN GAP PERSIS SAMA */}
                            {/* ============================================================ */}
                            {/* FOOTER: SEJAJAR LURUS DENGAN MENU DI KIRI & FOTO DI KANAN */}
                            {/* ============================================================ */}
                            <div className="w-full border-t border-black/15 pt-5 text-[10px] md:text-[11px] font-mono tracking-wider text-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start p-0 m-0">
                                {/* Sisi Kiri Footer (lg:col-span-6): PERSIS SEJAJAR DENGAN MENU & ZEDZZ */}
                                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                                    <div>
                                        <span className="font-bold uppercase tracking-widest block text-black text-left p-0 m-0">
                                            Get in touch
                                        </span>
                                    </div>

                                    <div>
                                        <span className="opacity-80 block text-left">For inquiries:</span>
                                        <span className="block font-semibold text-left">
                                            <a
                                                href="mailto:zaidhifdzulmumtaz@gmail.com"
                                                className="group inline-block text-left break-all sm:break-normal cursor-pointer"
                                            >
                                                <RollingText text="zaidhifdzulmumtaz@gmail.com" />
                                            </a>
                                        </span>
                                    </div>
                                </div>

                                {/* Sisi Kanan Footer (lg:col-span-6): PERSIS SEJAJAR DENGAN TEPI FOTO & CAPTION DI ATAS */}
                                <div className="lg:col-span-6 flex flex-col items-start lg:items-end">
                                    <div className="w-full max-w-lg lg:max-w-xl flex justify-between items-start gap-4">
                                        {/* Tepi Kiri: Studio & Base (SEJAJAR LURUS TEPI KIRI FOTO & CAPTION) */}
                                        <div className="text-left">
                                            <span className="block opacity-80 text-left">Studio &amp; Base</span>
                                            <span className="block font-semibold text-left">Bandung, West Java, ID</span>
                                            <span className="block text-[9px] opacity-60 text-left">Tel: +62 812 3456 7890</span>
                                        </div>

                                        {/* Tepi Kanan: Copyright (SEJAJAR LURUS TEPI KANAN FOTO) */}
                                        <div className="text-right">
                                            <span className="block opacity-80 text-right">
                                                © 2026 Zedzz. All Rights Reserved
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
