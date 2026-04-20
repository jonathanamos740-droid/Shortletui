import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Home } from './sections/Home';
import { Apartments } from './sections/Apartment';
import { ApartmentDetail } from './sections/ApartmentDetail';
import { About } from './sections/About';
import { AdminDashboard } from './sections/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { BookingModal } from './components/BookingModal';
import { ApartmentProvider } from './context/ApartmentContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => setShowSignInModal(true);
  const handleSignUp = () => setShowSignUpModal(true);
  const handleBookNow = () => setShowBookingModal(true);
  const handleTopBtnClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const closeSignIn = () => setShowSignInModal(false);
  const closeSignUp = () => setShowSignUpModal(false);
  const closeBooking = () => setShowBookingModal(false);

  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home
            scrolled={scrolled}
            showTopBtn={false}
            showSignInModal={false}
            showSignUpModal={false}
            onSignInTopClick={handleSignIn}
            onSignUpTopClick={handleSignUp}
            onCloseSignIn={closeSignIn}
            onCloseSignUp={closeSignUp}
            onTopBtnClick={handleTopBtnClick}
            onBookNow={handleBookNow}
          />
        } />
        <Route path="/apartment" element={<Apartments onSignIn={handleSignIn} onSignUp={handleSignUp} onBookNow={handleBookNow} />} />
        <Route path="/apartment/:id" element={<ApartmentDetail onSignIn={handleSignIn} onSignUp={handleSignUp} onBookNow={handleBookNow} />} />
        <Route path="/about" element={<About onSignIn={handleSignIn} onSignUp={handleSignUp} onBookNow={handleBookNow} />} />
        <Route path="/admin" element={<AdminDashboard onSignIn={handleSignIn} onSignUp={handleSignUp} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Modals */}
      <AuthModal open={showSignInModal} variant="signin" onClose={closeSignIn} />
      <AuthModal open={showSignUpModal} variant="signup" onClose={closeSignUp} />
      <BookingModal open={showBookingModal} onClose={closeBooking} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348012345678"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.585.628 5.03 1.738 7.188L2.546 29.08l5.976-1.178A13.935 13.935 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.69 19.68c-.338.954-1.68 1.75-2.752 1.978-1.036.22-2.054.15-3.454-.338-3.274-1.13-5.37-4.15-5.534-4.348-.164-.198-1.324-1.756-1.324-3.354 0-1.598.836-2.38 1.134-2.708.298-.328.65-.41.866-.41.216 0 .432.002.62.012.198.01.466-.076.73.556.264.632.902 2.212.984 2.376.082.164.136.356.026.576-.11.22-.166.356-.33.548-.164.192-.342.404-.488.542-.164.154-.334.322-.144.634.19.312.842 1.388 1.808 2.246 1.242 1.102 2.292 1.442 2.62 1.6.328.158.52.132.712-.08.192-.21.82-.956 1.04-1.288.22-.332.438-.276.732-.166.294.11 1.876.884 2.196 1.044.32.16.534.244.612.38.08.136.058.788-.28 1.742z" />
        </svg>
      </a>

      {/* Back to Top */}
      {showTopBtn && (
        <button
          className="back-to-top bg-[#008751]"
          onClick={handleTopBtnClick}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApartmentProvider>
          <ScrollToTop />
          <AppContent />
        </ApartmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;