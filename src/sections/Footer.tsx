import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-white border-t border-app-border">
      {/* Centered inner container — matches page section width */}
      <div className="max-w-[1126px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-12">

        {/* Top grid: brand full-width on mobile → 2-col link grid on sm → 5-col on md+ */}
        <div className="mb-10 reveal">

          {/* Brand block — always full width */}
          <div className="flex flex-col gap-2 text-center mb-8 sm:text-left">
            <div className="flex items-center gap-2 font-[800] text-[16px] text-text-dark mb-1 justify-center sm:justify-start">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#008751' }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" fill="white" />
                </svg>
              </div>
              ShortletNG
            </div>
            <p className="text-[13px] text-gray-500 mt-1 leading-[1.6] max-w-[320px] mx-auto sm:mx-0">
              Nigeria's most trusted shortlet platform. Verified properties, secure payments, 24/7 support.
            </p>
            <div className="flex gap-2 mt-3 justify-center sm:justify-start">
              <span className="text-[11px] font-[700] p-[3px_8px] bg-green-50 rounded text-[#008751]">
                Paystack
              </span>
              <span className="text-[11px] font-[700] p-[3px_8px] bg-green-50 rounded text-[#f5a623]">
                Flutterwave
              </span>
            </div>
          </div>

          {/* Link columns: 2-col on mobile, 4-col on md+ */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
            <div>
              <div className="font-[700] text-[12px] text-text-dark uppercase tracking-[0.5px] mb-3">Lagos</div>
              {["Lekki Phase 1", "Ikoyi", "Victoria Island", "Banana Island"].map((l) => (
                <span key={l} className="text-[13px] text-text-mid block mb-2 cursor-pointer transition-colors duration-200 hover:text-[#008751]">{l}</span>
              ))}
            </div>

            <div>
              <div className="font-[700] text-[12px] text-text-dark uppercase tracking-[0.5px] mb-3">Abuja</div>
              {["Maitama", "Wuse 2", "Asokoro", "Jabi"].map((l) => (
                <span key={l} className="text-[13px] text-text-mid block mb-2 cursor-pointer transition-colors duration-200 hover:text-[#008751]">{l}</span>
              ))}
              <div className="font-[700] text-[12px] text-text-dark uppercase tracking-[0.5px] mb-3 mt-5">Other Cities</div>
              {["Port Harcourt", "Ibadan", "Enugu"].map((l) => (
                <span key={l} className="text-[13px] text-text-mid block mb-2 cursor-pointer transition-colors duration-200 hover:text-[#008751]">{l}</span>
              ))}
            </div>

            <div>
              <div className="font-[700] text-[12px] text-text-dark uppercase tracking-[0.5px] mb-3">Company</div>
              {["About Us", "How it Works", "Trust & Safety", "CAC Verification"].map((l) => (
                <span key={l} className="text-[13px] text-text-mid block mb-2 cursor-pointer transition-colors duration-200 hover:text-[#008751]">{l}</span>
              ))}
            </div>

            <div>
              <div className="font-[700] text-[12px] text-text-dark uppercase tracking-[0.5px] mb-3">Support</div>
              {["Help Center", "Contact Us", "Terms of Service", "Privacy Policy"].map((l) => (
                <span key={l} className="text-[13px] text-text-mid block mb-2 cursor-pointer transition-colors duration-200 hover:text-[#008751]">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:justify-between sm:items-center border-t border-app-border pt-5 reveal">
          <div className="flex items-center gap-[12px] justify-center sm:justify-start">
            <div className="text-[12px] text-text-light">©2024 ShortletNG. All rights reserved. RC 1234567</div>
            {/* Hidden admin link — accessible via direct URL (/admin) or this subtle link */}
            <Link
              to="/admin"
              className="text-[10px] text-[#d1d5db] hover:text-[#9ca3af] transition-colors no-underline"
              title="Admin"
            >
              ·
            </Link>
          </div>
          <div className="flex gap-3 justify-center sm:justify-start">
            {[
              { Icon: FaFacebookF, label: "Facebook" },
              { Icon: FaTwitter, label: "Twitter" },
              { Icon: FaLinkedinIn, label: "LinkedIn" },
              { Icon: FaYoutube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="w-8 h-8 rounded-full bg-[#f9fafb] flex items-center justify-center text-[13px] text-gray-500 cursor-pointer transition-all duration-200 hover:bg-[#008751] hover:text-white hover:-translate-y-0.5"
                aria-label={label}
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}