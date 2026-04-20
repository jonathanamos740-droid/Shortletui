import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePickerModal, useDatePicker } from '../components/DatePickerModal';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Testimonials } from './Testimonials';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApartments } from '../context/ApartmentContext';
import { filterApartments } from '../services/apartmentService';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Search,
  Home,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
} from 'lucide-react';

const benefits = [
  {
    num: "1",
    title: "Verified Listings Only",
    desc: "Every apartment is physically inspected and verified by our team. No fake photos, no surprises."
  },
  {
    num: "2",
    title: "Instant Booking Confirmation",
    desc: "Book and receive confirmation within minutes. Our automated system ensures zero delays."
  },
  {
    num: "3",
    title: "24/7 Guest Support",
    desc: "Our dedicated support team is available round the clock to assist with any issues during your stay."
  }
];

export function Apartments({ onSignIn, onSignUp, onBookNow }: { onSignIn?: () => void, onSignUp?: () => void, onBookNow?: () => void }) {
  const navigate = useNavigate();
  const { apartments } = useApartments();
  const [activeTab, setActiveTab] = useState("Shortlet");
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<'scroll' | 'grid'>('scroll');
  const { open: calOpen, openPicker, closePicker, selectedDate, setSelectedDate, formattedDate } = useDatePicker();

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroTabs = ["Shortlet", "Long Stay", "Buy"];
  const filters = ["All", "Shortlet", "Long Stay", "Luxury", "Budget"];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredProperties = filterApartments(apartments, activeFilter);

  return (
    <>
      <div className="bg-[#f0f2f5] min-h-screen font-sans overflow-x-hidden flex flex-col pb-[22px]">
        <Navbar
          scrolled={scrolled}
          onSignIn={onSignIn || (() => {})}
          onSignUp={onSignUp || (() => {})}
          onBookNow={onBookNow}
        />

        {/* ─── HERO ─── */}
        <section className="rounded-[24px] mt-[80px] lg:mt-[24px] mx-auto box-border overflow-hidden relative min-h-[460px] lg:h-[480px] w-full max-w-[calc(100%-32px)] lg:max-w-[calc(100%-48px)] lg:w-[1126px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-white/20">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.02] transition-transform duration-10000 hover:scale-[1.05]"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
          >
            <source src="/src/assests/4-Bedroom Duplex with Cinema & Swimming Pool 📍 Orchid, Lekki ✨ ACCEPTS PARTY 💵 ₦260,000_ni.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.3)] z-[1]" />

          <div className="relative z-10 flex items-center justify-between p-[20px_5px] md:p-[60px_40px] h-full">
            <div className="w-full max-w-[560px] text-center md:text-left mx-auto md:mx-0">
              <div className="inline-flex items-center gap-[6px] mb-4 px-3.5 py-1.5 bg-white/10 text-white rounded-full text-[12px] font-[600] border border-white/20 backdrop-blur-sm md:hidden">
                <CheckCircle2 size={14} />
                Verified Properties Only
              </div>

              <h1 className="text-[40px] md:text-[56px] font-[800] text-white mb-4 leading-[1.1] md:leading-[1.12] drop-shadow-2xl">
                Find Your Perfect{' '}
                <span className="text-[#34d399] drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">Shortlet</span>
                <br className="hidden md:block"/> Apartment
              </h1>

              <p className="text-[15px] md:text-[18px] text-white/90 leading-[1.6] md:leading-[1.7] mb-8 md:mb-10 max-w-[480px] mx-auto md:mx-0 font-[400] drop-shadow-md">
                Browse verified premium apartments across Nigeria. From luxury penthouses to cozy studios,
                find a home that fits your style and budget.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-3 bg-white/95 backdrop-blur-md p-3 md:p-[10px] rounded-[20px] md:rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/50 mb-8 md:mb-10 w-full md:w-auto mx-auto md:mx-0 box-border transition-all hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]">
                <div className="flex gap-2 bg-[#f3f4f6]/80 p-[5px] rounded-xl w-full md:w-auto overflow-x-auto md:overflow-visible box-border flex-shrink-0 no-scrollbar">
                  {heroTabs.map(tab => (
                    <button
                      key={tab}
                      className={`px-4 py-2 md:py-[7px] rounded-lg border-none text-[13px] font-[600] cursor-pointer whitespace-nowrap transition-all duration-200 ${activeTab === tab ? 'bg-white text-[#111827] shadow-sm' : 'bg-transparent text-[#6b7280]'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  onClick={openPicker}
                  className="flex flex-1 items-center gap-3 px-4 w-full md:w-auto h-[44px] md:h-auto border border-[#e5e7eb] md:border-none rounded-xl md:rounded-none box-border bg-transparent cursor-pointer text-left hover:bg-[#f0fdf4] transition-colors"
                >
                  <MapPin size={17} className="text-[#008751] flex-shrink-0" />
                  <span className={`text-[14px] font-[500] ${selectedDate ? 'text-[#008751]' : 'text-[#4b5563]'}`}>
                    {selectedDate ? `Check-in: ${formattedDate}` : 'Select check-in date...'}
                  </span>
                </button>
                <button className="bg-[linear-gradient(135deg,#008751,#005c37)] text-white px-8 py-[14px] rounded-[14px] border-none font-[700] text-[15px] cursor-pointer w-full md:w-auto hover:shadow-[0_8px_20px_rgba(0,135,81,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  <Search size={16} /> Explore
                </button>

                <DatePickerModal
                  open={calOpen}
                  onClose={closePicker}
                  onSelect={setSelectedDate}
                  selectedDate={selectedDate}
                  label="Check-in Date"
                />
              </div>

              <div className="flex gap-8 md:gap-12 justify-center md:justify-start">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[26px] md:text-[32px] font-[800] text-white leading-[1.2] drop-shadow-md">2,500+</span>
                  <span className="text-[12px] md:text-[13px] text-white/70 font-[500]">Verified Listings</span>
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[26px] md:text-[32px] font-[800] text-white leading-[1.2] drop-shadow-md">15k+</span>
                  <span className="text-[12px] md:text-[13px] text-white/70 font-[500]">Happy Guests</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VIRTUAL TOUR (Mobile only) ─── */}
        <section className="bg-transparent p-[16px_16px] lg:hidden sr">
          <div className="bg-[linear-gradient(180deg,#ffffff,#f8fafc)] rounded-[24px] p-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] border border-white/60 relative overflow-hidden ring-1 ring-black/5">
            <div className="flex items-center gap-[14px] mb-[20px]">
              <div className="w-[44px] h-[44px] bg-[#008751]/10 rounded-[12px] flex items-center justify-center text-[#008751]">
                <Play size={20} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-[17px] font-[800] text-[#111827]">Virtual home tour</h3>
                <p className="text-[14px] text-[#6b7280]">Interactive 3D viewing</p>
              </div>
            </div>
            <div className="h-[220px] rounded-[18px] overflow-hidden relative shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-white/20">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Virtual tour" className="w-full h-full object-cover scale-[1.05]" />
              <div className="absolute inset-x-0 bottom-0 p-[24px] bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.4)] to-transparent flex items-end justify-between">
                <div>
                  <h4 className="text-white text-[15px] font-[700] mb-[4px]">Find the best deal</h4>
                  <span className="text-[rgba(255,255,255,0.7)] text-[12px]">Browse thousands of properties</span>
                </div>
                <button className="w-[36px] h-[36px] rounded-full bg-[rgba(255,255,255,0.2)] backdrop-blur-md flex items-center justify-center text-white border border-[rgba(255,255,255,0.3)] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── BENEFITS ─── */}
        <section className="bg-white md:bg-transparent rounded-[24px] md:rounded-none max-w-[calc(100%-48px)] mx-auto w-full md:w-auto p-[24px_16px] md:p-[32px_20px] box-border relative lg:mx-auto lg:w-[1126px]">

          <div className="text-center md:text-center mt-0 md:mt-[40px] mb-[32px] md:mb-[60px] sr">
            <h2 className="text-[28px] md:text-[40px] font-[800] text-[#111827] mb-[12px] md:mb-[16px] leading-[1.2]">We make it easy to find your perfect stay.</h2>
            <p className="text-[14px] md:text-[16px] text-[#6b7280] max-w-[600px] mx-auto md:mx-auto leading-[1.6]">
              Whether it's selling your current home, getting financing, or buying a new home,
              we make it easy and efficient.
            </p>
          </div>

          <div className="flex flex-col gap-[20px] md:hidden sr-stagger">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-[linear-gradient(145deg,#ffffff,#f0fdf4)] rounded-[24px] p-[24px] flex items-start gap-[16px] border border-[#bbf7d0]/60 shadow-[0_8px_20px_rgba(0,135,81,0.06)] backdrop-blur-sm">
                <div className="w-[42px] h-[42px] min-w-[42px] min-h-[42px] bg-[linear-gradient(135deg,#008751,#005c37)] text-white rounded-[12px] flex items-center justify-center font-[800] text-[18px] shadow-[0_4px_12px_rgba(0,135,81,0.3)]">{benefit.num}</div>
                <div>
                  <h3 className="text-[17px] font-[800] text-[#111827] mb-[6px] tracking-tight">{benefit.title}</h3>
                  <p className="text-[14px] text-[#4b5563] leading-[1.6]">{benefit.desc}</p>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/about')} className="flex items-center justify-center gap-[8px] py-[16px] bg-[linear-gradient(135deg,#111827,#1f2937)] text-white rounded-[16px] font-[700] text-[16px] border-none mt-[8px] shadow-[0_10px_20px_rgba(17,24,39,0.15)] hover:shadow-[0_10px_25px_rgba(17,24,39,0.25)] transition-shadow">See why guests love us <ArrowRight size={18} /></button>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-[32px] mt-[40px] sr-stagger">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-[40px_32px_40px_32px] rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] relative pt-[40px]">
                <div className="absolute top-[-20px] left-[32px] w-[48px] h-[48px] bg-[#008751] text-white rounded-full flex items-center justify-center font-[700] text-[18px] shadow-[0_8px_24px_rgba(0,135,81,0.3)]">
                  {benefit.num}
                </div>
                <h3 className="text-[20px] font-[800] text-[#111827] mt-[20px] mb-[12px]">{benefit.title}</h3>
                <p className="text-[15px] text-[#6b7280] leading-[1.6]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROPERTIES ─── */}
        <section className="bg-white md:bg-transparent rounded-[24px] w-full p-[24px_16px] md:p-[32px_24px] mt-[16px] lg:mx-auto lg:w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border overflow-hidden">

          <div className="sr mb-[32px] md:mb-[48px] text-center md:text-left">
            <h2 className="text-[clamp(36px,6vw,72px)] font-[800] leading-[1.05] text-[#111827] mb-[16px] tracking-[-1px]">
              Some of our picked<br className="hidden md:block" />
              <span className="text-[#008751]">properties</span> near<br className="hidden md:block" />
              your location.
            </h2>
            <p className="text-[16px] text-[#6b7280] max-w-[480px] mx-auto md:mx-0">
              Handpicked shortlets ready for your next stay — verified, styled, and waiting for you.
            </p>
          </div>

          <div className="hidden md:block mb-[40px] sr">
            <div className="flex flex-wrap gap-[12px] bg-white p-[10px] rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.06)] w-fit mx-auto md:mx-0 border border-[#f3f4f6]">
              {filters.map(f => (
                <button
                  key={f}
                  className={`px-[24px] py-[12px] rounded-[10px] border-none text-[15px] font-[600] cursor-pointer transition-all duration-200 ${activeFilter === f ? 'bg-[#111827] text-white shadow-[0_4px_12px_rgba(17,24,39,0.2)]' : 'bg-transparent text-[#6b7280] hover:bg-[#f9fafb]'}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-[8px] overflow-x-auto pb-[8px] mb-[24px] md:hidden no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-[16px] py-[8px] rounded-[20px] text-[13px] font-[600] cursor-pointer font-sans transition-colors ${activeFilter === f ? 'border-none bg-[#008751] text-white' : 'border border-[#e5e7eb] bg-white text-[#6b7280]'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex justify-end items-center gap-[8px] mb-[16px] md:hidden">
            <span className="text-[12px] text-[#6b7280] font-[500]">View:</span>
            <button
              onClick={() => setMobileViewMode('scroll')}
              className={`px-[12px] py-[6px] rounded-[8px] text-[12px] font-[600] cursor-pointer font-sans transition-colors ${mobileViewMode === 'scroll' ? 'border-none bg-[#008751] text-white' : 'border border-[#e5e7eb] bg-white text-[#6b7280]'}`}
            >
              Scroll
            </button>
            <button
              onClick={() => setMobileViewMode('grid')}
              className={`px-[12px] py-[6px] rounded-[8px] text-[12px] font-[600] cursor-pointer font-sans transition-colors ${mobileViewMode === 'grid' ? 'border-none bg-[#008751] text-white' : 'border border-[#e5e7eb] bg-white text-[#6b7280]'}`}
            >
              Grid
            </button>
          </div>

          {/* Mobile scroll view */}
          {mobileViewMode === 'scroll' ? (
            <div className="flex overflow-x-auto gap-[16px] pb-[16px] no-scrollbar scroll-smooth snap-x snap-mandatory md:hidden">
              {filteredProperties.slice(0, 6).map((prop, idx) => (
                <div key={prop.id} onClick={() => navigate(`/apartment/${prop.id}`)} className="min-w-[280px] w-[85vw] bg-white rounded-[20px] border border-[rgba(0,0,0,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex-shrink-0 snap-center sr cursor-pointer" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative h-[200px] overflow-hidden">
                    <img src={prop.images[0]} alt={prop.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute top-[16px] left-[16px] bg-[rgba(17,24,39,0.9)] text-white px-[12px] py-[6px] rounded-[20px] text-[12px] font-[600] backdrop-blur-md flex items-center gap-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10">
                      <Star size={12} fill="white" /> {prop.badge}
                    </span>
                    <button className="absolute top-[16px] right-[16px] w-[36px] h-[36px] rounded-full bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-none flex items-center justify-center text-[#9ca3af] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all z-10 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] focus:outline-none" onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}>
                      <Heart size={16}
                        fill={favorites.includes(prop.id) ? '#ef4444' : 'none'}
                        className={favorites.includes(prop.id) ? 'text-[#ef4444]' : ''}
                      />
                    </button>
                  </div>
                  <div className="p-[16px]">
                    <div className="text-[18px] font-[800] text-[#111827] mb-[8px] flex items-baseline gap-[4px]">{prop.priceLabel} <span className="text-[13px] text-[#6b7280] font-[500]">{prop.period}</span></div>
                    <div className="text-[15px] font-[700] text-[#111827] mb-[6px]">{prop.title}</div>
                    <div className="flex items-center gap-[4px] text-[13px] text-[#6b7280] mb-[12px]">
                      <MapPin size={12} /> {prop.address}
                    </div>
                    <div className="flex items-center justify-between pt-[16px] border-t border-[#f3f4f6]">
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Bed size={12} /> {prop.beds} <span className="hidden sm:inline">Beds</span></span>
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Bath size={12} /> {prop.baths} <span className="hidden sm:inline">Baths</span></span>
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Maximize size={12} /> {prop.sqft} <span className="hidden sm:inline">sqft</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[16px] mb-[24px] md:hidden sr-stagger">
              {filteredProperties.map((prop, idx) => (
                <div key={prop.id} onClick={() => navigate(`/apartment/${prop.id}`)} className="w-full bg-white rounded-[20px] border border-[rgba(0,0,0,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative h-[200px] overflow-hidden">
                    <img src={prop.images[0]} alt={prop.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute top-[16px] left-[16px] bg-[rgba(17,24,39,0.9)] text-white px-[12px] py-[6px] rounded-[20px] text-[12px] font-[600] backdrop-blur-md flex items-center gap-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10">
                      <Star size={12} fill="white" /> {prop.badge}
                    </span>
                    <button className="absolute top-[16px] right-[16px] w-[36px] h-[36px] rounded-full bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-none flex items-center justify-center text-[#9ca3af] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all z-10 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] focus:outline-none" onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}>
                      <Heart size={16}
                        fill={favorites.includes(prop.id) ? '#ef4444' : 'none'}
                        className={favorites.includes(prop.id) ? 'text-[#ef4444]' : ''}
                      />
                    </button>
                  </div>
                  <div className="p-[16px]">
                    <div className="text-[18px] font-[800] text-[#111827] mb-[8px] flex items-baseline gap-[4px]">{prop.priceLabel} <span className="text-[13px] text-[#6b7280] font-[500]">{prop.period}</span></div>
                    <div className="text-[15px] font-[700] text-[#111827] mb-[6px]">{prop.title}</div>
                    <div className="flex items-center gap-[4px] text-[13px] text-[#6b7280] mb-[12px]">
                      <MapPin size={12} /> {prop.address}
                    </div>
                    <div className="flex items-center justify-between pt-[16px] border-t border-[#f3f4f6]">
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Bed size={12} /> {prop.beds} <span className="hidden sm:inline">Beds</span></span>
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Bath size={12} /> {prop.baths} <span className="hidden sm:inline">Baths</span></span>
                      <span className="flex items-center gap-[6px] text-[13px] font-[600] text-[#4b5563]"><Maximize size={12} /> {prop.sqft} <span className="hidden sm:inline">sqft</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mb-[48px] sr-stagger">
            {filteredProperties.map((prop) => (
              <div key={prop.id} onClick={() => navigate(`/apartment/${prop.id}`)} className="bg-white rounded-[20px] border border-[#f3f4f6] shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] cursor-pointer">
                <div className="relative h-[280px] overflow-hidden group">
                  <img src={prop.images[0]} alt={prop.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <span
                    className={`absolute top-[20px] left-[20px] px-[14px] py-[6px] rounded-[20px] text-[12px] font-[700] text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] backdrop-blur-md z-10 ${prop.badge === 'Premium' ? 'bg-[#1e1b4b] border-[2px] border-[rgba(255,255,255,0.1)]' : 'bg-[#008751]'}`}
                  >
                    {prop.badge}
                  </span>
                  <button className="absolute top-[20px] right-[20px] w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.9)] backdrop-blur-md border-none flex items-center justify-center text-[#9ca3af] cursor-pointer shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all z-10 hover:scale-110 focus:outline-none" onClick={(e) => { e.stopPropagation(); toggleFavorite(prop.id); }}>
                    <Heart
                      size={18}
                      fill={favorites.includes(prop.id) ? '#ef4444' : 'none'}
                      className={favorites.includes(prop.id) ? 'text-[#ef4444]' : ''}
                    />
                  </button>
                </div>
                <div className="p-[20px_20px_18px]">
                  <div className="text-[24px] font-[800] text-[#111827] mb-[10px] flex items-baseline gap-[6px]">
                    {prop.priceLabel} <span className="text-[14px] text-[#6b7280] font-[600]">{prop.period}</span>
                  </div>
                  <div className="text-[18px] font-[800] text-[#111827] mb-[8px] truncate">
                    {prop.title}
                  </div>
                  <div className="flex items-center gap-[4px] text-[15px] text-[#6b7280] mb-[16px]">
                    <MapPin size={15} /> {prop.address}
                  </div>
                  <div className="flex items-center justify-between pt-[16px] border-t border-[#f3f4f6]">
                    <span className="flex items-center gap-[6px] text-[15px] font-[600] text-[#4b5563]"><Bed size={15} className="text-[#008751]" /> {prop.beds} Beds</span>
                    <span className="flex items-center gap-[6px] text-[15px] font-[600] text-[#4b5563]"><Bath size={15} className="text-[#008751]" /> {prop.baths} Baths</span>
                    <span className="flex items-center gap-[6px] text-[15px] font-[600] text-[#4b5563]"><Maximize size={15} className="text-[#008751]" /> {prop.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-[80px]">
              <Home size={48} className="mx-auto mb-[24px] text-[#008751] opacity-50 block" />
              <h3 className="text-[22px] font-[700] text-[#111827] mb-[8px]">No apartments found</h3>
              <p className="text-[#6b7280]">Try adjusting your filters</p>
            </div>
          )}

          <div className="sr flex justify-center mt-[8px]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-[#111827] text-white px-[40px] py-[16px] rounded-[16px] border-none font-[700] text-[15px] hover:bg-[#1f2937] hover:shadow-[0_12px_24px_rgba(17,24,39,0.15)] hover:-translate-y-1 transition-all cursor-pointer">
              Browse more properties
            </button>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <Testimonials />

      </div>

      <Footer />
    </>
  );
}