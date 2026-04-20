import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react';

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedDate: Date | null;
  label?: string;
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date) {
  return isSameDay(d, new Date());
}

export function DatePickerModal({ open, onClose, onSelect, selectedDate, label = 'Check-in Date' }: DatePickerModalProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState<Date | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    onSelect(d);
    onClose();
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div
        className="bg-white rounded-[28px] shadow-[0_32px_80px_rgba(0,0,0,0.25)] w-full max-w-[420px] overflow-hidden"
        style={{ animation: 'calendarIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Header */}
        <div className="p-[24px_28px_16px] flex items-center justify-between border-b border-[#f3f4f6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#008751]/10 flex items-center justify-center">
              <CalendarDays size={20} className="text-[#008751]" />
            </div>
            <div>
              <div className="text-[11px] font-[700] text-[#9ca3af] uppercase tracking-[0.8px]">{label}</div>
              <div className="text-[15px] font-[700] text-[#111827]">
                {selectedDate
                  ? selectedDate.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'long' })
                  : 'Select a date'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f4f6] border-none flex items-center justify-center text-[#6b7280] cursor-pointer hover:bg-[#e5e7eb] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between px-[28px] py-[16px]">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center cursor-pointer hover:bg-[#f9fafb] hover:border-[#d1d5db] transition-all"
          >
            <ChevronLeft size={16} className="text-[#6b7280]" />
          </button>
          <span className="text-[16px] font-[800] text-[#111827]">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full border border-[#e5e7eb] bg-white flex items-center justify-center cursor-pointer hover:bg-[#f9fafb] hover:border-[#d1d5db] transition-all"
          >
            <ChevronRight size={16} className="text-[#6b7280]" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 px-[16px] mb-[8px]">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-[700] text-[#9ca3af] uppercase py-[4px]">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 px-[16px] pb-[24px] gap-y-[2px]">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} />;

            const date = new Date(viewYear, viewMonth, day);
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const isTodayDate = isToday(date);
            const isHovered = hovered ? isSameDay(date, hovered) : false;

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => !isPast && setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                disabled={isPast}
                className={`
                  relative h-[44px] w-full rounded-[12px] border-none font-sans text-[14px] font-[600] cursor-pointer
                  transition-all duration-150 flex items-center justify-center
                  ${isPast
                    ? 'text-[#d1d5db] cursor-not-allowed bg-transparent'
                    : isSelected
                      ? 'bg-[#008751] text-white shadow-[0_4px_12px_rgba(0,135,81,0.35)] scale-[1.05]'
                      : isTodayDate
                        ? 'bg-[#f0fdf4] text-[#008751] ring-[2px] ring-[#008751]/30'
                        : isHovered
                          ? 'bg-[#f0fdf4] text-[#008751]'
                          : 'text-[#111827] bg-transparent hover:bg-[#f9fafb]'
                  }
                `}
              >
                {day}
                {isTodayDate && !isSelected && (
                  <span className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[#008751]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-[28px] pb-[24px] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-[12px] rounded-[12px] border border-[#e5e7eb] bg-white text-[14px] font-[600] text-[#6b7280] cursor-pointer hover:bg-[#f9fafb] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const todayDate = new Date();
              onSelect(todayDate);
              onClose();
            }}
            className="flex-1 py-[12px] rounded-[12px] bg-[#008751] border-none text-white text-[14px] font-[700] cursor-pointer hover:bg-[#006b40] transition-colors shadow-[0_4px_12px_rgba(0,135,81,0.25)]"
          >
            Today
          </button>
        </div>
      </div>

      <style>{`
        @keyframes calendarIn {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function useDatePicker() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Select Date';

  return {
    open,
    openPicker: () => setOpen(true),
    closePicker: () => setOpen(false),
    selectedDate,
    setSelectedDate,
    formattedDate,
  };
}
