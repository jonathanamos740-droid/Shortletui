import { FaVolumeMute, FaBolt, FaHome, FaCar, FaTv } from 'react-icons/fa';

export function Tranquility() {
  return (
    <section className="p-[20px_5px] md:p-[48px_32px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[40px] items-center w-[1126px] max-w-[calc(100%-48px)] mx-auto overflow-hidden box-border">
      <div className="reveal-left">
        {/* <div className="inline-block p-[6px_14px] bg-[rgba(0,135,81,0.1)] text-[#008751] text-[12px] font-[700] rounded-[20px] mb-[12px] uppercase tracking-[0.5px]">Peace of Mind</div> */}
        <h2 className="text-[26px] md:text-[32px] font-[800] text-gray-900 mb-[16px] leading-[1.3]">Escape the Lagos Hustle</h2>
        <p className="text-[14px] text-gray-500 leading-[1.7] mb-[24px]">Our properties are located in serene, residential estates away from the noise and traffic. Experience true tranquility with:</p>
        <ul className="list-none p-0 mb-[32px]">
          <li className="flex items-center gap-[12px] py-[12px] text-[14px] text-gray-700 font-[500] border-b border-gray-100"><FaVolumeMute color="#008751" /> Sound-proof apartments</li>
          <li className="flex items-center gap-[12px] py-[12px] text-[14px] text-gray-700 font-[500] border-b border-gray-100"><FaBolt color="#008751" /> Inverter/Generator (No noise pollution)</li>
          <li className="flex items-center gap-[12px] py-[12px] text-[14px] text-gray-700 font-[500] border-b border-gray-100"><FaHome color="#008751" /> Private compounds with gardens</li>
          <li className="flex items-center gap-[12px] py-[12px] text-[14px] text-gray-700 font-[500] border-b border-gray-100"><FaCar color="#008751" /> Away from major traffic routes</li>
          <li className="flex items-center gap-[12px] py-[12px] text-[14px] text-gray-700 font-[500] border-b-0"><FaTv color="#008751" /> DSTV Premium & Netflix included</li>
        </ul>
        <button className="bg-[#008751] text-white font-sans text-[14px] font-[600] p-[12px_24px] rounded-[8px] cursor-pointer hover:bg-[#00703c] transition-all duration-200 shadow-sm hover:shadow-[0_6px_20px_rgba(0,135,81,0.3)] hover:-translate-y-[2px] border-none">View Quiet Locations</button>
      </div>
      <div className="rounded-[20px] overflow-hidden h-[250px] md:h-[400px] shadow-[0_25px_50px_-12px_rgba(0,135,81,0.25)] max-md:-order-1 w-full reveal-right">
        <video 
          src="/src/assests/4-Bedroom Duplex with Cinema & Swimming Pool 📍 Orchid, Lekki ✨ ACCEPTS PARTY 💵 ₦260,000_ni.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
    </section>
  );
}
