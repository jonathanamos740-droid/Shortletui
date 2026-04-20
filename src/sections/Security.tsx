import { FaShieldAlt, FaVideo, FaLock, FaCheckCircle, FaCertificate, FaWifi } from 'react-icons/fa';

import { useEffect, useRef, useCallback } from 'react';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';

const securityFeatures = [
  { Icon: FaShieldAlt, title: "24/7 Estate Security", desc: "Armed guards and controlled access gates" },
  { Icon: FaVideo, title: "CCTV Surveillance", desc: "Round-the-clock monitoring systems" },
  { Icon: FaLock, title: "Secure Parking", desc: "Gated parking with security personnel" },
  { Icon: FaCheckCircle, title: "Verified Properties", desc: "All our properties are carefully inspected and certified." },
  { Icon: FaCertificate, title: "CAC Registered", desc: "All partners are legally registered" },
  { Icon: FaWifi, title: "Secure WiFi", desc: "Encrypted high-speed internet connections" }
];

export function Security() {
  const carouselApiRef = useRef<CarouselApi | null>(null);
  const intervalRef = useRef<number | null>(null);

  const setCarouselApi = useCallback((api: CarouselApi) => {
    carouselApiRef.current = api;
  }, []);

  const scrollNext = useCallback(() => {
    carouselApiRef.current?.scrollNext();
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(scrollNext, 7000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scrollNext]);

  return (
    <section className="w-full flex flex-col justify-center max-w-[calc(100%-48px)] lg:w-[1126px] mx-auto h-auto min-h-[300px] bg-[linear-gradient(to_bottom,#ffffff,#f0fdf4)] rounded-[24px] mt-[16px] p-[32px_16px] md:p-[40px_32px] overflow-hidden box-border">
      <div className="text-center mb-[24px] reveal">
        <div className="text-[26px] md:text-[32px] font-[800] mb-[8px] bg-[linear-gradient(135deg,#1a1a2e_0%,#7C3AED_100%)] bg-clip-text text-transparent leading-[1.3] text-center">Your Safety is Our Priority</div>
        <div className="text-[15px] md:text-[14px] text-text-mid mt-[8px] md:mt-0 text-center">Every property is vetted for maximum security and peace of mind</div>
      </div>
      <div className="pt-0">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          setApi={setCarouselApi}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {securityFeatures.map((item, i) => (
              <CarouselItem key={item.title} className="pl-4 md:pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="h-[180px] md:h-[220px] flex flex-col items-center justify-center p-3 md:p-6 text-center reveal group hover:scale-[1.02] transition-all duration-300" style={{transitionDelay: `${i * 0.05}s`}}>
                  <div className="mb-3 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-[50%] shadow-lg group-hover:shadow-2xl transition-all duration-300 mx-auto bg-[#e6f3ed] text-[#008751] text-[18px]">
                    <item.Icon size={24} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 leading-tight px-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-tight max-w-xs px-1">{item.desc}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
