// src/services/apartmentService.ts
// ─── Apartment Service Layer ──────────────────────────────────────────────────
// This service abstracts all apartment data operations.
// When a real backend is ready:
//   1. Replace `apartments` parameter with actual fetch() / axios calls.
//   2. Change each function to async and return Promise<Apartment[]> etc.
//   3. Update ApartmentContext.tsx to call these async fns with useEffect.
//
// Expected API endpoints (when backend is connected):
//   GET    /api/apartments          → getApartments()
//   GET    /api/apartments/:id      → getApartmentById()
//   POST   /api/apartments          → addApartment()
//   PUT    /api/apartments/:id      → updateApartment()
//   DELETE /api/apartments/:id      → deleteApartment()

import type { Apartment } from '../data/apartments';

// ─── READ ─────────────────────────────────────────────────────────────────────

/**
 * Returns all apartments.
 * Backend swap: replace with `fetch('/api/apartments').then(r => r.json())`
 */
export function getApartments(apartments: Apartment[]): Apartment[] {
  return apartments;
}

/**
 * Returns a single apartment by its id, or undefined if not found.
 * Backend swap: replace with `fetch(\`/api/apartments/${id}\`).then(r => r.json())`
 */
export function getApartmentById(apartments: Apartment[], id: number): Apartment | undefined {
  return apartments.find(a => a.id === id);
}

/**
 * Returns apartments filtered by location label.
 * Backend swap: add query param → /api/apartments?location=Lagos
 */
export function getApartmentsByLocation(apartments: Apartment[], location: string): Apartment[] {
  if (location === 'All') return apartments;
  return apartments.filter(a => a.location === location);
}

/**
 * Returns apartments filtered by price badge / type.
 * Budget < 200,000 | Luxury > 400,000 | badge match
 * Backend swap: add query params → /api/apartments?filter=Budget
 */
export function filterApartments(apartments: Apartment[], filter: string): Apartment[] {
  if (filter === 'All') return apartments;
  if (filter === 'Budget') return apartments.filter(a => a.pricePerNight < 200000);
  if (filter === 'Luxury') return apartments.filter(a => a.pricePerNight > 400000);
  return apartments.filter(a => a.badge === filter || a.location === filter);
}

// ─── WRITE (frontend-only simulated mutations) ────────────────────────────────

/**
 * Adds a new apartment to the list. Returns the updated list.
 * Backend swap: POST /api/apartments with body = newApartment
 */
export function addApartment(apartments: Apartment[], newApartment: Omit<Apartment, 'id'>): Apartment[] {
  const nextId = apartments.length > 0 ? Math.max(...apartments.map(a => a.id)) + 1 : 1;
  const created: Apartment = { ...newApartment, id: nextId };
  return [...apartments, created];
}

/**
 * Updates an existing apartment. Returns the updated list.
 * Backend swap: PUT /api/apartments/:id with body = partialData
 */
export function updateApartment(
  apartments: Apartment[],
  id: number,
  updates: Partial<Apartment>
): Apartment[] {
  return apartments.map(a => (a.id === id ? { ...a, ...updates } : a));
}

/**
 * Deletes an apartment by id. Returns the updated list.
 * Backend swap: DELETE /api/apartments/:id
 */
export function deleteApartment(apartments: Apartment[], id: number): Apartment[] {
  return apartments.filter(a => a.id !== id);
}

/**
 * Calculates total booking cost.
 * price × nights + cleaning fee + service fee
 */
export function calculateBookingTotal(pricePerNight: number, nights: number): {
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
} {
  const subtotal = pricePerNight * nights;
  const cleaningFee = 25000;
  const serviceFee = 15000;
  return {
    subtotal,
    cleaningFee,
    serviceFee,
    total: subtotal + cleaningFee + serviceFee
  };
}
