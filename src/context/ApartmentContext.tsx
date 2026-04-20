// src/context/ApartmentContext.tsx
// ─── Global Apartment State ───────────────────────────────────────────────────
// Provides apartment data and mutation functions to the entire app tree.
// When a backend is ready:
//   1. Swap the useState initializer with a useEffect + fetch() call.
//   2. Add loading / error states.
//   3. The component API (useApartments hook) stays the same — pages won't change.

import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialApartments, type Apartment } from '../data/apartments';
import {
  addApartment as svcAdd,
  updateApartment as svcUpdate,
  deleteApartment as svcDelete,
} from '../services/apartmentService';

// ─── Context Shape ─────────────────────────────────────────────────────────────
interface ApartmentContextValue {
  apartments: Apartment[];
  addApartment: (data: Omit<Apartment, 'id'>) => void;
  updateApartment: (id: number, updates: Partial<Apartment>) => void;
  deleteApartment: (id: number) => void;
}

const ApartmentContext = createContext<ApartmentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ApartmentProvider({ children }: { children: ReactNode }) {
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);

  const addApartment = (data: Omit<Apartment, 'id'>) => {
    setApartments(prev => svcAdd(prev, data));
  };

  const updateApartment = (id: number, updates: Partial<Apartment>) => {
    setApartments(prev => svcUpdate(prev, id, updates));
  };

  const deleteApartment = (id: number) => {
    setApartments(prev => svcDelete(prev, id));
  };

  return (
    <ApartmentContext.Provider value={{ apartments, addApartment, updateApartment, deleteApartment }}>
      {children}
    </ApartmentContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApartments() {
  const ctx = useContext(ApartmentContext);
  if (!ctx) throw new Error('useApartments must be used within ApartmentProvider');
  return ctx;
}
