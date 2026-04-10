"use client";
import Link from "next/link";

export default function Navbar() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Project", href: "/project" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 py-4 px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">Hello</Link>
                <div className="flex gap-6">
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >{link.name}
                        </Link>
                    ))}
                </div>
            </div>
            
        </nav>
    )
}