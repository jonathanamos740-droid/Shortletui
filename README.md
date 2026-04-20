# ShortletNG — Frontend Architecture Guide

> Nigeria's most trusted shortlet apartment platform.  
> Built with **React + TypeScript + Tailwind CSS + React Router v6**.

---

## Project Structure

```
app/
├── src/
│   ├── context/
│   │   └── ApartmentContext.tsx   ← Global state (apartments CRUD)
│   ├── data/
│   │   └── apartments.ts          ← Centralized mock data + Apartment type
│   ├── services/
│   │   └── apartmentService.ts    ← All data operations (ready for API swap)
│   ├── sections/
│   │   ├── Home.tsx               ← Home page composition
│   │   ├── Hero.tsx               ← Hero section (links to /apartment)
│   │   ├── Apartment.tsx          ← /apartment listing page
│   │   ├── ApartmentDetail.tsx    ← /apartment/:id detail page
│   │   ├── AdminDashboard.tsx     ← /admin CRUD dashboard
│   │   ├── About.tsx              ← /about page
│   │   ├── Navbar.tsx             ← Global navigation
│   │   ├── Footer.tsx             ← Global footer
│   │   ├── Properties.tsx         ← Home page property grid
│   │   └── ...                    ← Other home sections
│   ├── components/
│   │   ├── AuthModal.tsx          ← Sign in / Sign up modal
│   │   ├── DatePickerModal.tsx    ← Calendar date picker
│   │   └── ...
│   ├── hooks/
│   │   └── useScrollReveal.ts     ← Scroll animation hook
│   ├── App.tsx                    ← Root: BrowserRouter + ApartmentProvider + Routes
│   └── main.tsx                   ← Entry point
```

---

## Data Flow

```
apartments.ts (initial data)
        │
        ▼
ApartmentContext.tsx (React state + CRUD functions)
        │
        ├──▶ Apartment.tsx       (listing page — useApartments())
        ├──▶ Properties.tsx      (home grid — useApartments())
        ├──▶ ApartmentDetail.tsx (detail page — getApartmentById())
        └──▶ AdminDashboard.tsx  (CRUD — addApartment / updateApartment / deleteApartment)
```

---

## Apartment Data Type

```typescript
interface Apartment {
  id: number;
  title: string;
  location: string;        // "Lagos" | "Abuja" | "Port Harcourt"
  address: string;         // Full address for display
  pricePerNight: number;   // Numeric, used for calculations
  priceLabel: string;      // Formatted: "N450,000"
  period: string;          // "per night"
  images: string[];        // Array of image URLs (first = primary)
  videoUrl?: string;       // Optional MP4 video for hero section
  beds: number;
  baths: number;
  sqft: string;
  badge: string;           // "Verified" | "New" | "Popular" | "Premium"
  amenities: string[];     // e.g. ["Wi-Fi", "24/7 Power", "Pool"]
  tags: string[];          // Quick chip tags for cards
  description: string;
  rating: number;          // 0.0 - 5.0
  popular: boolean;
  reviews: Review[];
}

interface Review {
  id: string;
  author: string;
  avatar: string;          // Single letter initial
  date: string;            // e.g. "October 2025"
  rating: number;
  comment: string;
}
```

---

## Where to Connect the Backend

### 1. Service Layer — src/services/apartmentService.ts

This is the **primary integration point**. Each function has a comment explaining the exact API swap needed:

```typescript
// CURRENT (frontend-only):
export function getApartments(apartments: Apartment[]): Apartment[] {
  return apartments;
}

// BACKEND SWAP — replace with:
export async function getApartments(): Promise<Apartment[]> {
  const res = await fetch('/api/apartments');
  return res.json();
}
```

### 2. Context — src/context/ApartmentContext.tsx

Change useState initialization to useEffect + fetch:

```typescript
// CURRENT:
const [apartments, setApartments] = useState<Apartment[]>(initialApartments);

// BACKEND SWAP — replace with:
const [apartments, setApartments] = useState<Apartment[]>([]);
useEffect(() => {
  fetch('/api/apartments')
    .then(r => r.json())
    .then(data => setApartments(data));
}, []);
```

The **component API stays identical** — pages using useApartments() require zero changes.

---

## Expected API Endpoints

| Method   | Endpoint              | Description                        |
|----------|-----------------------|------------------------------------|
| GET      | /api/apartments       | Returns all apartments             |
| GET      | /api/apartments/:id   | Returns single apartment by id     |
| POST     | /api/apartments       | Creates a new apartment            |
| PUT      | /api/apartments/:id   | Updates an existing apartment      |
| DELETE   | /api/apartments/:id   | Deletes an apartment               |

### POST / PUT Request Body

```json
{
  "title": "Luxury 3-Bedroom Flat",
  "location": "Lagos",
  "address": "Lekki Phase 1, Lagos",
  "pricePerNight": 450000,
  "priceLabel": "N450,000",
  "period": "per night",
  "images": ["https://example.com/img1.jpg"],
  "videoUrl": "https://example.com/tour.mp4",
  "beds": 3,
  "baths": 3,
  "sqft": "2,400",
  "badge": "Verified",
  "amenities": ["Wi-Fi", "24/7 Power", "Pool"],
  "tags": ["Pool", "Security"],
  "description": "...",
  "rating": 4.9,
  "popular": true,
  "reviews": []
}
```

---

## Routes

| Path              | Component           | Description                     |
|-------------------|---------------------|---------------------------------|
| /                 | Home                | Landing page                    |
| /apartment        | Apartments          | Full apartment listing          |
| /apartment/:id    | ApartmentDetail     | Dynamic single apartment detail |
| /about            | About               | About ShortletNG                |
| /admin            | AdminDashboard      | Owner CRUD dashboard            |

---

## Environment Variables (for backend connection)

Create a .env file in /app:

```
VITE_API_BASE_URL=https://your-api-domain.com
```

Then update service layer calls:

```typescript
const BASE = import.meta.env.VITE_API_BASE_URL;
const res = await fetch(`${BASE}/api/apartments`);
```

---

## Media Handling

- **Images**: Pass URLs (Cloudinary, S3, etc.) in the images[] array. First image is used as card thumbnail.
- **Videos**: Pass a hosted .mp4 URL as videoUrl. The detail page auto-detects and renders a video element.
- **Admin uploads**: Currently URL-based. For file uploads, add multipart/form-data to POST /api/apartments and return the hosted URL.

---

## Running Locally

```bash
cd app
npm install
npm run dev
```

Dev server: http://localhost:5173

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| UI          | React 18 + TypeScript         |
| Styling     | Tailwind CSS v3               |
| Routing     | React Router v6               |
| Icons       | Lucide React + React Icons    |
| State       | React Context API             |
| Build       | Vite                          |
