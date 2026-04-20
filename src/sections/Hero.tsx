import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePickerModal, useDatePicker } from '../components/DatePickerModal';
import { PopInText } from '../components/PopInText';
import { StatCounter } from '../components/StatCounter';
import { YellowStarburst, CloudBubble, GreenStarburst } from '../components/ComicBubbles';
import bigimage from "../assests/bigimage.webp";
export function Hero() {
  const navigate = useNavigate();
  const { open, openPicker, closePicker, selectedDate, setSelectedDate, formattedDate } = useDatePicker();
  const [activeTab, setActiveTab] = useState("Shortlet");

  return (
    <section className="p-[100px_20px_32px] flex flex-col items-center text-center min-h-[600px] md:p-[120px_32px_48px] md:grid md:grid-cols-1 md:text-left md:items-center lg:p-[140px_48px_48px] lg:grid lg:grid-cols-2 lg:gap-[40px] bg-white relative overflow-hidden rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto shadow-[0_10px_30px_rgba(17,24,39,0.06)]" style={{
      background: `linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%), url(${bigimage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="max-md:max-w-full max-md:items-center max-md:flex max-md:flex-col">
        <h1 className="text-[52px] font-[800] leading-[1.15] mb-[16px] text-text-dark max-md:text-[32px] max-md:mb-[12px]">
          <PopInText text="Premium shortlet" delay={0.1} />
          <br />
          <PopInText text="apartments in" delay={0.4} />
          <br />
          <span style={{ color: '#008751' }}><PopInText text="Lagos, Abuja & PH" delay={0.7} /></span>
        </h1>

        <p className="text-[15px] text-text-mid leading-[1.6] mb-[32px] max-w-[360px] block visible max-md:max-w-[320px] max-md:mb-[24px]" style={{ color: '#4b5563' }}>
          Experience luxury, security, and tranquility. Verified properties with 24/7 power, security, and premium amenities. Pay securely with Paystack or Flutterwave.
        </p>

        <div className="flex gap-0 mb-[20px] border-b-[2px] border-app-border max-md:mb-0 max-md:border-none max-md:bg-[#f3f4f6] max-md:rounded-[12px] max-md:p-[4px] max-md:gap-[4px]">
          {["Shortlet", "Monthly", "Yearly"].map((t) => (
            <div
              key={t}
              className={`p-[10px_20px] text-[14px] font-[600] cursor-pointer border-b-[2px] mb-[-2px] transition-all duration-200 max-md:flex-1 max-md:mb-0 max-md:border-none ${activeTab === t ? "text-gold border-gold max-md:bg-white max-md:shadow-sm max-md:rounded-[8px]" : "border-transparent text-text-mid"}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </div>
          ))}
        </div>

        <div className="flex gap-[16px] items-end bg-white border border-app-border rounded-[12px] p-[16px_20px] shadow-[0_10px_26px_rgba(17,24,39,0.08)] mb-[32px] max-md:flex-col max-md:items-stretch max-md:p-[12px] max-md:gap-[16px] max-md:max-w-[400px] max-md:w-full">
          <div className="flex flex-col gap-[4px] flex-1 w-full text-left">
            <span className="text-[11px] font-[700] text-text-light uppercase tracking-[0.5px]">Location</span>
            <span className="text-[14px] font-[600] text-text-dark">Lekki Phase 1, Lagos</span>
          </div>
          <div className="w-[1px] h-[36px] bg-app-border max-md:hidden" />
          <button
            onClick={openPicker}
            className="flex flex-col gap-[4px] flex-1 w-full text-left bg-transparent border-none cursor-pointer p-0 rounded-[8px] hover:bg-[#f0fdf4] transition-colors px-2 -mx-2"
          >
            <span className="text-[11px] font-[700] text-text-light uppercase tracking-[0.5px]">Check-in Date</span>
            <span className={`text-[14px] font-[600] ${selectedDate ? 'text-[#008751]' : 'text-text-dark'}`}>{formattedDate}</span>
          </button>
          <button onClick={() => navigate('/apartment')} className="bg-[#008751] text-white border-none font-sans text-[14px] font-[600] p-[12px_24px] rounded-[8px] cursor-pointer whitespace-nowrap transition-all duration-[0.25s] hover:-translate-y-[1px] max-md:w-full">Book a Room</button>

          <DatePickerModal
            open={open}
            onClose={closePicker}
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
            label="Check-in Date"
          />
        </div>

        <div className="flex gap-[40px] max-md:justify-center">
          <StatCounter num="5000+" label="Happy Guests" suffix="+" />
          <StatCounter num="850+" label="Verified Properties" suffix="+" />
        </div>
      </div>

      <div className="relative max-md:mt-[40px] max-md:w-full h-full lg:h-[400px] pointer-events-none">
        {/* Top/Center: 24/7 Power */}
        <div className="absolute top-[20px] -left-[40px] max-md:left-[5%] max-md:top-[10px] w-[260px] md:w-[340px] animate-float drop-shadow-2xl z-20" style={{ animationDelay: '0.2s' }}>
          <CloudBubble />
        </div>

        {/* Bottom Left: Stay in Luxury */}
        <div className="absolute bottom-[10px] -left-[80px] max-md:-left-[10px] max-md:bottom-[40px] w-[220px] md:w-[280px] animate-float drop-shadow-2xl z-10" style={{ animationDelay: '0.8s' }}>
          <YellowStarburst />
        </div>

        {/* Right: Great locations */}
        <div className="absolute top-[100px] -right-[60px] max-md:right-[5%] max-md:top-[140px] w-[240px] md:w-[300px] animate-float drop-shadow-2xl z-10" style={{ animationDelay: '1.4s' }}>
          <GreenStarburst />
        </div>
      </div>
    </section>
  );
}
