"use client";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition-link";

export default function Navbar() {
    const pathname = usePathname();
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Project", href: "/project" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="border-b border-gray-100/50 py-7 font-geo uppercase tracking-[0.2em]">
            <div className="max-w-[1920px] mx-auto px-12 flex justify-between items-center">
                <TransitionLink href="/" className="text-2xl font-black text-[#000000] tracking-tighter normal-case">
                    𝒵𝑒𝒹𝓏𝓏
                </TransitionLink>
                <div className="flex gap-10 items-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <TransitionLink 
                                href={link.href} 
                                key={link.href}
                                className={`group relative flex overflow-hidden whitespace-nowrap text-[10px] font-bold ${
                                    isActive ? "text-[#000000]" : "text-[#8f8b85]"
                                }`}
                            >
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
                            </TransitionLink>
                        );
                    })}
                    <div className="w-8 h-[1px] bg-[#8f8b85] mx-2"></div>
                    <a 
                        href="https://www.instagram.com/zaidhifdzulm/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative flex overflow-hidden whitespace-nowrap text-[10px] font-bold text-[#8f8b85]"
                    >
                        {"INSTAGRAM".split("").map((char, i) => (
                            <span 
                                key={i} 
                                className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                                style={{ transitionDelay: `${i * 0.03}s` }}
                            >
                                <span className="block italic">
                                    {char}
                                </span>
                                <span className="absolute italic left-0 top-full block">
                                    {char}
                                </span>
                            </span>
                        ))}
                    </a>
                </div>
            </div>
        </nav>
    )
}