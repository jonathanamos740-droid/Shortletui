// src/data/apartments.ts
// ─── Centralized Apartment Data ───────────────────────────────────────────────
// This is the single source of truth for all apartment listings.
// To connect a real backend, replace the `initialApartments` array with
// an API call inside ApartmentContext.tsx or apartmentService.ts.

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Apartment {
  id: number;
  title: string;
  location: string;        // short city/area label for filtering
  address: string;         // full display address
  pricePerNight: number;   // numeric value for calculation
  priceLabel: string;      // formatted display string e.g. "₦450,000"
  period: string;          // "per night"
  images: string[];        // array of image URLs (first used as primary)
  videoUrl?: string;       // optional video URL
  beds: number;
  baths: number;
  sqft: string;
  badge: string;           // e.g. "Verified" | "New" | "Popular" | "Premium"
  amenities: string[];
  tags: string[];          // quick chip tags (e.g. "Pool", "Wifi")
  description: string;
  rating: number;          // 0–5
  popular: boolean;
  reviews: Review[];
}

export const initialApartments: Apartment[] = [
  {
    id: 1,
    title: "Luxury 3-Bedroom Flat",
    location: "Lagos",
    address: "Lekki Phase 1, Lagos",
    pricePerNight: 450000,
    priceLabel: "₦450,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    beds: 3,
    baths: 3,
    sqft: "2,400",
    badge: "Verified",
    amenities: ["High-Speed Wi-Fi", "Smart TV", "Air Conditioning", "24/7 Power", "Security", "Private Pool"],
    tags: ["24/7 Power", "Pool", "Security"],
    description: "Experience luxury living in this beautifully furnished 3-bedroom flat in the heart of Lekki Phase 1. Perfectly located with easy access to the city's best attractions, featuring modern amenities, a fully equipped kitchen, and a private pool. Ideal for both short and extended stays.",
    rating: 4.9,
    popular: true,
    reviews: [
      {
        id: "r1",
        author: "Michael D.",
        avatar: "M",
        date: "October 2025",
        rating: 5,
        comment: "Absolutely wonderful stay. The place looks exactly like the pictures, maybe even better. The team was incredibly responsive and the location is perfect!"
      },
      {
        id: "r2",
        author: "Adaeze O.",
        avatar: "A",
        date: "September 2025",
        rating: 5,
        comment: "The 24/7 power and security were incredible. We felt completely at home. Will definitely book again."
      }
    ]
  },
  {
    id: 2,
    title: "Modern Waterfront Suite",
    location: "Lagos",
    address: "Victoria Island, Lagos",
    pricePerNight: 280000,
    priceLabel: "₦280,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    beds: 2,
    baths: 2,
    sqft: "1,800",
    badge: "New",
    amenities: ["Waterfront View", "Smart Home", "High-Speed Wi-Fi", "Gym Access", "24/7 Power"],
    tags: ["Ocean View", "Smart Home", "Gated"],
    description: "A stunning waterfront suite on Victoria Island with breathtaking ocean views. This modern 2-bedroom apartment features smart home technology, premium finishes, and direct access to the beach. Perfect for those who want luxury with a natural backdrop.",
    rating: 4.8,
    popular: true,
    reviews: [
      {
        id: "r3",
        author: "Chidi M.",
        avatar: "C",
        date: "November 2025",
        rating: 5,
        comment: "The waterfront view is absolutely stunning. Woke up every morning to the sound of waves. Beautiful apartment!"
      }
    ]
  },
  {
    id: 3,
    title: "Cozy Studio Apartment",
    location: "Lagos",
    address: "Ikoyi, Lagos",
    pricePerNight: 150000,
    priceLabel: "₦150,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    beds: 1,
    baths: 1,
    sqft: "950",
    badge: "Popular",
    amenities: ["Wi-Fi", "Smart TV", "Air Conditioning", "24/7 Power", "Dedicated Workspace", "Gym"],
    tags: ["Serene", "Workspace", "DSTV"],
    description: "A beautifully designed studio apartment in the prestigious Ikoyi neighbourhood. Perfect for solo travelers or couples who appreciate elegance in a compact space. Features a dedicated workspace, premium furnishings, and all the amenities you need for a comfortable stay.",
    rating: 4.7,
    popular: true,
    reviews: [
      {
        id: "r4",
        author: "Ngozi A.",
        avatar: "N",
        date: "August 2025",
        rating: 5,
        comment: "Perfect for a solo trip. Very cozy and the workspace was a bonus for remote work. Highly recommend!"
      }
    ]
  },
  {
    id: 4,
    title: "Penthouse with Pool",
    location: "Lagos",
    address: "Banana Island, Lagos",
    pricePerNight: 850000,
    priceLabel: "₦850,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    beds: 4,
    baths: 4,
    sqft: "3,500",
    badge: "Premium",
    amenities: ["Private Infinity Pool", "Home Cinema", "PS5 Gaming", "Snooker Table", "Private Chef", "Pets Allowed", "24/7 Security"],
    tags: ["Private Pool", "Cinema", "PS5", "Pets Allowed"],
    description: "The ultimate luxury penthouse experience on exclusive Banana Island. This 4-bedroom masterpiece features a private infinity pool, a fully equipped home cinema, PS5 gaming console, snooker table, and a private chef. The pinnacle of Lagos luxury living.",
    rating: 5.0,
    popular: true,
    reviews: [
      {
        id: "r5",
        author: "Emeka K.",
        avatar: "E",
        date: "December 2025",
        rating: 5,
        comment: "Absolutely worth every naira. The infinity pool at night is an experience like no other. The private chef made the best jollof rice. Perfection."
      },
      {
        id: "r6",
        author: "Fatima B.",
        avatar: "F",
        date: "January 2026",
        rating: 5,
        comment: "We celebrated our anniversary here and it was magical. The penthouse exceeded all expectations. Already planning our next visit."
      }
    ]
  },
  {
    id: 5,
    title: "Garden View Apartment",
    location: "Lagos",
    address: "Yaba, Lagos",
    pricePerNight: 120000,
    priceLabel: "₦120,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    beds: 2,
    baths: 2,
    sqft: "1,400",
    badge: "Verified",
    amenities: ["Garden Access", "Wi-Fi", "Air Conditioning", "24/7 Power", "Parking"],
    tags: ["Garden", "Parking", "24/7 Light"],
    description: "A serene 2-bedroom apartment with a beautiful private garden. Nestled in the vibrant Yaba neighborhood, this charming property offers a tranquil escape from the city buzz while keeping you close to great restaurants, tech hubs, and cultural spots.",
    rating: 4.6,
    popular: false,
    reviews: [
      {
        id: "r7",
        author: "Tunde F.",
        avatar: "T",
        date: "July 2025",
        rating: 4,
        comment: "Loved the garden! Great value for money in a nice area. Would book again."
      }
    ]
  },
  {
    id: 6,
    title: "Smart Home Loft",
    location: "Lagos",
    address: "Ikeja GRA, Lagos",
    pricePerNight: 320000,
    priceLabel: "₦320,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    beds: 2,
    baths: 2,
    sqft: "1,650",
    badge: "New",
    amenities: ["Smart Home", "Voice Control", "High-Speed Wi-Fi", "Apple TV", "24/7 Power", "Smart Security"],
    tags: ["Smart Home", "Voice Control", "Security"],
    description: "A cutting-edge smart home loft in Ikeja GRA featuring full voice-controlled amenities. Control lighting, temperature, and security from your phone or via voice commands. This futuristic 2-bedroom space redefines modern living in Lagos.",
    rating: 4.8,
    popular: false,
    reviews: [
      {
        id: "r8",
        author: "Samuel I.",
        avatar: "S",
        date: "March 2026",
        rating: 5,
        comment: "The smart home features blew my mind! Felt like living in the future. Super clean and modern."
      }
    ]
  },
  {
    id: 101,
    title: "Lekki Phase 1 Penthouse",
    location: "Lagos",
    address: "Freedom Way, Lekki Phase 1, Lagos",
    pricePerNight: 85000,
    priceLabel: "₦85,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    beds: 3,
    baths: 3,
    sqft: "150",
    badge: "Popular",
    amenities: ["24/7 Power", "Pool", "Security", "Wi-Fi", "Air Conditioning"],
    tags: ["24/7 Power", "Pool", "Security"],
    description: "A stunning penthouse at Freedom Way, Lekki Phase 1. Enjoy panoramic views of the city from the rooftop terrace. This 3-bedroom gem features a private pool, 24/7 power and security, and premium furnishings throughout.",
    rating: 4.9,
    popular: true,
    reviews: [
      {
        id: "r9",
        author: "Bukola A.",
        avatar: "B",
        date: "February 2026",
        rating: 5,
        comment: "The rooftop view is breathtaking. Stunning apartment in a great location!"
      }
    ]
  },
  {
    id: 102,
    title: "Ikoyi Luxury Apartment",
    location: "Lagos",
    address: "Gerrard Road, Ikoyi, Lagos",
    pricePerNight: 120000,
    priceLabel: "₦120,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    beds: 4,
    baths: 4,
    sqft: "300",
    badge: "Verified",
    amenities: ["Ocean View", "Smart Home", "Gated Estate", "24/7 Power", "Gym"],
    tags: ["Ocean View", "Smart Home", "Gated"],
    description: "An opulent 4-bedroom apartment on the prestigious Gerrard Road in Ikoyi. Offers ocean views, smart home technology, and access to a gated estate with world-class facilities. The perfect luxury base for business or leisure.",
    rating: 4.8,
    popular: true,
    reviews: [
      {
        id: "r10",
        author: "Olu M.",
        avatar: "O",
        date: "April 2026",
        rating: 5,
        comment: "The smart home features and ocean views made this an unforgettable experience."
      }
    ]
  },
  {
    id: 103,
    title: "Banana Island Villa",
    location: "Lagos",
    address: "Banana Island Estate, Ikoyi, Lagos",
    pricePerNight: 95000,
    priceLabel: "₦95,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    beds: 5,
    baths: 5,
    sqft: "500",
    badge: "Premium",
    amenities: ["Private Pool", "Home Cinema", "Private Chef", "PS5 Gaming", "24/7 Security"],
    tags: ["Private Pool", "Cinema", "Chef"],
    description: "An exclusive villa on Nigeria's most coveted address — Banana Island. With 5 bedrooms, a private pool, home cinema, and a dedicated private chef, this property sets the gold standard for ultra-luxury accommodation in Lagos.",
    rating: 5.0,
    popular: true,
    reviews: [
      {
        id: "r11",
        author: "Grace E.",
        avatar: "G",
        date: "March 2026",
        rating: 5,
        comment: "A truly world-class experience. The private chef was exceptional and the villa was immaculate."
      }
    ]
  },
  {
    id: 104,
    title: "Maitama Executive Suite",
    location: "Abuja",
    address: "Maitama District, Abuja",
    pricePerNight: 65000,
    priceLabel: "₦65,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    beds: 3,
    baths: 3,
    sqft: "200",
    badge: "Verified",
    amenities: ["DSTV Premium", "Wi-Fi", "Air Conditioning", "24/7 Power", "Parking"],
    tags: ["DSTV Premium", "Wifi", "AC"],
    description: "A premium executive suite in the heart of Maitama, Abuja's most prestigious district. Ideal for government officials, executives, and business travelers who demand quality, comfort, and discretion. Features premium DSTV, high-speed Wi-Fi, and ample parking.",
    rating: 4.7,
    popular: false,
    reviews: [
      {
        id: "r12",
        author: "James N.",
        avatar: "J",
        date: "January 2026",
        rating: 5,
        comment: "Perfect for my work trip to Abuja. Clean, professional, and everything worked flawlessly."
      }
    ]
  },
  {
    id: 105,
    title: "Wuse 2 Premium Stay",
    location: "Abuja",
    address: "Amino Kano Crescent, Wuse 2, Abuja",
    pricePerNight: 45000,
    priceLabel: "₦45,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=70",
    ],
    beds: 2,
    baths: 2,
    sqft: "120",
    badge: "Verified",
    amenities: ["Wi-Fi", "Serene Environment", "Parking", "24/7 Light", "Security"],
    tags: ["Serene", "Parking", "24/7 Light"],
    description: "A comfortable 2-bedroom apartment in the bustling Wuse 2 area of Abuja. Great for families or couples looking for a peaceful, well-connected base. Close to top restaurants, shops, and business centers. Reliable 24/7 power.",
    rating: 4.5,
    popular: false,
    reviews: [
      {
        id: "r13",
        author: "Amaka R.",
        avatar: "A",
        date: "December 2025",
        rating: 4,
        comment: "Great location and very comfortable. Good value for money in Abuja."
      }
    ]
  },
  {
    id: 106,
    title: "Port Harcourt GRA",
    location: "Port Harcourt",
    address: "Old GRA, Port Harcourt, Rivers",
    pricePerNight: 55000,
    priceLabel: "₦55,000",
    period: "per night",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    ],
    beds: 3,
    baths: 2,
    sqft: "180",
    badge: "Verified",
    amenities: ["Quiet Estate", "24/7 Security", "Fully Furnished", "Wi-Fi", "24/7 Power"],
    tags: ["Quiet Estate", "Security", "Furnished"],
    description: "A beautifully furnished 3-bedroom apartment in the serene Old GRA, Port Harcourt. Situated in one of PH's most established and quiet residential estates, perfect for business travelers and families. 24/7 security and power guaranteed.",
    rating: 4.6,
    popular: false,
    reviews: [
      {
        id: "r14",
        author: "Chibuzor O.",
        avatar: "C",
        date: "November 2025",
        rating: 5,
        comment: "Very quiet and secure neighborhood. The apartment was spotless. Highly recommended for PH visitors."
      }
    ]
  }
];
