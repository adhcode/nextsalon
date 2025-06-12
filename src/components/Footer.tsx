import { Mail, Phone, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center">
                    <p className="font-manrope text-lg text-black mb-4">
                        © {new Date().getFullYear()} NextSalon Igando. All rights reserved.
                    </p>
                    <p className="font-manrope text-base text-gray-600">
                        Built by{' '}
                        <a
                            href="https://uvise.ng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#FF3B30] hover:text-black transition-colors duration-200"
                        >
                            UVISE
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
} 