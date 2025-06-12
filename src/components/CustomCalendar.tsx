"use client";

import { useEffect, useRef } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onClose: () => void;
}

export default function CustomCalendar({ selectedDate, onDateSelect, onClose }: CustomCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleDateChange = (newValue: Value) => {
    if (newValue instanceof Date) {
      onDateSelect(newValue);
    } else if (Array.isArray(newValue) && newValue[0]) {
      onDateSelect(newValue[0]);
    }
  };

  return (
    <div ref={calendarRef} className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 min-w-[300px]">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        maxDate={new Date()}
        className="custom-calendar w-full"
      />

      <style jsx global>{`
                .custom-calendar {
                    border: none !important;
                    font-family: inherit;
                    width: 100%;
                }
                
                .custom-calendar .react-calendar__navigation {
                    margin-bottom: 1rem;
                }
                
                .custom-calendar .react-calendar__navigation button {
                    background: none;
                    border: none;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #374151;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }
                
                .custom-calendar .react-calendar__navigation button:hover {
                    background-color: #f3f4f6;
                    color: #FF3B30;
                }
                
                .custom-calendar .react-calendar__navigation button:disabled {
                    color: #d1d5db;
                }
                
                .custom-calendar .react-calendar__month-view__weekdays {
                    text-align: center;
                    font-weight: 600;
                    font-size: 0.75rem;
                    color: #6b7280;
                    margin-bottom: 0.5rem;
                }
                
                .custom-calendar .react-calendar__month-view__weekdays__weekday {
                    padding: 0.5rem 0.25rem;
                }
                
                .custom-calendar .react-calendar__tile {
                    background: none;
                    border: none;
                    padding: 0.75rem 0.25rem;
                    font-size: 0.875rem;
                    color: #374151;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                    position: relative;
                }
                
                .custom-calendar .react-calendar__tile:hover {
                    background-color: #f3f4f6;
                    color: #FF3B30;
                }
                
                .custom-calendar .react-calendar__tile--active {
                    background-color: #FF3B30 !important;
                    color: white !important;
                }
                
                .custom-calendar .react-calendar__tile--now {
                    background-color: #fef2f2;
                    color: #FF3B30;
                    font-weight: 600;
                }
                
                .custom-calendar .react-calendar__tile--now:hover {
                    background-color: #dcfce7;
                }
                
                .custom-calendar .react-calendar__tile:disabled {
                    color: #d1d5db;
                }
                
                .custom-calendar .react-calendar__tile:disabled:hover {
                    background-color: transparent;
                    color: #d1d5db;
                }
                
                .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
                    color: #d1d5db;
                }
            `}</style>
    </div>
  );
}