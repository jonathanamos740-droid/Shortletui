import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaTag, FaBolt, FaMapMarkerAlt } from 'react-icons/fa';

const features = [
  { Icon: FaShieldAlt, title: "Secure Payments", desc: "Pay via Paystack or Flutterwave. Your money is protected until you check-in." },
  { Icon: FaTag, title: "Best Rates", desc: "No agent commissions. Book directly with us and save up to 30%." },
  { Icon: FaBolt, title: "24/7 Power", desc: "All apartments guarantee uninterrupted electricity with backup systems." },
  { Icon: FaMapMarkerAlt, title: "Prime Locations", desc: "Lekki, Ikoyi, VI, Banana Island, Maitama, Wuse 2, and Port Harcourt GRA." },
];

export function Features() {
  const navigate = useNavigate();
  return (
    <section className="p-[24px_16px] md:p-[40px_32px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto shadow-[0_10px_30px_rgba(17,24,39,0.06)] overflow-clip box-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[60px] items-start">
        <div className="bg-white rounded-[20px] p-[24px] md:p-[40px] shadow-[0_4px_24px_rgba(124,58,237,0.08)] reveal-left">
          <h2 className="text-[28px] font-[800] text-text-dark mb-[16px] leading-[1.3]">The smarter way to shortlet in Nigeria</h2>
          <p className="text-[14px] text-text-mid leading-[1.6] mb-[24px]">Skip the agents. Book verified luxury apartments directly with secure payment via Paystack or Flutterwave.</p>
          <button onClick={() => navigate('/apartment')} className="bg-[#008751] hover:bg-[#00703c] text-white border-2 border-[#008751] hover:border-[#00703c] font-sans text-[14px] font-[600] p-[12px_24px] rounded-[8px] cursor-pointer transition-all duration-[0.25s] hover:-translate-y-[2px] shadow-sm hover:shadow-md">Browse Properties</button>
          <div className="mt-[32px] h-[160px] bg-[linear-gradient(135deg,#FEF3C7_0%,#fef3c7_100%)] rounded-[12px] flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=70"
              alt="Nigerian luxury home"
              loading="lazy"
              className="w-full h-full block object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
          {features.map((f, i) => (
            <div key={f.title} className="bg-white rounded-[16px] p-[24px] shadow-[0_10px_24px_rgba(17,24,39,0.06)] transition-all duration-300 cursor-default group hover:-translate-y-[4px] hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)] reveal" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center mb-[14px] text-[20px] transition-all duration-300 group-hover:bg-[#008751] group-hover:text-white group-hover:-rotate-[5deg] group-hover:scale-110" style={{background: 'rgba(0, 135, 81, 0.1)', color: '#008751'}}>
                <f.Icon size={18} />
              </div>
              <div className="text-[15px] font-[700] text-text-dark mb-[8px]">{f.title}</div>
              <div className="text-[13px] text-text-mid leading-[1.5]">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
