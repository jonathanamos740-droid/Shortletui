import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaRegHeart, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useApartments } from '../context/ApartmentContext';
import { getApartmentsByLocation } from '../services/apartmentService';

const LOCATIONS = ["Lagos", "Abuja", "Port Harcourt"];

export function Properties() {
  const navigate = useNavigate();
  const { apartments } = useApartments();
  const [activeFilter, setActiveFilter] = useState("Lagos");

  const filteredProperties = getApartmentsByLocation(apartments, activeFilter);

  return (
    <section className="p-[24px_16px] md:p-[40px_32px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] overflow-clip box-border shadow-[0_10px_30px_rgba(17,24,39,0.06)] w-[1126px] max-w-[calc(100%-48px)] mx-auto">
      <div className="text-center mb-[40px] reveal">
        <div className="text-[26px] md:text-[32px] font-[800] mb-[8px] bg-[linear-gradient(135deg,#1a1a2e_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-[1.3] text-center">Premium Locations</div>
        <div className="text-[15px] md:text-[14px] text-text-mid mt-[8px] md:mt-0 text-center">Handpicked luxury apartments in Nigeria's finest neighborhoods</div>
      </div>
      <div className="flex justify-between items-center mb-[32px] max-md:flex-col max-md:gap-[16px] reveal">
        <div className="flex gap-[4px] bg-app-bg rounded-[10px] p-[4px] max-md:w-full max-md:overflow-x-auto">
          {LOCATIONS.map((t) => (
            <button
              key={t}
              className={`p-[8px_20px] text-[13px] font-[600] rounded-[8px] cursor-pointer text-text-mid border-none bg-transparent font-sans transition-all duration-200 inline-flex items-center whitespace-nowrap ${activeFilter === t ? "!bg-white !text-purple shadow-[0_2px_8px_rgba(0,0,0,0.08)]" : ""}`}
              onClick={() => setActiveFilter(t)}
            >
              <span className="inline-flex mr-[8px]">
                <FaMapMarkerAlt size={12} />
              </span>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-[8px] border border-app-border rounded-[10px] p-[10px_16px] text-[13px] text-text-mid w-[200px] cursor-pointer bg-white shadow-[0_10px_24px_rgba(17,24,39,0.05)] max-md:w-full">
          <FaSearch />
          <span>Search by area...</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[40px]">
        {filteredProperties.slice(0, 6).map((p, i) => (
          <div key={p.id} onClick={() => navigate(`/apartment/${p.id}`)} className="bg-white rounded-[16px] overflow-hidden border border-app-border transition-all duration-300 cursor-pointer shadow-[0_10px_24px_rgba(17,24,39,0.05)] hover:-translate-y-[6px] hover:shadow-[0_16px_48px_rgba(124,58,237,0.15)] hover:border-[#F3E8FF] group reveal" style={{transitionDelay:`${i*0.08}s`}}>
            <div className="w-full h-[140px] bg-[linear-gradient(135deg,#fef7c7_0%,#fed7aa_100%)] relative flex items-center justify-center text-[40px] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_bottom,transparent_60%,rgba(0,0,0,0.15))]">
              <img src={p.images[0]} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover scale-[1.03] transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" />
              {p.popular && <span className="absolute top-[12px] left-[12px] bg-[#008751] text-white text-[10px] font-[700] p-[4px_8px] rounded-[6px] uppercase tracking-[0.5px] z-[1]">Popular</span>}
              <span onClick={(e) => e.stopPropagation()} className="absolute top-[12px] right-[12px] bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer z-[1] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 text-text-light text-[14px] hover:text-[#ef4444] hover:scale-110">
                <FaRegHeart />
              </span>
              <div className="absolute bottom-[12px] left-[12px] flex gap-[6px] z-[1] max-md:hidden flex-wrap">
                {p.tags.map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.9)] backdrop-blur-[4px] text-text-dark text-[10px] font-[700] p-[4px_10px] rounded-[20px] shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-[12px]">
              <div className="text-[16px] font-[800] text-text-dark mb-[4px]">{p.priceLabel}<span className="text-[12px] font-[500] text-text-light">/night</span></div>
              <div className="text-[13px] font-[700] text-text-dark mb-[4px]">{p.title}</div>
              <div className="text-[12px] text-text-mid mb-[12px]">{p.address}</div>
              <div className="flex gap-[10px] text-[11px] text-text-mid pt-[10px] border-t border-app-border">
                <div className="flex items-center gap-[4px]"><FaBed size={14} /> {p.beds} Beds</div>
                <div className="flex items-center gap-[4px]"><FaBath size={14} /> {p.baths} Baths</div>
                <div className="flex items-center gap-[4px]"><FaRulerCombined size={14} /> {p.sqft} sqft</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-[48px] text-[#6b7280]">
          <p className="text-[16px] font-[600]">No apartments in {activeFilter} yet.</p>
        </div>
      )}

      <div className="flex justify-center reveal">
        <button
          onClick={() => navigate('/apartment')}
          className="bg-[#008751] text-white border-none font-sans text-[14px] font-[600] p-[14px_36px] rounded-[10px] cursor-pointer transition-all duration-[0.25s] hover:bg-[#00703c] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,112,60,0.3)]"
        >
          View all properties
        </button>
      </div>
    </section>
  );
}
