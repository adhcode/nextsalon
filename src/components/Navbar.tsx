"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/report", label: "Report Staff" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="w-full bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center" aria-label="NextSalon homepage">
                    <div className="w-32 h-8">
                        <Image
                            src="/logo.svg"
                            alt="NextSalon"
                            width={100}
                            height={100}
                            className="w-full h-full"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-600 hover:text-[#FF3B30] font-medium transition-all duration-200 relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF3B30] transition-all duration-200 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Ultra sleek hamburger menu */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    aria-label="Toggle Menu"
                >
                    <div className="relative w-5 h-4 flex flex-col justify-between">
                        <span
                            className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ease-out transform-gpu ${open ? 'rotate-45 translate-y-1.5' : ''
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ease-out transform-gpu ${open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                }`}
                        />
                        <span
                            className={`block h-0.5 w-full bg-gray-900 rounded-full transition-all duration-300 ease-out transform-gpu ${open ? '-rotate-45 -translate-y-1.5' : ''
                                }`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ease-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="px-6 py-6 space-y-1">
                    {links.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-3 px-4 text-gray-600 hover:text-[#FF3B30] hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 ${open ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{ transitionDelay: open ? `${index * 50}ms` : '0ms' }}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
