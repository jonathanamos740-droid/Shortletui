import { useState, useEffect } from 'react';
import { FaVideo, FaShieldAlt, FaBolt } from 'react-icons/fa';

const darkCards = [
  { Icon: FaVideo, title: "Virtual Tours Available", desc: "Take a virtual walkthrough of our luxury apartments before booking. See every detail from your phone." },
  { Icon: FaShieldAlt, title: "Verified & Secure", desc: "All properties are CAC verified and comprehensively inspected. Your safety is our priority." },
  { Icon: FaBolt, title: "24/7 Power Guaranteed", desc: "Never experience darkness. All our apartments come with inverter/backup generator systems." },
];

const stats = [
  { num: '100%', label: 'Verified Properties' },
  { num: '24/7', label: 'Customer Support' },
  { num: '₦0', label: 'Booking Fees' },
];

export function DarkSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % darkCards.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="p-[24px_16px] md:p-[48px_32px] lg:p-[48px_48px] text-white rounded-[24px] relative overflow-hidden mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.2)_0%,transparent_50%)] after:pointer-events-none box-border"
      style={{background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)'}}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] items-center mb-[40px] md:mb-[60px] relative z-[1]">
        <div className="reveal-left">
          <h2 className="text-[28px] md:text-[36px] font-[800] leading-[1.3] text-white">
            Built for Nigerians,<br />
            <span className="text-[#a78bfa]">by Nigerians.</span>
          </h2>
        </div>
        <div className="reveal-right">
          <p className="text-[14px] text-[rgba(255,255,255,0.7)] leading-[1.7]">
            We understand the unique challenges of finding quality shortlets in Nigeria. That's why we meticulously verify every property, ensure 24/7 power, and provide local payment options you can trust.
          </p>
        </div>
      </div>
      
      <div 
        className="relative w-full my-[40px] z-[1]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden w-full">
          <div 
            className="flex transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {darkCards.map((c) => (
              <div key={c.title} className="min-w-full flex-[0_0_100%] max-md:px-0 px-[10px] box-border">
                <div className="bg-white rounded-[20px] p-[30px_20px] md:p-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-2 border-transparent transition-all duration-300 h-full hover:-translate-y-[5px] hover:border-purple hover:shadow-[0_25px_50px_rgba(124,58,237,0.2)] group">
                  <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-[16px] flex items-center justify-center mb-[24px] text-[24px] md:text-[28px] transition-all duration-300 group-hover:bg-[#008751] group-hover:text-white group-hover:-rotate-[5deg] group-hover:scale-110 bg-[#e6f3ed] text-[#008751]">
                    <c.Icon />
                  </div>
                  <div className="text-[20px] md:text-[22px] font-[700] text-text-dark mb-[12px]">{c.title}</div>
                  <div className="text-[15px] text-text-mid leading-[1.6]">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-[12px] mt-[24px] md:mt-[40px]">
          {darkCards.map((_, i) => (
            <button
              key={i}
              className={`w-[12px] h-[12px] rounded-full bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 border-none p-0 ${i === activeSlide ? '!bg-white !w-[40px] !rounded-[6px]' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-[24px] md:gap-[20px] border-t border-[rgba(255,255,255,0.1)] pt-[32px] md:pt-[48px] relative z-[1] mt-[40px]">
        {stats.map((s, i) => (
          <div key={s.label} className="flex-1 md:flex-[1_1_45%] lg:flex-1 p-0 md:p-[20px] lg:p-[0_40px] border-b md:border-b-0 border-[rgba(255,255,255,0.1)] lg:border-r text-center pb-[24px] md:pb-0 last:border-b-0 lg:last:border-r-0 lg:first:pl-0 reveal" style={{transitionDelay:`${i*0.12}s`}}>
            <div className="text-[40px] font-[800] text-white mb-[4px]">{s.num}</div>
            <div className="text-[13px] text-[rgba(255,255,255,0.7)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
