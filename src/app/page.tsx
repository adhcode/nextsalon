import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="pt-32 pb-40">
                    <div className="max-w-4xl">
                        <h1 className="font-jakarta text-6xl md:text-8xl font-bold text-black mb-12 leading-none tracking-tighter">
                            Your <span className="text-black">Salon</span>,<br />
                            Your <span className="text-[#FF3B30]">Voice</span>
                        </h1>

                        <div className="mb-16">
                            <p className="font-manrope text-2xl md:text-3xl text-gray-600 leading-relaxed font-medium">
                                Share your experience with our team. Your honest feedback helps us create the perfect salon experience for you.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/report"
                                className="inline-flex items-center gap-8 bg-black text-white px-12 py-6 font-manrope font-semibold text-xl hover:bg-gray-900 transition-all duration-300 group"
                            >
                                Give Feedback
                                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>

                            <a
                                href="https://wa.me/2348066624849?text=Hi%2C%20I%20would%20like%20to%20share%20feedback%20about%20my%20salon%20experience"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 text-black px-12 py-6 border-2 border-black font-manrope font-semibold text-xl hover:bg-black hover:text-white transition-all duration-300 group"
                            >
                                Tell Us on WhatsApp
                                <FaWhatsapp className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-white py-40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="max-w-5xl mb-12">
                        <h2 className="font-jakarta text-5xl mb-12 md:text-6xl font-bold text-gray-600 leading-[1.2] tracking-tight">
                            Why Your <br />
                            <span className="text-[#FF3B30]">Feedback</span> <br /> Matters
                        </h2>

                        <p className="font-manrope text-2xl md:text-3xl text-gray-600 leading-relaxed font-medium mb-12">
                            We are committed to providing an excellent experience from the very beginning. Your insights help us understand what we're doing right and where we can improve to make every visit exceptional.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link
                            href="/report"
                            className="inline-flex items-center gap-4 text-black px-12 py-6 border-2 border-black font-manrope font-semibold text-xl hover:bg-black hover:text-white transition-all duration-300 group"
                        >
                            Give Feedback
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <a
                            href="https://wa.me/2348066624849?text=Hi%2C%20I%20would%20like%20to%20share%20feedback%20about%20my%20salon%20experience"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 bg-green-500 text-white px-12 py-6 font-manrope font-semibold text-xl hover:bg-green-600 transition-all duration-300 group"
                        >
                            Tell Us on WhatsApp
                            <FaWhatsapp className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
