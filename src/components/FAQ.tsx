import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import ReadingBook from '../assests/reading-a-book.svg';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I book a shortlet apartment?",
    answer: "Booking is simple! Browse our verified properties, select your preferred dates, and complete payment securely via Paystack or Flutterwave. You'll receive instant confirmation and check-in details via email and WhatsApp."
  },
  {
    question: "Are all properties verified?",
    answer: "Yes! Every property on ShortletNG undergoes rigorous verification. We verify CAC registration, conduct strict internal quality checks, and physically inspect each property to ensure it meets our quality and safety standards."
  },
  {
    question: "What is the cancellation policy?",
    answer: "We offer flexible cancellation policies. Most bookings can be cancelled up to 48 hours before check-in for a full refund. Some premium properties may have different terms, which are clearly displayed before booking."
  },
  {
    question: "Is 24/7 power guaranteed?",
    answer: "Absolutely! All our properties come with guaranteed 24/7 power supply through inverters, solar systems, or backup generators. This is a non-negotiable requirement for all listings on our platform."
  },
  {
    question: "How do I contact customer support?",
    answer: "Our customer support team is available 24/7 via WhatsApp, phone call, or email. You can also use the live chat feature on our website for instant assistance."
  },
  {
    question: "Can I extend my stay?",
    answer: "Yes, you can extend your stay subject to availability. Simply contact our support team or use the 'Extend Stay' option in your booking dashboard. Early extensions get priority pricing."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 md:py-12 px-4 md:px-8 mx-auto max-w-[1126px] w-full bg-gradient-to-b from-white to-slate-50 rounded-[24px] mt-[16px] sr">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-[800] mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-green-800 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg text-slate-500 font-[500] max-w-xl mx-auto">
          Got questions? We've got answers
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-10 items-start">
        <img 
          src={ReadingBook} 
          alt="Reading about shortlets" 
          className="w-full h-[260px] md:h-[340px] rounded-2xl shadow-lg object-cover hover:scale-[1.02] transition-transform duration-500 border-2 border-white/60 sr-scale" 
        />
        
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="border-b border-gray-100 last:border-none"
            >
              <button 
                className="w-full py-4 flex justify-between items-center bg-transparent border-none font-sans text-[15px] font-[600] text-[#111827] cursor-pointer text-left gap-3 hover:text-[#008751] transition-colors group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <FaChevronDown className={`flex-shrink-0 text-[11px] transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#008751]' : 'text-[#9ca3af] group-hover:text-[#008751]'}`} />
              </button>
              <div 
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: openIndex === index ? '180px' : '0' }}
              >
                <p className="text-[14px] text-[#6b7280] leading-[1.7] pb-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
