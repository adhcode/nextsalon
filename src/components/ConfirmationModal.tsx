"use client";

import { CheckCircle, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerName: string;
    staffName?: string;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    customerName,
    staffName
}: ConfirmationModalProps) {
    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white p-8 md:p-12 w-full max-w-lg shadow-2xl transform transition-all">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Success icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-green-50 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center">
                    <h3 className="font-jakarta text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
                        Thank You,<br />
                        <span className="text-[#FF3B30]">{customerName}!</span>
                    </h3>

                    <p className="font-manrope text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                        {staffName && staffName.trim().length > 0
                            ? `Your feedback about ${staffName} has been submitted. We appreciate you taking the time to help us improve.`
                            : 'Your feedback has been submitted. We appreciate you taking the time to help us improve.'}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-3 font-manrope font-semibold text-lg hover:bg-gray-900 transition-all duration-300"
                        >
                            Continue
                        </button>

                        <a
                            href="https://wa.me/2347085901944?text=Hi%2C%20I%20just%20submitted%20feedback%20and%20wanted%20to%20share%20more%20thoughts"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#29B522] text-white px-8 py-3 font-manrope font-semibold text-lg hover:bg-green-600 transition-all duration-300 group"
                        >
                            Chat on WhatsApp
                            <FaWhatsapp className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 