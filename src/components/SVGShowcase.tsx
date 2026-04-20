import { useState } from 'react';

// Pre-defined SVG illustrations for the showcase
const svgCollection = [
  {
    id: 1,
    name: "Luxury Living",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="80" width="160" height="100" rx="8" fill="#008751" fillOpacity="0.1"/>
        <rect x="30" y="90" width="60" height="80" rx="4" fill="#008751" fillOpacity="0.2"/>
        <rect x="100" y="90" width="70" height="35" rx="4" fill="#008751" fillOpacity="0.3"/>
        <rect x="100" y="135" width="70" height="35" rx="4" fill="#008751" fillOpacity="0.15"/>
        <circle cx="100" cy="50" r="30" fill="#FFD700" fillOpacity="0.3"/>
        <path d="M70 50L85 65L130 35" stroke="#008751" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="45" y="110" width="30" height="40" rx="2" fill="#008751" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    id: 2,
    name: "Secure Stay",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="70" fill="#008751" fillOpacity="0.1"/>
        <path d="M100 40L140 60V100C140 125 122.5 147.5 100 155C77.5 147.5 60 125 60 100V60L100 40Z" fill="#008751" fillOpacity="0.2" stroke="#008751" strokeWidth="3"/>
        <circle cx="100" cy="100" r="20" fill="#008751" fillOpacity="0.3"/>
        <rect x="95" y="90" width="10" height="20" rx="2" fill="#008751"/>
        <path d="M85 70L100 55L115 70" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="150" cy="50" r="15" fill="#FFD700" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    id: 3,
    name: "Smart Home",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="60" width="120" height="100" rx="8" fill="#008751" fillOpacity="0.1"/>
        <rect x="55" y="75" width="40" height="30" rx="4" fill="#008751" fillOpacity="0.2"/>
        <circle cx="75" cy="90" r="8" fill="#008751" fillOpacity="0.4"/>
        <rect x="105" y="75" width="40" height="30" rx="4" fill="#008751" fillOpacity="0.15"/>
        <rect x="55" y="115" width="90" height="30" rx="4" fill="#008751" fillOpacity="0.25"/>
        <circle cx="140" cy="50" r="12" fill="#FFD700" fillOpacity="0.5"/>
        <path d="M50 140L70 125L90 135L110 120L150 140" stroke="#008751" strokeWidth="2" strokeLinecap="round"/>
        <rect x="85" y="45" width="30" height="8" rx="4" fill="#008751" fillOpacity="0.3"/>
      </svg>
    )
  },
  {
    id: 4,
    name: "Nigeria Map",
    svg: (
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" rx="20" fill="#008751" fillOpacity="0.05"/>
        {/* Simplified Nigeria map outline */}
        <path 
          d="M60 40L80 35L100 38L120 32L140 40L150 60L145 85L155 110L150 140L130 155L100 160L70 155L50 140L45 110L50 85L45 60L60 40Z" 
          fill="#008751" 
          fillOpacity="0.2"
          stroke="#008751"
          strokeWidth="2"
        />
        {/* Location pins for major cities */}
        <circle cx="130" cy="70" r="6" fill="#008751"/>
        <circle cx="100" cy="100" r="6" fill="#FFD700"/>
        <circle cx="75" cy="120" r="6" fill="#008751"/>
        {/* Connection lines */}
        <path d="M130 70L100 100L75 120" stroke="#008751" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
      </svg>
    )
  }
];

export function SVGShowcase() {
  const [activeSVG, setActiveSVG] = useState(0);

  return (
    <section className="p-[24px_16px] md:p-[40px_32px] lg:p-[48px_48px] bg-[#f9fafb] rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-center">
        <div className="reveal-left">
          <div className="inline-block p-[6px_14px] bg-[rgba(0,135,81,0.1)] text-[#008751] text-[12px] font-[700] rounded-[20px] mb-[12px] uppercase tracking-[0.5px]">Visual Experience</div>
          <h2 className="text-[28px] lg:text-[40px] font-[800] text-[#111827] mb-[16px] leading-[1.2]">Experience Nigerian Luxury</h2>
          <p className="text-[15px] text-[#6b7280] leading-[1.7] mb-[24px]">Our curated collection of premium shortlet apartments across Nigeria's finest locations. From Lekki to Maitama, experience comfort like never before.</p>
          
          <div className="flex flex-wrap gap-[12px] mb-[32px]">
            {svgCollection.map((item, index) => (
              <button
                key={item.id}
                className={`px-[20px] py-[10px] rounded-[12px] text-[14px] font-[600] transition-colors border-none cursor-pointer ${activeSVG === index ? 'bg-[#111827] text-white shadow-[0_4px_12px_rgba(17,24,39,0.15)]' : 'bg-white text-[#6b7280] hover:bg-gray-50 border border-gray-200'}`}
                onClick={() => setActiveSVG(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px] text-[14px] font-[600] text-[#4b5563]">
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: '#008751' }}></span>
              <span>Premium Locations</span>
            </div>
            <div className="flex items-center gap-[12px] text-[14px] font-[600] text-[#4b5563]">
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: '#FFD700' }}></span>
              <span>Verified Properties</span>
            </div>
            <div className="flex items-center gap-[12px] text-[14px] font-[600] text-[#4b5563]">
              <span className="w-[8px] h-[8px] rounded-full" style={{ background: '#008751' }}></span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
        
        <div className="relative reveal-right">
          <div className="relative bg-white rounded-[24px] p-[20px] md:p-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center min-h-[300px] mb-[24px]">
            <div className="w-full max-w-[280px] mx-auto z-10 transition-all duration-[500ms] hover:scale-105">
              {svgCollection[activeSVG].svg}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#008751] blur-[80px] opacity-20 rounded-full z-0 pointer-events-none"></div>
          </div>
          
          <div className="flex justify-center gap-[8px]">
            {svgCollection.map((_, index) => (
              <button
                key={index}
                className={`h-[8px] rounded-full p-0 border-none transition-all duration-300 cursor-pointer ${activeSVG === index ? 'bg-[#008751] w-[24px]' : 'bg-gray-300 hover:bg-gray-400 w-[8px]'}`}
                onClick={() => setActiveSVG(index)}
                aria-label={`View ${svgCollection[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
