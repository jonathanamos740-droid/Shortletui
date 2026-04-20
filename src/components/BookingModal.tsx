// src/components/BookingModal.tsx
// ─── Book Now Modal ─────────────────────────────────────────────────────────
// Triggered by Navbar "Book Now". Shows full apartment grid with navigation
// to detail pages. WhatsApp CTA at bottom.

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Bed, Bath, Star, MessageCircle, MoveRight } from 'lucide-react';
import { useApartments } from '../context/ApartmentContext';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '2348012345678';
const WHATSAPP_MSG = encodeURIComponent("Hi, I'm interested in booking an apartment on ShortletNG. Can you help me?");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export function BookingModal({ open, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const { apartments } = useApartments();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSelect = (id: number) => {
    onClose();
    navigate(`/apartment/${id}`);
  };

  if (!open) return null;

  return (
    // Backdrop
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-[16px] md:p-[24px]"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Modal panel */}
      <div
        className="relative bg-white rounded-[24px] w-full max-w-[1040px] max-h-[90vh] flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{ animation: 'bookingModalIn 0.22s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[24px] md:px-[32px] py-[20px] border-b border-[#f3f4f6] flex-shrink-0">
          <div>
            <h2 className="text-[20px] md:text-[24px] font-[800] text-[#111827] leading-tight">
              Choose Your Apartment
            </h2>
            <p className="text-[13px] text-[#6b7280] mt-[2px]">
              {apartments.length} verified properties available
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] rounded-full bg-[#f3f4f6] border-none cursor-pointer flex items-center justify-center hover:bg-[#e5e7eb] transition-colors flex-shrink-0 ml-[16px]"
            aria-label="Close"
          >
            <X size={18} className="text-[#374151]" />
          </button>
        </div>

        {/* ── Scrollable Grid ── */}
        <div className="overflow-y-auto flex-1 px-[24px] md:px-[32px] py-[24px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[20px]">
            {apartments.map((apt) => (
              <div
                key={apt.id}
                onClick={() => handleSelect(apt.id)}
                className="group bg-white rounded-[16px] border border-[#f3f4f6] shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer transition-all duration-250 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:border-[#d1fae5]"
              >
                {/* Image */}
                <div className="relative h-[160px] overflow-hidden bg-[#f3f4f6]">
                  <img
                    src={apt.images[0]}
                    alt={apt.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Badge */}
                  <span className={`absolute top-[12px] left-[12px] px-[10px] py-[4px] rounded-[20px] text-[11px] font-[700] text-white shadow-sm ${apt.badge === 'Premium' ? 'bg-[#1e1b4b]' : 'bg-[#008751]'}`}>
                    {apt.badge}
                  </span>
                  {/* Rating */}
                  <span className="absolute top-[12px] right-[12px] flex items-center gap-[4px] bg-black/60 text-white px-[8px] py-[4px] rounded-[20px] text-[11px] font-[600] backdrop-blur-sm">
                    <Star size={10} fill="white" /> {apt.rating.toFixed(1)}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-[14px_16px_16px]">
                  <div className="text-[16px] font-[800] text-[#111827] mb-[4px] truncate">
                    {apt.title}
                  </div>
                  <div className="flex items-center gap-[4px] text-[12px] text-[#6b7280] mb-[10px]">
                    <MapPin size={11} className="flex-shrink-0" /> {apt.address}
                  </div>

                  <div className="flex items-center gap-[14px] text-[12px] text-[#4b5563] font-[500] mb-[12px]">
                    <span className="flex items-center gap-[4px]"><Bed size={12} className="text-[#008751]" /> {apt.beds} Beds</span>
                    <span className="flex items-center gap-[4px]"><Bath size={12} className="text-[#008751]" /> {apt.baths} Baths</span>
                  </div>

                  <div className="flex items-center justify-between pt-[12px] border-t border-[#f3f4f6]">
                    <div>
                      <span className="text-[17px] font-[800] text-[#111827]">{apt.priceLabel}</span>
                      <span className="text-[11px] text-[#9ca3af] ml-[4px]">{apt.period}</span>
                    </div>
                    <div className="flex items-center gap-[4px] text-[12px] font-[700] text-[#008751] group-hover:gap-[8px] transition-all">
                      View <MoveRight size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer: WhatsApp CTA ── */}
        <div className="flex-shrink-0 px-[24px] md:px-[32px] py-[18px] border-t border-[#f3f4f6] bg-[#f9fafb] flex flex-col sm:flex-row items-center justify-between gap-[12px]">
          <p className="text-[13px] text-[#6b7280] text-center sm:text-left">
            Not sure which apartment to pick?{' '}
            <span className="font-[600] text-[#111827]">Chat with our team.</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[10px] bg-[#25d366] text-white px-[20px] py-[11px] rounded-[12px] font-[700] text-[13px] no-underline shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:-translate-y-[1px] transition-all flex-shrink-0"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Animation keyframes injected inline */}
      <style>{`
        @keyframes bookingModalIn {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}
