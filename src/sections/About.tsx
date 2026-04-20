// sections/About.tsx
import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Button } from '../components/ui/button';
import { ChevronDown, Phone, Play } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const faqs = [
  {
    question: "How do you verify properties on ShortletNG?",
    answer: "Our verification team physically inspects every listing. We check amenities, safety features, documentation, and photograph each property personally before it goes live on the platform."
  },
  {
    question: "What is the booking cancellation policy?",
    answer: "Most listings offer flexible cancellation up to 48 hours before check-in for a full refund. Specific policies are clearly displayed on each property page before you confirm."
  },
  {
    question: "Is there insurance coverage for my booking?",
    answer: "Yes. Every booking includes basic protection against misrepresentation. Premium coverage options are available at checkout for additional peace of mind."
  }
];

const benefits = [
  {
    num: "1",
    title: "Verified Listings & Guest Protection",
    desc: "Every property on ShortletNG is physically inspected by our team. We verify amenities, safety features, and photo accuracy so guests always know exactly what they're booking. Your investment in trust is our top priority."
  },
  {
    num: "2",
    title: "Premium Concierge Support",
    desc: "We support our guests with 24/7 dedicated service. Whether you're booking your first stay or need local recommendations, our team ensures your shortlet experience is perfect."
  },
  {
    num: "3",
    title: "A Unified Nigerian Hospitality Standard",
    desc: "ShortletNG provides premium short-term accommodation across Nigeria. By establishing a single standard of excellence, we guarantee a level of luxury and reliability you can always trust."
  }
];

const blogPosts = [
  {
    title: "The Rise of Shortlet Culture in Nigeria",
    excerpt: "It is a long established fact that quality accommodation drives repeat bookings. The shortlet market in Nigeria is evolving fast — here is what you need to know.",
    date: "May 20th, 2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=70"
  },
  {
    title: "Experience Luxury Living in Lagos",
    excerpt: "Discover the finest neighborhoods and premium amenities that make our shortlets the ultimate choice for your next stay.",
    date: "May 20th, 2024",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=70"
  },
  {
    title: "A Word From Our Founder",
    excerpt: "It is a long established fact that trust is the foundation of hospitality. Our founder shares the vision behind ShortletNG and where we are headed.",
    date: "May 20th, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70"
  }
];

const heroImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=70",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&q=70",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=70",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=70",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=70",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=70",
];

export function About({ onSignIn, onSignUp, onBookNow }: { onSignIn?: () => void, onSignUp?: () => void, onBookNow?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-sans overflow-x-hidden flex flex-col">
      <Navbar scrolled={scrolled} onSignIn={onSignIn || (() => {})} onSignUp={onSignUp || (() => {})} onBookNow={onBookNow} />

      {/* ── HERO ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[60px] items-center p-[24px_16px] md:p-[60px_32px] lg:p-[80px_48px_48px] bg-white rounded-[24px] mt-[80px] lg:mt-[20px] w-full max-w-[calc(100%-48px)] lg:w-[1126px] mx-auto box-border">
        {/* Left: photo collage */}
        <div className="grid grid-cols-3 grid-rows-[repeat(3,80px)] md:grid-rows-[repeat(3,120px)] gap-[10px] transform -rotate-2">
          {heroImages.map((src, i) => (
            <div key={i} className={`rounded-[12px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] ${i === 0 ? 'col-span-1' : ''}`} style={{ transform: i % 2 === 0 ? 'rotate(1.5deg)' : 'rotate(-1deg)' }}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Right: content */}
        <div>
          <h1 className="text-[36px] lg:text-[48px] font-[800] text-[#111827] mb-[20px] leading-[1.15]">
            ShortletNG
          </h1>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[14px]">
            Welcome to ShortletNG — Nigeria's most trusted premium short-term apartments. We provide unmatched hospitality experiences for business travelers, vacationers, and anyone seeking luxury and comfort.
          </p>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[28px]">
            Contact us to learn more about our exclusive properties and to book your next stay.
          </p>

          <div className="flex gap-[12px] mb-[32px]">
            <Button className="bg-[#111827] hover:bg-[#1f2937] text-white py-[12px] px-[28px] rounded-[8px] font-[600] text-[15px] transition-colors border-none h-auto">
              Join us
            </Button>
            <Button variant="outline" className="border-[1.5px] border-[#d1d5db] bg-white hover:bg-[#f9fafb] text-[#111827] py-[12px] px-[28px] rounded-[8px] font-[600] text-[15px] transition-colors h-auto">
              Message on whatsapp
            </Button>
          </div>

          <p className="text-[13px] text-[#9ca3af] mb-[8px]">Have any questions? Contact us:</p>
          <div className="flex items-center gap-[10px] text-[22px] font-[700] text-[#111827]">
            <Phone size={20} className="text-[#008751]" />
            +234 (800) 123-4567
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[40px] items-center p-[24px_16px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <div>
          <p className="text-[12px] font-[700] text-[#9ca3af] uppercase tracking-[1px] mb-[12px]">WHO WE ARE</p>
          <h2 className="text-[32px] lg:text-[40px] font-[800] text-[#111827] mb-[20px] leading-[1.2]">About us</h2>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[14px]">
            Welcome to the ShortletNG Experience. We are a dedicated hospitality firm focused on delivering consistent excellence across our entire portfolio of premium Nigerian shortlets.
          </p>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[14px]">
            Whether you are traveling for business, a quick getaway, or a long-term relocation, our properties are designed to offer the comforts of home combined with the luxury of a 5-star hotel.
          </p>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[28px]">
            Explore our meticulously curated apartments and enjoy learning about Nigeria's unique hospitality culture through our local touches.
          </p>
          <Button className="bg-[#111827] hover:bg-[#1f2937] text-white py-[12px] px-[28px] rounded-[8px] font-[600] transition-colors border-none h-auto">
            Read more
          </Button>
        </div>
        <div className="rounded-[20px] overflow-hidden h-[300px] lg:h-[380px] shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="About ShortletNG"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── MEMBERS BENEFIT ── */}
      <section className="p-[24px_16px] lg:p-[48px_48px] bg-[#f9fafb] rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <div className="text-center mb-[40px] lg:mb-[56px]">
          <p className="text-[12px] font-[700] text-[#9ca3af] uppercase tracking-[1px] mb-[12px]">OUR PROMISE</p>
          <h2 className="text-[28px] lg:text-[36px] font-[800] text-[#111827] mb-[14px]">The ShortletNG Standard</h2>
          <p className="text-[15px] text-[#6b7280] max-w-[560px] mx-auto leading-[1.7]">
            ShortletNG is committed to delivering a superior standard of living. We aggressively protect your comfort and ensure every stay is perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] lg:gap-[48px]">
          {benefits.map((b, idx) => (
            <div key={idx}>
              <div className="text-[48px] lg:text-[64px] font-[800] text-[#e5e7eb] leading-none mb-[16px]">{b.num}</div>
              <h3 className="text-[18px] font-[700] text-[#111827] mb-[12px] leading-[1.3]">{b.title}</h3>
              <p className="text-[14px] text-[#6b7280] leading-[1.75]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG POSTS ── */}
      <section className="p-[24px_16px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <div className="text-center mb-[40px] lg:mb-[48px]">
          <h2 className="text-[28px] lg:text-[32px] font-[800] text-[#111827] mb-[12px]">Our latest blog posts</h2>
          <p className="text-[15px] text-[#6b7280] max-w-[560px] mx-auto leading-[1.7]">
            ShortletNG keeps you informed with the most relevant news and insights for improving your experience and growing your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="cursor-pointer group">
              <div className="h-[220px] rounded-[12px] overflow-hidden mb-[20px]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105" />
              </div>
              <h3 className="text-[17px] font-[700] text-[#111827] mb-[10px]">{post.title}</h3>
              <p className="text-[13px] text-[#6b7280] leading-[1.6] mb-[16px]">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-[#9ca3af]">{post.date}</span>
                <span className="text-[13px] font-[600] text-[#008751] hover:text-[#00703c] transition-colors">Read more</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DONATION / HOST CTA ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[40px] items-center p-[24px_16px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <div>
          <p className="text-[12px] font-[700] text-[#9ca3af] uppercase tracking-[1px] mb-[12px]">BOOK WITH CONFIDENCE</p>
          <h2 className="text-[36px] lg:text-[48px] font-[800] text-[#111827] mb-[20px] leading-[1.1]">Experience Excellence</h2>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[14px]">
            Welcome to ShortletNG — Nigeria's most trusted luxury stays. We maintain a breathtaking collection of properties, from modern studios to sweeping penthouses, all crafted and ready for you.
          </p>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[14px]">
            Reserve your property today and let our dedicated concierge team elevate your lifestyle and provide seamless comfort.
          </p>
          <p className="text-[15px] text-[#6b7280] leading-[1.75] mb-[28px]">
            Whether you are on a business trip or vacation, please enjoy browsing our expansive collection of Nigeria's finest spaces.
          </p>
          <Button className="bg-[#111827] hover:bg-[#1f2937] text-white py-[12px] px-[28px] rounded-[8px] font-[600] transition-colors border-none h-auto">
            Read more
          </Button>
        </div>

        {/* Video placeholder */}
        <div className="h-[250px] lg:h-[320px] rounded-[20px] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.15)] cursor-pointer group">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70"
            alt="Property listing"
            className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-50 group-hover:scale-105 transition-all duration-[500ms]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[64px] h-[64px] bg-[rgba(255,255,255,0.9)] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Play size={24} className="text-[#111827] ml-[3px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN US ── */}
      <section className="relative rounded-[24px] mt-[16px] overflow-hidden min-h-[320px] flex items-center justify-center w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=70"
          alt="Why join us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center p-[24px_16px] lg:p-[48px_48px] w-full">
          <h2 className="text-[36px] lg:text-[52px] font-[800] text-white mb-[20px] leading-[1.15]">
            Book Your Stay
          </h2>
          <p className="text-[16px] text-white/85 max-w-[560px] mx-auto mb-[36px] leading-[1.75]">
            Experience the height of Nigerian hospitality. Make your reservation today and discover why our properties remain the top choice for uncompromising comfort.
          </p>
          <Button onClick={onBookNow} className="bg-[#111827] hover:bg-[#1f2937] text-white py-[14px] px-[36px] rounded-[8px] font-[600] text-[16px] transition-colors border-none h-auto">
            Book Now
          </Button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="p-[24px_16px] lg:p-[48px_48px] bg-white rounded-[24px] mt-[16px] w-[1126px] max-w-[calc(100%-48px)] mx-auto box-border">
        <div className="text-center mb-[40px] lg:mb-[48px]">
          <h2 className="text-[28px] lg:text-[36px] font-[800] text-[#111827] mb-[12px]">FAQ</h2>
          <p className="text-[15px] text-[#6b7280] max-w-[500px] mx-auto">
            Frequently asked questions about staying at our properties
          </p>
        </div>

        <div className="max-w-[760px] mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#e5e7eb] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-[22px] flex justify-between items-center bg-transparent border-none font-sans text-[16px] font-[600] text-[#111827] cursor-pointer text-left gap-[16px] hover:text-[#008751] transition-colors group"
                aria-expanded={openFaq === idx}
              >
                {faq.question}
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#008751]' : 'text-[#6b7280] group-hover:text-[#008751]'}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                style={{ maxHeight: openFaq === idx ? '200px' : '0' }}
              >
                <p className="text-[15px] text-[#6b7280] leading-[1.75] pb-[22px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GLOBAL FOOTER ── */}
      <Footer />
    </div>
  );
}