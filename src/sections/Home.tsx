import { useScrollReveal } from '../hooks/useScrollReveal';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Security } from './Security';
import { Tranquility } from './Tranquility';
import { Features } from './Features';
import { Properties } from './Properties';
import { DarkSection } from './DarkSection';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';
import { SVGShowcase } from '../components/SVGShowcase';
import { FAQ } from '../components/FAQ';


interface HomeProps {
  scrolled: boolean;
  showTopBtn: boolean;
  showSignInModal: boolean;
  showSignUpModal: boolean;
  onSignInTopClick: () => void;
  onSignUpTopClick: () => void;
  onCloseSignIn: () => void;
  onCloseSignUp: () => void;
  onTopBtnClick: () => void;
  onBookNow?: () => void;
}

export function Home({
  scrolled,
  showTopBtn,
  showSignInModal,
  showSignUpModal,
  onSignInTopClick,
  onSignUpTopClick,
  onCloseSignIn,
  onCloseSignUp,
  onTopBtnClick,
  onBookNow,
}: HomeProps) {
  useScrollReveal();

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans overflow-x-hidden flex flex-col pb-[22px]">
      <Navbar
        scrolled={scrolled}
        onSignIn={onSignInTopClick}
        onSignUp={onSignUpTopClick}
        onBookNow={onBookNow}
      />
      <Hero />
      <Security />
      <Tranquility />
      <Features />
      <Properties />
      <SVGShowcase />
      <DarkSection />
      <Testimonials />
      <FAQ />
      <Footer />




    </div>
  );
}