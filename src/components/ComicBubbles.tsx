import React from 'react';

export const YellowStarburst = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
      {/* Orange Border / Shadow Layer */}
      <polygon 
        points="100,5 115,45 160,20 135,65 190,80 145,110 180,160 130,140 105,190 85,145 25,175 55,120 5,100 45,75 10,25 65,45" 
        fill="#ff9800"
        stroke="#1a1a1a"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Yellow Inner Layer */}
      <polygon 
        points="100,10 112,47 155,25 132,67 185,82 142,112 175,155 128,137 105,185 86,142 30,170 58,118 10,98 48,77 15,30 68,48" 
        fill="#ffeb3b"
      />
      
      {/* Optional Comic Dots Overlay */}
      <pattern id="yellowDots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#fbc02d" fillOpacity="0.4" />
      </pattern>
      <polygon 
        points="100,10 112,47 155,25 132,67 185,82 142,112 175,155 128,137 105,185 86,142 30,170 58,118 10,98 48,77 15,30 68,48" 
        fill="url(#yellowDots)"
      />

      <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-5, 100, 100)" className="font-['Komika_Title','Impact',sans-serif] font-black text-[32px] fill-[#111827] uppercase">
        Stay in
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-5, 100, 100)" className="font-['Komika_Title','Impact',sans-serif] font-black text-[32px] fill-[#008751] uppercase">
        luxury!
      </text>
    </svg>
  </div>
);

export const CloudBubble = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 250 160" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
      <pattern id="cyanDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4dd0e1" fillOpacity="0.3" />
      </pattern>

      {/* Cloud/Explosion Base with black outline */}
      <path 
        d="M50 80 Q30 50 60 30 Q100 0 130 30 Q160 5 190 30 Q230 40 210 80 Q240 120 200 130 Q170 160 130 140 Q90 160 60 130 Q20 120 50 80 Z" 
        fill="#ffffff" 
        stroke="#1a1a1a" 
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path 
        d="M50 80 Q30 50 60 30 Q100 0 130 30 Q160 5 190 30 Q230 40 210 80 Q240 120 200 130 Q170 160 130 140 Q90 160 60 130 Q20 120 50 80 Z" 
        fill="url(#cyanDots)" 
      />

      {/* Comic Action Lines around the bubble (separated paths mimicking pop-art motion) */}
      <path d="M40 20 L20 10 M80 -5 L85 -20 M180 5 L200 -10 M220 30 L240 25M230 100 L245 110 M40 140 L20 150 M15 100 L0 105" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />

      <text x="50%" y="42%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-3, 125, 80)" className="font-['Komika_Title','Impact',sans-serif] font-black italic text-[24px] fill-[#2e1065] uppercase">
        24/7 power
      </text>
      <text x="50%" y="64%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-3, 125, 80)" className="font-['Komika_Title','Impact',sans-serif] font-black italic text-[24px] fill-[#111827] uppercase">
        and Security!
      </text>
    </svg>
  </div>
);

export const GreenStarburst = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 300 140" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
      {/* Green Outer Shadow/Border */}
      <polygon 
        points="150,5 180,30 250,15 230,50 290,65 240,90 270,125 210,110 170,135 140,110 70,125 90,95 10,80 60,55 30,15 100,35" 
        fill="#005c37"
        stroke="#1a1a1a"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Light Green Inner */}
      <polygon 
        points="150,12 175,34 240,21 222,52 280,66 233,88 260,118 205,104 168,127 142,104 78,118 95,92 20,78 68,56 42,21 105,39" 
        fill="#4ade80"
      />
      
      <text x="50%" y="43%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-4, 150, 70)" className="font-['Komika_Title','Impact',sans-serif] font-black text-[22px] fill-[#ffffff] stroke-[#1a1a1a] stroke-2 uppercase" style={{ paintOrder: "stroke fill" }}>
        Great locations,
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" transform="rotate(-4, 150, 70)" className="font-['Komika_Title','Impact',sans-serif] font-black text-[24px] fill-[#ffffff] stroke-[#1a1a1a] stroke-2 uppercase" style={{ paintOrder: "stroke fill" }}>
        great value!
      </text>
    </svg>
  </div>
);
