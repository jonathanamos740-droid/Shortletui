// src/sections/AdminDashboard.tsx
// ─── Admin Dashboard (Frontend-Only Simulation) ───────────────────────────────
// Provides full CRUD for apartments via React Context.
// No authentication — single-owner dashboard.

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useApartments } from '../context/ApartmentContext';
import { useAuth } from '../context/AuthContext';
import { mediaService } from '../services/mediaService';
import type { Apartment } from '../data/apartments';
import {
  Plus, Pencil, Trash2, X, Save, Home, Eye, Image, CheckCircle2,
  LogOut, Upload
} from 'lucide-react';

type FormMode = 'add' | 'edit' | null;

const EMPTY_FORM: Omit<Apartment, 'id'> = {
  title: '',
  location: 'Lagos',
  address: '',
  pricePerNight: 0,
  priceLabel: '',
  period: 'per night',
  images: [],
  videoUrl: '',
  beds: 1,
  baths: 1,
  sqft: '',
  badge: 'Verified',
  amenities: [],
  tags: [],
  description: '',
  rating: 4.5,
  popular: false,
  reviews: [],
};

export function AdminDashboard({ onSignIn, onSignUp }: { onSignIn?: () => void; onSignUp?: () => void }) {
  const navigate = useNavigate();
  const { apartments, addApartment, updateApartment, deleteApartment } = useApartments();
  const { isAuthenticated, login, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Apartment, 'id'>>(EMPTY_FORM);
  const [amenityInput, setAmenityInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setLoginError('');
    } else {
      setLoginError('Invalid password. (Hint: use admin123)');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await mediaService.uploadImage(file);
      setForm(prev => ({ ...prev, images: [...prev.images, url] }));
    } catch (err) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const url = await mediaService.uploadVideo(file);
      setForm(prev => ({ ...prev, videoUrl: url }));
    } catch (err) {
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setAmenityInput('');
    setTagInput('');
    setEditingId(null);
    setFormMode('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (apt: Apartment) => {
    const { id, ...rest } = apt;
    setForm(rest);
    setEditingId(id);
    setFormMode('edit');
    setAmenityInput('');
    setTagInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
  };

  const handleChange = (field: keyof Omit<Apartment, 'id'>, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const removeImage = (idx: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const addAmenity = () => {
    const a = amenityInput.trim();
    if (a && !form.amenities.includes(a)) {
      setForm(prev => ({ ...prev, amenities: [...prev.amenities, a] }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (a: string) => {
    setForm(prev => ({ ...prev, amenities: prev.amenities.filter(x => x !== a) }));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, t] }));
      setTagInput('');
    }
  };

  const removeTag = (t: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.address || !form.pricePerNight) return;
    const priceLabel = `₦${Number(form.pricePerNight).toLocaleString()}`;
    const finalForm = { ...form, priceLabel };

    if (formMode === 'add') {
      addApartment(finalForm);
      showSuccess('Apartment added successfully!');
    } else if (formMode === 'edit' && editingId !== null) {
      updateApartment(editingId, finalForm);
      showSuccess('Apartment updated successfully!');
    }
    closeForm();
  };

  const handleDelete = (id: number) => {
    deleteApartment(id);
    setDeleteConfirmId(null);
    showSuccess('Apartment deleted.');
  };

  const inputCls = "w-full border border-[#e5e7eb] rounded-[10px] p-[10px_14px] text-[14px] text-[#111827] bg-white outline-none focus:border-[#008751] focus:ring-2 focus:ring-[#008751]/10 transition-all font-sans";
  const labelCls = "block text-[12px] font-[700] text-[#374151] uppercase tracking-[0.5px] mb-[6px]";

  if (!isAuthenticated) {
    return (
      <div className="bg-[#f0f2f5] min-h-screen font-sans flex flex-col pb-[40px]">
        <Navbar scrolled={scrolled} onSignIn={onSignIn || (() => {})} onSignUp={onSignUp || (() => {})} />
        <div className="flex-1 flex items-center justify-center p-[20px] mt-[80px]">
          <div className="bg-white rounded-[24px] p-[40px] w-full max-w-[400px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="w-[64px] h-[64px] bg-[#008751]/10 text-[#008751] rounded-full flex items-center justify-center mx-auto mb-[24px]">
              <Home size={32} />
            </div>
            <h1 className="text-[24px] font-[800] text-[#111827] text-center mb-[8px]">Admin Access</h1>
            <p className="text-[#6b7280] text-[14px] text-center mb-[32px]">Please enter the admin password to continue.</p>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-[20px]">
              <div>
                <label className="block text-[12px] font-[700] text-[#374151] uppercase tracking-[0.5px] mb-[6px]">Password</label>
                <input 
                  type="password" 
                  className="w-full border border-[#e5e7eb] rounded-[10px] p-[12px_16px] text-[15px] text-[#111827] bg-white outline-none focus:border-[#008751] focus:ring-2 focus:ring-[#008751]/10 transition-all font-sans"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password (e.g. admin123)"
                  autoFocus
                />
                {loginError && <div className="text-[13px] text-[#ef4444] mt-[6px]">{loginError}</div>}
              </div>
              <button 
                type="submit"
                className="w-full bg-[#008751] text-white py-[14px] rounded-[12px] font-[700] text-[15px] hover:bg-[#005c37] transition-colors border-none cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f0f2f5] min-h-screen font-sans overflow-x-hidden flex flex-col pb-[40px]">
        <Navbar scrolled={scrolled} onSignIn={onSignIn || (() => {})} onSignUp={onSignUp || (() => {})} />

        <div className="max-w-[1126px] mx-auto w-full px-[16px] md:px-[24px] mt-[100px]">

          {/* Header */}
          <div className="flex items-center justify-between mb-[32px] flex-wrap gap-[16px]">
            <div>
              <h1 className="text-[28px] md:text-[36px] font-[800] text-[#111827] mb-[4px]">Admin Dashboard</h1>
              <p className="text-[14px] text-[#6b7280]">{apartments.length} apartments in your portfolio</p>
            </div>
            <div className="flex items-center gap-[12px]">
              <button
                onClick={openAdd}
                className="flex items-center gap-[8px] bg-[linear-gradient(135deg,#008751,#005c37)] text-white px-[20px] py-[12px] rounded-[12px] font-[700] text-[14px] border-none cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,135,81,0.3)] transition-all"
              >
                <Plus size={18} /> Add
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-[8px] bg-[#fef2f2] text-[#ef4444] px-[20px] py-[12px] rounded-[12px] font-[700] text-[14px] border-none cursor-pointer hover:bg-[#fee2e2] transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {successMsg && (
            <div className="flex items-center gap-[10px] bg-[#f0fdf4] border border-[#86efac] text-[#166534] px-[20px] py-[14px] rounded-[12px] mb-[24px] text-[14px] font-[600]">
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          {/* Form Panel */}
          {formMode && (
            <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[#f3f4f6] p-[24px] md:p-[40px] mb-[40px]">
              <div className="flex items-center justify-between mb-[32px]">
                <h2 className="text-[22px] font-[800] text-[#111827]">
                  {formMode === 'add' ? 'Add New Apartment' : 'Edit Apartment'}
                </h2>
                <button onClick={closeForm} className="w-[40px] h-[40px] rounded-full bg-[#f3f4f6] flex items-center justify-center border-none cursor-pointer hover:bg-[#e5e7eb] transition-colors">
                  <X size={18} className="text-[#374151]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Title *</label>
                  <input className={inputCls} placeholder="e.g. Luxury 3-Bedroom Flat" value={form.title} onChange={e => handleChange('title', e.target.value)} />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Full Address *</label>
                  <input className={inputCls} placeholder="e.g. Freedom Way, Lekki Phase 1, Lagos" value={form.address} onChange={e => handleChange('address', e.target.value)} />
                </div>

                {/* Location */}
                <div>
                  <label className={labelCls}>City / Location</label>
                  <select className={inputCls} value={form.location} onChange={e => handleChange('location', e.target.value)}>
                    {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className={labelCls}>Badge</label>
                  <select className={inputCls} value={form.badge} onChange={e => handleChange('badge', e.target.value)}>
                    {['Verified', 'New', 'Popular', 'Premium'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className={labelCls}>Price Per Night (₦) *</label>
                  <input type="number" className={inputCls} placeholder="e.g. 150000" value={form.pricePerNight || ''} onChange={e => handleChange('pricePerNight', Number(e.target.value))} />
                </div>

                {/* Sqft */}
                <div>
                  <label className={labelCls}>Size (sqft / m²)</label>
                  <input className={inputCls} placeholder="e.g. 1,400" value={form.sqft} onChange={e => handleChange('sqft', e.target.value)} />
                </div>

                {/* Beds */}
                <div>
                  <label className={labelCls}>Bedrooms</label>
                  <input type="number" min={1} max={10} className={inputCls} value={form.beds} onChange={e => handleChange('beds', Number(e.target.value))} />
                </div>

                {/* Baths */}
                <div>
                  <label className={labelCls}>Bathrooms</label>
                  <input type="number" min={1} max={10} className={inputCls} value={form.baths} onChange={e => handleChange('baths', Number(e.target.value))} />
                </div>

                {/* Rating */}
                <div>
                  <label className={labelCls}>Rating (0–5)</label>
                  <input type="number" min={0} max={5} step={0.1} className={inputCls} value={form.rating} onChange={e => handleChange('rating', Number(e.target.value))} />
                </div>

                {/* Popular */}
                <div className="flex items-center gap-[12px] pt-[24px]">
                  <input type="checkbox" id="popular" checked={form.popular} onChange={e => handleChange('popular', e.target.checked)} className="w-[18px] h-[18px] accent-[#008751] cursor-pointer" />
                  <label htmlFor="popular" className="text-[14px] font-[600] text-[#374151] cursor-pointer">Mark as Popular</label>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Description</label>
                  <textarea className={`${inputCls} min-h-[100px] resize-y`} placeholder="Describe the apartment..." value={form.description} onChange={e => handleChange('description', e.target.value)} />
                </div>

                {/* Images */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Images</label>
                  <div className="flex gap-[12px] mb-[12px] items-start">
                    <button 
                      onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
                      disabled={uploadingImage}
                      className="bg-[#f3f4f6] text-[#374151] px-[20px] py-[14px] rounded-[10px] border-[2px] border-dashed border-[#d1d5db] cursor-pointer font-[600] text-[13px] hover:bg-[#e5e7eb] hover:border-[#9ca3af] transition-all flex items-center gap-[8px]"
                    >
                      {uploadingImage ? (
                        <>Uploading...</>
                      ) : (
                        <><Upload size={16} /> Click to Upload Image</>
                      )}
                    </button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImageUpload} 
                    />
                  </div>
                  {form.images.length > 0 && (
                    <div className="flex gap-[10px] flex-wrap mt-[12px]">
                      {form.images.map((url, i) => (
                        <div key={i} className="relative group w-[100px] h-[80px] rounded-[8px] overflow-hidden border border-[#e5e7eb]">
                          <img src={url} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&q=40'; }} />
                          <button onClick={(e) => { e.preventDefault(); removeImage(i); }} className="absolute inset-0 bg-black/50 text-white border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[20px] font-[700]">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {form.images.length === 0 && (
                    <div className="flex items-center gap-[8px] text-[13px] text-[#9ca3af] mt-[12px]">
                      <Image size={16} /> No images uploaded yet
                    </div>
                  )}
                </div>

                {/* Video URL */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Video (optional)</label>
                  <div className="flex gap-[12px] items-start">
                    <button 
                      onClick={(e) => { e.preventDefault(); videoInputRef.current?.click(); }}
                      disabled={uploadingVideo}
                      className="bg-[#f3f4f6] text-[#374151] px-[20px] py-[14px] rounded-[10px] border-[2px] border-dashed border-[#d1d5db] cursor-pointer font-[600] text-[13px] hover:bg-[#e5e7eb] hover:border-[#9ca3af] transition-all flex items-center gap-[8px] w-auto h-fit"
                    >
                      {uploadingVideo ? (
                        <>Uploading...</>
                      ) : (
                        <><Upload size={16} /> Upload Video File</>
                      )}
                    </button>
                    <input 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      ref={videoInputRef}
                      onChange={handleVideoUpload} 
                    />
                    {form.videoUrl && (
                      <div className="relative group rounded-[8px] overflow-hidden border border-[#e5e7eb] w-[200px] h-[112px]">
                        <video src={form.videoUrl} className="w-full h-full object-cover" controls />
                        <button onClick={(e) => { e.preventDefault(); handleChange('videoUrl', ''); }} className="absolute top-[8px] right-[8px] bg-black/70 text-white border-none cursor-pointer w-[28px] h-[28px] rounded-full flex items-center justify-center text-[16px] font-[700] hover:bg-black transition-colors z-10" title="Remove video">×</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Amenities</label>
                  <div className="flex gap-[8px] mb-[12px]">
                    <input className={`${inputCls} flex-1`} placeholder="e.g. 24/7 Power" value={amenityInput} onChange={e => setAmenityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAmenity()} />
                    <button onClick={addAmenity} className="bg-[#111827] text-white px-[16px] rounded-[10px] border-none cursor-pointer font-[600] text-[13px] hover:bg-[#1f2937] transition-colors flex-shrink-0">Add</button>
                  </div>
                  <div className="flex gap-[8px] flex-wrap">
                    {form.amenities.map(a => (
                      <span key={a} className="flex items-center gap-[6px] bg-[#f0fdf4] border border-[#86efac] text-[#166534] px-[12px] py-[6px] rounded-[20px] text-[12px] font-[600]">
                        {a} <button onClick={() => removeAmenity(a)} className="bg-transparent border-none cursor-pointer text-[#166534] leading-none p-0 ml-[2px]">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className={labelCls}>Quick Tags</label>
                  <div className="flex gap-[8px] mb-[12px]">
                    <input className={`${inputCls} flex-1`} placeholder="e.g. Pool" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
                    <button onClick={addTag} className="bg-[#111827] text-white px-[16px] rounded-[10px] border-none cursor-pointer font-[600] text-[13px] hover:bg-[#1f2937] transition-colors flex-shrink-0">Add</button>
                  </div>
                  <div className="flex gap-[8px] flex-wrap">
                    {form.tags.map(t => (
                      <span key={t} className="flex items-center gap-[6px] bg-[#f3f4f6] text-[#374151] px-[10px] py-[5px] rounded-[16px] text-[12px] font-[600]">
                        {t} <button onClick={() => removeTag(t)} className="bg-transparent border-none cursor-pointer text-[#374151] leading-none p-0 ml-[2px]">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-[12px] mt-[32px] flex-wrap">
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-[8px] bg-[linear-gradient(135deg,#008751,#005c37)] text-white px-[28px] py-[13px] rounded-[12px] font-[700] text-[14px] border-none cursor-pointer hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(0,135,81,0.3)] transition-all"
                >
                  <Save size={16} /> {formMode === 'add' ? 'Save Apartment' : 'Update Apartment'}
                </button>
                <button onClick={closeForm} className="flex items-center gap-[8px] bg-[#f3f4f6] text-[#374151] px-[24px] py-[13px] rounded-[12px] font-[600] text-[14px] border-none cursor-pointer hover:bg-[#e5e7eb] transition-colors">
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* Apartments Table */}
          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#f3f4f6] overflow-hidden">
            <div className="p-[24px] border-b border-[#f3f4f6]">
              <h2 className="text-[18px] font-[800] text-[#111827]">All Apartments</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Property</th>
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Location</th>
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Price/Night</th>
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Beds / Baths</th>
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Badge</th>
                    <th className="text-left p-[14px_20px] text-[11px] font-[700] text-[#6b7280] uppercase tracking-[0.5px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apartments.map((apt, i) => (
                    <tr key={apt.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'} border-b border-[#f3f4f6] hover:bg-[#f0fdf4] transition-colors`}>
                      <td className="p-[16px_20px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[48px] h-[36px] rounded-[8px] overflow-hidden flex-shrink-0 bg-[#f3f4f6]">
                            {apt.images[0] ? (
                              <img src={apt.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#9ca3af]"><Home size={16} /></div>
                            )}
                          </div>
                          <div>
                            <div className="text-[14px] font-[700] text-[#111827] truncate max-w-[180px]">{apt.title}</div>
                            <div className="text-[12px] text-[#9ca3af]">ID: {apt.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-[16px_20px] text-[13px] text-[#4b5563]">{apt.address}</td>
                      <td className="p-[16px_20px] text-[14px] font-[700] text-[#111827]">{apt.priceLabel}</td>
                      <td className="p-[16px_20px] text-[13px] text-[#4b5563]">{apt.beds}B / {apt.baths}Ba</td>
                      <td className="p-[16px_20px]">
                        <span className={`px-[10px] py-[4px] rounded-[20px] text-[11px] font-[700] ${apt.badge === 'Premium' ? 'bg-[#ede9fe] text-[#6d28d9]' : apt.badge === 'Popular' ? 'bg-[#fef3c7] text-[#92400e]' : 'bg-[#f0fdf4] text-[#166534]'}`}>
                          {apt.badge}
                        </span>
                      </td>
                      <td className="p-[16px_20px]">
                        <div className="flex items-center gap-[8px]">
                          <button onClick={() => navigate(`/apartment/${apt.id}`)} className="w-[32px] h-[32px] rounded-[8px] bg-[#f3f4f6] flex items-center justify-center border-none cursor-pointer hover:bg-[#e5e7eb] transition-colors" title="View">
                            <Eye size={14} className="text-[#374151]" />
                          </button>
                          <button onClick={() => openEdit(apt)} className="w-[32px] h-[32px] rounded-[8px] bg-[#f0fdf4] flex items-center justify-center border-none cursor-pointer hover:bg-[#dcfce7] transition-colors" title="Edit">
                            <Pencil size={14} className="text-[#008751]" />
                          </button>
                          <button onClick={() => setDeleteConfirmId(apt.id)} className="w-[32px] h-[32px] rounded-[8px] bg-[#fef2f2] flex items-center justify-center border-none cursor-pointer hover:bg-[#fee2e2] transition-colors" title="Delete">
                            <Trash2 size={14} className="text-[#ef4444]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#f3f4f6]">
              {apartments.map(apt => (
                <div key={apt.id} className="p-[16px]">
                  <div className="flex gap-[12px] mb-[12px]">
                    <div className="w-[60px] h-[48px] rounded-[8px] overflow-hidden flex-shrink-0 bg-[#f3f4f6]">
                      {apt.images[0] ? (
                        <img src={apt.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9ca3af]"><Home size={18} /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-[700] text-[#111827] truncate">{apt.title}</div>
                      <div className="text-[12px] text-[#6b7280] truncate">{apt.address}</div>
                      <div className="flex items-center gap-[8px] mt-[4px]">
                        <span className="text-[13px] font-[700] text-[#111827]">{apt.priceLabel}</span>
                        <span className={`px-[8px] py-[2px] rounded-[20px] text-[10px] font-[700] ${apt.badge === 'Premium' ? 'bg-[#ede9fe] text-[#6d28d9]' : 'bg-[#f0fdf4] text-[#166534]'}`}>{apt.badge}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <button onClick={() => navigate(`/apartment/${apt.id}`)} className="flex-1 py-[8px] bg-[#f3f4f6] rounded-[8px] border-none cursor-pointer text-[12px] font-[600] text-[#374151] flex items-center justify-center gap-[4px]"><Eye size={13} /> View</button>
                    <button onClick={() => openEdit(apt)} className="flex-1 py-[8px] bg-[#f0fdf4] rounded-[8px] border-none cursor-pointer text-[12px] font-[600] text-[#008751] flex items-center justify-center gap-[4px]"><Pencil size={13} /> Edit</button>
                    <button onClick={() => setDeleteConfirmId(apt.id)} className="flex-1 py-[8px] bg-[#fef2f2] rounded-[8px] border-none cursor-pointer text-[12px] font-[600] text-[#ef4444] flex items-center justify-center gap-[4px]"><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {apartments.length === 0 && (
              <div className="text-center py-[60px]">
                <Home size={48} className="mx-auto mb-[16px] text-[#d1d5db]" />
                <p className="text-[#6b7280] font-[500]">No apartments yet. Click "Add Apartment" to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirm Modal */}
        {deleteConfirmId !== null && (
          <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-[16px]">
            <div className="bg-white rounded-[20px] p-[32px] max-w-[400px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="w-[56px] h-[56px] rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-[20px]">
                <Trash2 size={24} className="text-[#ef4444]" />
              </div>
              <h3 className="text-[20px] font-[800] text-[#111827] text-center mb-[8px]">Delete Apartment?</h3>
              <p className="text-[14px] text-[#6b7280] text-center mb-[28px]">This action cannot be undone. The apartment will be permanently removed from all listings.</p>
              <div className="flex gap-[12px]">
                <button onClick={() => setDeleteConfirmId(null)} className="flex-1 py-[12px] bg-[#f3f4f6] text-[#374151] rounded-[10px] border-none cursor-pointer font-[600] text-[14px] hover:bg-[#e5e7eb] transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirmId)} className="flex-1 py-[12px] bg-[#ef4444] text-white rounded-[10px] border-none cursor-pointer font-[700] text-[14px] hover:bg-[#dc2626] transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
