import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
  scrolled: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onBookNow?: () => void;
}

export function Navbar({ scrolled, onSignIn, onSignUp, onBookNow }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Apartment', path: '/apartment' },
    { label: 'About Us', path: '/about' },
  ];

  return (
    <>
      <nav className={`flex items-center justify-between fixed top-0 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-[12px] rounded-b-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto border-b border-app-border transition-all duration-300 ease-[ease] ${scrolled ? 'py-[12px] px-[80px] shadow-[0_4px_30px_rgba(124,58,237,0.15)] bg-[rgba(255,255,255,0.99)] max-md:px-4' : 'px-[80px] py-[16px] bg-[rgba(255,255,255,0.98)] shadow-[0_2px_24px_rgba(124,58,237,0.08)] max-md:px-4'}`}>
        <div className="flex items-center gap-[8px] font-[800] text-[18px] text-text-dark">
          <div className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center" style={{background: 'linear-gradient(135deg, #008751 0%, #00703c 100%)'}}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <rect x="9" y="14" width="6" height="7" rx="1" fill="rgba(255,255,255,0.3)"/>
            </svg>
          </div>
          ShortletNG
        </div>
        
        <div className="hidden md:flex gap-[32px] items-center">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-gold font-semibold text-[14px] cursor-pointer transition-colors duration-200 relative'
                  : 'text-text-mid hover:text-gold font-[500] text-[14px] cursor-pointer transition-colors duration-200 relative'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        
        <div className="hidden md:flex gap-[12px] items-center">
          <button
            className="bg-transparent border-none font-sans text-[14px] font-[600] text-text-dark cursor-pointer p-[8px_16px] rounded-[8px] transition-all duration-200 hover:bg-gold-soft hover:text-gold"
            onClick={onSignIn}
          >
            Sign In
          </button>
          {/* Book Now — primary CTA */}
          <button
            onClick={onBookNow}
            className="bg-[linear-gradient(135deg,#008751,#005c37)] text-white font-sans text-[14px] font-[700] px-[20px] py-[10px] rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_14px_rgba(0,135,81,0.35)] hover:shadow-[0_6px_20px_rgba(0,135,81,0.45)] hover:-translate-y-[1px] border-none whitespace-nowrap"
          >
            Book Now
          </button>
        </div>

        <button 
          className="md:hidden flex bg-transparent border-none text-[24px] text-text-dark cursor-pointer p-[8px]" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-white p-[24px] flex flex-col gap-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[999] rounded-b-[24px] md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-gold font-semibold text-[16px] p-[12px_0] border-b border-app-border cursor-pointer'
                  : 'text-text-dark hover:text-gold font-[600] text-[16px] p-[12px_0] border-b border-app-border cursor-pointer'
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={() => { onBookNow?.(); setMobileMenuOpen(false); }}
            className="bg-[linear-gradient(135deg,#008751,#005c37)] text-white font-[700] text-[15px] p-[14px_24px] border-none rounded-[12px] cursor-pointer transition-all duration-200 w-full mt-[8px] shadow-[0_4px_14px_rgba(0,135,81,0.35)]"
          >
            Book Now
          </button>
          <button
            className="bg-transparent border border-[#e5e7eb] text-[#374151] font-[600] text-[14px] p-[12px_24px] rounded-[10px] cursor-pointer transition-all duration-200 w-full"
            onClick={() => { onSignIn?.(); setMobileMenuOpen(false); }}
          >
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
