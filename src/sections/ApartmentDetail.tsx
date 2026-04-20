// src/sections/ApartmentDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import {
  MapPin, Bed, Bath, Maximize, Star, ChevronLeft, CheckCircle2,
  ChevronRight, Play, X
} from 'lucide-react';
import { useApartments } from '../context/ApartmentContext';
import { getApartmentById, calculateBookingTotal } from '../services/apartmentService';

export function ApartmentDetail({ onSignIn, onSignUp, onBookNow }: { onSignIn?: () => void, onSignUp?: () => void, onBookNow?: () => void }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apartments } = useApartments();

  const [scrolled, setScrolled] = useState(false);
  const [nights, setNights] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const apartment = getApartmentById(apartments, Number(id));

  if (!apartment) {
    return (
      <>
        <div className="bg-[#f0f2f5] min-h-screen flex flex-col items-center justify-center gap-[20px]">
          <Navbar
          scrolled={false}
          onSignIn={onSignIn || (() => {})}
          onSignUp={onSignUp || (() => {})}
          onBookNow={onBookNow}
        />
          <h2 className="text-[32px] font-[800] text-[#111827] mt-[100px]">Property Not Found</h2>
          <p className="text-[#6b7280]">The apartment you're looking for doesn't exist or was removed.</p>
          <button
            onClick={() => navigate('/apartment')}
            className="bg-[#008751] text-white px-[28px] py-[13px] rounded-[12px] font-[700] border-none cursor-pointer hover:bg-[#005c37] transition-colors"
          >
            Back to Listings
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const { subtotal, cleaningFee, serviceFee, total } = calculateBookingTotal(apartment.pricePerNight, nights);
  const fmt = (n: number) => `₦${n.toLocaleString()}`;

  const prevImage = () => setActiveImage(i => (i - 1 + apartment.images.length) % apartment.images.length);
  const nextImage = () => setActiveImage(i => (i + 1) % apartment.images.length);

  return (
    <>
      <div className="bg-[#f0f2f5] min-h-screen font-sans overflow-x-hidden flex flex-col pb-[40px]">
        <Navbar
          scrolled={scrolled}
          onSignIn={onSignIn || (() => {})}
          onSignUp={onSignUp || (() => {})}
          onBookNow={onBookNow}
        />

        {/* ─── BACK NAV ─── */}
        <div className="max-w-[1126px] mx-auto w-full px-[16px] md:px-[24px] mt-[100px] mb-[20px]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-[6px] text-[#4b5563] font-[600] text-[14px] bg-transparent border-none cursor-pointer hover:text-[#111827] transition-colors p-0"
          >
            <ChevronLeft size={20} /> Back to listings
          </button>
        </div>

        {/* ─── HERO — VIDEO or IMAGE ─── */}
        <div className="max-w-[1126px] mx-auto w-full px-[16px] md:px-[24px] mb-[8px]">
          <div className="w-full h-[280px] md:h-[480px] rounded-[24px] overflow-hidden relative shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
            {apartment.videoUrl ? (
              <video
                autoPlay muted loop playsInline
                poster={apartment.images[0]}
                className="w-full h-full object-cover"
              >
                <source src={apartment.videoUrl} type="video/mp4" />
                {/* Fallback to image if video fails */}
                <img src={apartment.images[0]} alt={apartment.title} className="w-full h-full object-cover" />
              </video>
            ) : (
              <img
                src={apartment.images[activeImage]}
                alt={apartment.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-[20px] left-[20px] bg-white text-[#111827] px-[14px] py-[6px] rounded-[20px] text-[13px] font-[700] shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-[6px]">
              <Star size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
              {apartment.badge} · {apartment.rating.toFixed(1)}
            </div>

            {/* Video tag */}
            {apartment.videoUrl && (
              <div className="absolute top-[20px] right-[20px] flex items-center gap-[6px] bg-black/50 text-white px-[12px] py-[6px] rounded-[20px] text-[12px] font-[600] backdrop-blur-sm">
                <Play size={12} fill="white" /> Video Tour
              </div>
            )}

            {/* Image nav arrows (only if no video and multiple images) */}
            {!apartment.videoUrl && apartment.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white/90 backdrop-blur-sm border-none cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-colors">
                  <ChevronLeft size={20} className="text-[#111827]" />
                </button>
                <button onClick={nextImage} className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white/90 backdrop-blur-sm border-none cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-colors">
                  <ChevronRight size={20} className="text-[#111827]" />
                </button>
              </>
            )}

            {/* Image counter */}
            {!apartment.videoUrl && apartment.images.length > 1 && (
              <div className="absolute bottom-[20px] right-[20px] bg-black/60 text-white px-[12px] py-[6px] rounded-[20px] text-[12px] font-[600] backdrop-blur-sm">
                {activeImage + 1} / {apartment.images.length}
              </div>
            )}
          </div>
        </div>

        {/* ─── IMAGE GALLERY THUMBNAILS ─── */}
        {!apartment.videoUrl && apartment.images.length > 1 && (
          <div className="max-w-[1126px] mx-auto w-full px-[16px] md:px-[24px] mb-[32px]">
            <div className="flex gap-[10px] overflow-x-auto no-scrollbar pb-[4px]">
              {apartment.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-[80px] h-[60px] md:w-[100px] md:h-[72px] rounded-[10px] overflow-hidden border-[2px] transition-all cursor-pointer p-0 bg-transparent ${activeImage === i ? 'border-[#008751] shadow-[0_0_0_2px_rgba(0,135,81,0.2)]' : 'border-[#e5e7eb]'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── MAIN CONTENT GRID ─── */}
        <div className="max-w-[1126px] mx-auto w-full px-[16px] md:px-[24px] grid grid-cols-1 lg:grid-cols-3 gap-[32px] lg:gap-[48px]">

          {/* ─── LEFT: Details ─── */}
          <div className="lg:col-span-2">

            {/* Title & Location */}
            <div className="bg-white rounded-[24px] p-[24px] md:p-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#f3f4f6] mb-[24px]">
              <h1 className="text-[28px] md:text-[38px] font-[800] text-[#111827] leading-[1.2] mb-[12px]">
                {apartment.title}
              </h1>
              <div className="flex items-center gap-[6px] text-[#4b5563] text-[15px] font-[500] mb-[24px]">
                <MapPin size={18} className="text-[#008751]" /> {apartment.address}
              </div>

              <div className="flex items-center flex-wrap gap-[24px] border-t border-[#f3f4f6] pt-[20px]">
                <div className="flex items-center gap-[8px] text-[15px] font-[600] text-[#111827]">
                  <Bed size={20} className="text-[#008751]" /> {apartment.beds} Bedrooms
                </div>
                <div className="flex items-center gap-[8px] text-[15px] font-[600] text-[#111827]">
                  <Bath size={20} className="text-[#008751]" /> {apartment.baths} Bathrooms
                </div>
                <div className="flex items-center gap-[8px] text-[15px] font-[600] text-[#111827]">
                  <Maximize size={20} className="text-[#008751]" /> {apartment.sqft} sqft
                </div>
                <div className="flex items-center gap-[6px] text-[15px] font-[600] text-[#f59e0b] ml-auto">
                  <Star size={18} fill="#f59e0b" /> {apartment.rating.toFixed(1)} ({apartment.reviews.length} reviews)
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[24px] p-[24px] md:p-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#f3f4f6] mb-[24px]">
              <h3 className="text-[20px] font-[800] text-[#111827] mb-[16px]">About this space</h3>
              <p className="text-[15px] md:text-[16px] text-[#4b5563] leading-[1.8]">{apartment.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-[24px] p-[24px] md:p-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#f3f4f6] mb-[24px]">
              <h3 className="text-[20px] font-[800] text-[#111827] mb-[20px]">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[14px] gap-x-[24px]">
                {apartment.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-[12px] text-[15px] text-[#4b5563] font-[500]">
                    <CheckCircle2 size={20} className="text-[#008751] flex-shrink-0" /> {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {apartment.tags.length > 0 && (
              <div className="bg-white rounded-[24px] p-[24px] md:p-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#f3f4f6] mb-[24px]">
                <h3 className="text-[20px] font-[800] text-[#111827] mb-[16px]">Highlights</h3>
                <div className="flex gap-[10px] flex-wrap">
                  {apartment.tags.map(tag => (
                    <span key={tag} className="px-[16px] py-[8px] bg-[#f0fdf4] border border-[#86efac] text-[#166534] rounded-[20px] text-[13px] font-[700]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {apartment.reviews.length > 0 && (
              <div className="bg-white rounded-[24px] p-[24px] md:p-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-[#f3f4f6] mb-[24px]">
                <h3 className="text-[20px] font-[800] text-[#111827] mb-[20px]">
                  Reviews · <span className="text-[#008751]">{apartment.rating.toFixed(1)} ★</span>
                </h3>
                <div className="flex flex-col gap-[20px]">
                  {apartment.reviews.map(review => (
                    <div key={review.id} className="border border-[#f3f4f6] rounded-[16px] p-[20px]">
                      <div className="flex items-center gap-[12px] mb-[12px]">
                        <div className="w-[44px] h-[44px] rounded-full bg-[linear-gradient(135deg,#008751,#005c37)] flex items-center justify-center font-[800] text-white text-[16px] flex-shrink-0">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="font-[700] text-[#111827] text-[15px]">{review.author}</div>
                          <div className="text-[12px] text-[#9ca3af]">{review.date}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-[4px] text-[#f59e0b] font-[700] text-[13px]">
                          <Star size={14} fill="#f59e0b" /> {review.rating}.0
                        </div>
                      </div>
                      <p className="text-[#4b5563] text-[14px] leading-[1.7]">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT: Booking Card ─── */}
          <div className="relative">
            <div className="sticky top-[120px] bg-white rounded-[24px] p-[24px] md:p-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-[#f3f4f6]">
              <div className="mb-[6px]">
                <span className="text-[30px] font-[800] text-[#111827]">{apartment.priceLabel}</span>
                <span className="text-[15px] font-[500] text-[#6b7280]"> {apartment.period}</span>
              </div>
              <div className="flex items-center gap-[6px] text-[#f59e0b] text-[13px] font-[600] mb-[24px]">
                <Star size={14} fill="#f59e0b" /> {apartment.rating.toFixed(1)} · {apartment.reviews.length} review{apartment.reviews.length !== 1 ? 's' : ''}
              </div>

              {/* Nights selector */}
              <div className="border border-[#e5e7eb] rounded-[16px] overflow-hidden mb-[20px]">
                <div className="p-[14px_16px] border-b border-[#e5e7eb]">
                  <div className="text-[11px] font-[800] uppercase text-[#111827] tracking-[0.5px] mb-[6px]">Number of Nights</div>
                  <div className="flex items-center gap-[12px]">
                    <button
                      onClick={() => setNights(n => Math.max(1, n - 1))}
                      className="w-[32px] h-[32px] rounded-full border border-[#e5e7eb] bg-white cursor-pointer flex items-center justify-center font-[700] text-[#374151] hover:border-[#008751] hover:text-[#008751] transition-colors text-[18px] leading-none"
                    >−</button>
                    <span className="text-[18px] font-[800] text-[#111827] min-w-[24px] text-center">{nights}</span>
                    <button
                      onClick={() => setNights(n => Math.min(30, n + 1))}
                      className="w-[32px] h-[32px] rounded-full border border-[#e5e7eb] bg-white cursor-pointer flex items-center justify-center font-[700] text-[#374151] hover:border-[#008751] hover:text-[#008751] transition-colors text-[18px] leading-none"
                    >+</button>
                    <span className="text-[13px] text-[#6b7280] ml-[4px]">{nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-[16px] bg-[linear-gradient(135deg,#008751,#005c37)] text-white rounded-[16px] font-[700] text-[16px] mb-[16px] border-none cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,135,81,0.35)]">
                Reserve Now
              </button>
              <p className="text-center text-[12px] text-[#9ca3af] mb-[24px]">You won't be charged yet</p>

              {/* Price Breakdown */}
              <div className="space-y-[14px] border-b border-[#f3f4f6] pb-[20px] mb-[20px]">
                <div className="flex justify-between text-[14px] text-[#4b5563]">
                  <span className="underline decoration-dotted">{apartment.priceLabel} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span className="font-[600]">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#4b5563]">
                  <span className="underline decoration-dotted">Cleaning fee</span>
                  <span className="font-[600]">{fmt(cleaningFee)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#4b5563]">
                  <span className="underline decoration-dotted">Service fee</span>
                  <span className="font-[600]">{fmt(serviceFee)}</span>
                </div>
              </div>
              <div className="flex justify-between text-[17px] font-[800] text-[#111827]">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      {lightboxOpen && !apartment.videoUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-[3000] flex items-center justify-center p-[16px]"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-[20px] right-[20px] w-[44px] h-[44px] rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <img
            src={apartment.images[activeImage]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-[12px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-white/10 text-white border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
