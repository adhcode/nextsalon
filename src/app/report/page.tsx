"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import CustomCalendar from '../../components/CustomCalendar';
import ConfirmationModal from '../../components/ConfirmationModal';
import { submitFeedback } from '../actions/feedback';

const feedbackSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    staff: z.string().min(2, 'Staff name must be at least 2 characters').max(50),
    visitDate: z.string().optional(),
    feedback: z.string().min(10, 'Feedback must be at least 10 characters').max(1000),
    contact: z.string().optional(),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

export default function ReportPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [submittedData, setSubmittedData] = useState<{ name: string; staff: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<FeedbackForm>({
        resolver: zodResolver(feedbackSchema),
    });

    const feedbackValue = watch('feedback', '');

    const onSubmit = async (data: FeedbackForm) => {
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('staff', data.staff);
            formData.append('visitDate', selectedDate ? selectedDate.toISOString().split('T')[0] : '');
            formData.append('feedback', data.feedback);
            formData.append('contact', data.contact || '');

            const result = await submitFeedback(formData);

            if (result.success) {
                setSubmittedData({ name: data.name, staff: data.staff });
                setShowConfirmationModal(true);
                reset();
                setSelectedDate(null);
            } else {
                setSubmitMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        setIsCalendarOpen(false);
    };

    const clearDate = () => {
        setSelectedDate(null);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
        setSubmittedData(null);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="pt-32 pb-40">
                    <div className="max-w-4xl">
                        <div className="mb-16">
                            <h1 className="font-jakarta text-6xl md:text-8xl font-bold text-black mb-12 leading-none tracking-tighter">
                                Share Your<br />
                                <span className="text-[#FF3B30]">Experience</span>
                            </h1>
                            <p className="font-manrope text-2xl md:text-3xl text-gray-600 leading-relaxed font-medium">
                                Help us improve by sharing your honest feedback about our staff and services.
                            </p>
                        </div>

                        <div className="bg-white">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block font-jakarta text-xl font-bold text-black mb-6">
                                        Your Name <span className="text-[#FF3B30]">*</span>
                                    </label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        className="w-full h-16 px-4 py-4 border-2 border-gray-300 focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400 bg-white font-manrope text-xl"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && (
                                        <p className="mt-3 font-manrope text-sm text-[#FF3B30]">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Staff Member Field */}
                                <div>
                                    <label htmlFor="staff" className="block font-jakarta text-xl font-bold text-black mb-6">
                                        Staff Member <span className="text-[#FF3B30]">*</span>
                                    </label>
                                    <input
                                        {...register('staff')}
                                        type="text"
                                        id="staff"
                                        className="w-full h-16 px-4 py-4 border-2 border-gray-300 focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400 bg-white font-manrope text-xl"
                                        placeholder="Enter staff member's name"
                                    />
                                    {errors.staff && (
                                        <p className="mt-3 font-manrope text-sm text-[#FF3B30]">{errors.staff.message}</p>
                                    )}
                                </div>

                                {/* Visit Date Field */}
                                <div>
                                    <label className="block font-jakarta text-xl font-bold text-black mb-6">
                                        Visit Date (Optional)
                                    </label>
                                    <div className="relative">
                                        <div
                                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                            className="w-full h-16 px-4 py-4 border-2 border-gray-300 focus-within:border-black transition-all duration-200 text-left flex items-center justify-between text-black cursor-pointer bg-white"
                                        >
                                            <span className={`font-manrope text-xl ${selectedDate ? 'text-black' : 'text-gray-400'}`}>
                                                {selectedDate ? selectedDate.toLocaleDateString() : 'Select visit date'}
                                            </span>
                                            <Calendar className="h-6 w-6 text-gray-400" />
                                        </div>

                                        {selectedDate && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearDate();
                                                }}
                                                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold"
                                            >
                                                ×
                                            </button>
                                        )}

                                        {isCalendarOpen && (
                                            <div className="absolute top-full left-0 mt-4 z-10">
                                                <CustomCalendar
                                                    onClose={() => setIsCalendarOpen(false)}
                                                    selectedDate={selectedDate}
                                                    onDateSelect={handleDateSelect}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Feedback Field */}
                                <div>
                                    <label htmlFor="feedback" className="block font-jakarta text-xl font-bold text-black mb-6">
                                        Your Feedback <span className="text-[#FF3B30]">*</span>
                                    </label>
                                    <textarea
                                        {...register('feedback')}
                                        id="feedback"
                                        rows={8}
                                        className="w-full px-4 py-4 border-2 border-gray-300 focus:ring-0 focus:border-black transition-all duration-200 resize-none text-black placeholder-gray-400 bg-white font-manrope text-xl leading-relaxed"
                                        placeholder="Share your experience with our staff member. What went well? What could be improved?"
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                        {errors.feedback && (
                                            <p className="font-manrope text-sm text-[#FF3B30]">{errors.feedback.message}</p>
                                        )}
                                        <p className="font-manrope text-sm text-gray-500 ml-auto">
                                            {feedbackValue.length}/1000 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Field */}
                                <div>
                                    <label htmlFor="contact" className="block font-jakarta text-xl font-bold text-black mb-6">
                                        Email (Optional)
                                    </label>
                                    <input
                                        {...register('contact')}
                                        type="email"
                                        id="contact"
                                        className="w-full h-16 px-4 py-4 border-2 border-gray-300 focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400 bg-white font-manrope text-xl"
                                        placeholder="Enter your email for follow-up (optional)"
                                    />
                                    {errors.contact && (
                                        <p className="mt-3 font-manrope text-sm text-[#FF3B30]">{errors.contact.message}</p>
                                    )}
                                </div>

                                {/* Submit Message */}
                                {submitMessage && (
                                    <div className={`flex items-center gap-3 p-6 ${submitMessage.type === 'success'
                                        ? 'bg-green-50 text-green-800'
                                        : 'bg-red-50 text-red-800'
                                        }`}>
                                        {submitMessage.type === 'success' ? (
                                            <CheckCircle className="h-6 w-6" />
                                        ) : (
                                            <AlertCircle className="h-6 w-6" />
                                        )}
                                        <span className="font-manrope text-lg font-medium">{submitMessage.text}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="pt-8">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 font-manrope font-semibold text-xl hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-6 w-6 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Feedback
                                                    <CheckCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>

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
                            </form>
                        </div>

                        <div className="mt-16 text-center">
                            <p className="font-manrope text-xl text-gray-600 leading-relaxed">
                                Your feedback is anonymous and helps us provide better service to all our customers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && submittedData && (
                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={closeConfirmationModal}
                    customerName={submittedData.name}
                    staffName={submittedData.staff}
                />
            )}
        </div>
    );
}