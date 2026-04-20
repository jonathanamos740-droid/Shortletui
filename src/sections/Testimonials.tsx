import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";

const testimonials = [
  { logo: "webflow", logoType: "webflow", quote: "The Banana Island apartment exceeded my expectations. The security was tight and the power never blinked.", name: "Chioma Okonkwo", role: "Business Traveler", initials: "CO", bg: "#ede9fe", color: "#4f46e5" },
  { logo: "Airtable", logoType: "airtable", quote: "Finally, a platform that understands what Nigerians need. The Lekki penthouse was stunning.", name: "Tunde Bakare", role: "Lagos", initials: "TB", bg: "#fef3c7", color: "#92400e" },
  { logo: "zapier", logoType: "zapier", quote: "I loved the quietness of the GRA location. The sound-proofing was excellent. Will definitely book again!", name: "Ngozi Eze", role: "Port Harcourt", initials: "NE", bg: "#fee2e2", color: "#991b1b" },
];

const DESKTOP_CARD_HEIGHT = 160;
const MOBILE_CARD_HEIGHT = 110;

function Logo({ type, name }: { type: string; name: string }) {
  if (type === "webflow") return <span className="text-[11px] md:text-[18px] font-[700] italic text-[#4f46e5]">{name}</span>;
  if (type === "airtable") return <span className="text-[10px] md:text-[16px] font-[700] text-gray-900">▪ {name}</span>;
  return <span className="text-[11px] md:text-[18px] font-[700] text-[#ff4a00]">{name}</span>;
}

export function Testimonials() {
  const isMobile = useIsMobile();
  const [cur, setCur] = useState(0);
  const n = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setCur(c => (c + 1) % n), 3000);
    return () => clearInterval(id);
  }, [n]);

  function getStyle(i: number): React.CSSProperties {
    const height = isMobile ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT;
    const rel = (i - cur + n) % n;
    if (rel === 0) return { transform: "translateY(0px) scale(1)", opacity: 1, zIndex: 30, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
    if (rel === 1) return { transform: `translateY(${height * 0.6}px) scale(0.95)`, opacity: 1, zIndex: 20 };
    if (rel === 2) return { transform: `translateY(${height * 1.05}px) scale(0.9)`, opacity: 1, zIndex: 10 };
    return { transform: `translateY(${-height * 0.5}px) scale(0.85)`, opacity: 0, zIndex: 5, pointerEvents: "none" };
  }

  const active = testimonials[cur];

  return (
    <section className="flex flex-col md:flex-row gap-6 md:gap-8 items-start w-[1126px] max-w-[calc(100%-48px)] mx-auto p-[24px_16px] md:p-[32px_24px] rounded-[24px] mt-[16px] box-border">
      {/* Left side */}
      <div className="flex-[1_1_100%] md:flex-[0_0_260px] order-2 md:order-1 mt-1 md:mt-0 w-full">
        <div className="flex items-center gap-2 text-[11px] font-[600] text-[#4f46e5] uppercase tracking-[0.1em] mb-3">
          <span className="w-5 h-[2px] bg-[#4f46e5] inline-block" />
          Testimonials
        </div>
        <h2 className="text-lg md:text-[1.4rem] font-[700] leading-[1.25] mb-2">
          Hear what our clients say
        </h2>
        <p className="text-[12px] md:text-[13px] text-gray-500 leading-[1.5] mb-4">
          Excepteur sint occaecat cupidatat non proident.
        </p>

        {/* Featured card */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 md:p-5 h-[110px] md:h-auto flex flex-col justify-between md:block shadow-sm">
          <div>
            <div className="mb-1 md:mb-3">
              <Logo type={active.logoType} name={active.logo} />
            </div>
            <p className="text-[11px] md:text-[13px] text-gray-500 leading-[1.4] md:leading-[1.65] mb-1 md:mb-4 line-clamp-2 md:line-clamp-3">
              {active.quote}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[9px] md:text-[12px] font-[600]"
              style={{ background: active.bg, color: active.color }}
            >
              {active.initials}
            </div>
            <div>
              <div className="text-[10px] md:text-[13px] font-[600] text-gray-900">{active.name}</div>
              <div className="text-[8px] md:text-[11px] text-gray-400">{active.role}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-4 md:gap-[6px] mt-3 justify-center md:justify-start py-1 md:py-0">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCur(i)} 
              className="w-[10px] h-[10px] md:w-[7px] md:h-[7px] rounded-full border-none cursor-pointer p-0 select-none transition-colors"
              style={{ background: i === cur ? "#4f46e5" : "#e5e7eb", WebkitTapHighlightColor: "transparent" }} 
            />
          ))}
        </div>
      </div>

      {/* Right side - wheel stack */}
      <div className="flex-1 relative min-h-[260px] md:min-h-[380px] h-auto md:h-[380px] order-1 md:order-2 w-full overflow-visible">
        {testimonials.map((t, i) => (
          <div 
            key={t.name} 
            onClick={() => setCur(i)} 
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setCur(i)}
            className="absolute top-0 left-0 right-0 bg-white border border-gray-100 rounded-xl p-3 md:p-5 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer h-[110px] md:h-auto flex flex-col justify-between md:block shadow-sm"
            style={{ ...getStyle(i) }}
          >
            <div>
              <div className="mb-1 md:mb-3">
                <Logo type={t.logoType} name={t.logo} />
              </div>
              <p className="text-[11px] md:text-[13px] text-gray-500 leading-[1.4] md:leading-[1.65] mb-1 md:mb-4 line-clamp-2 md:line-clamp-3">
                {t.quote}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[9px] md:text-[12px] font-[600]"
                style={{ background: t.bg, color: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <div className="text-[10px] md:text-[13px] font-[600] text-gray-900">{t.name}</div>
                <div className="text-[8px] md:text-[11px] text-gray-400">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}