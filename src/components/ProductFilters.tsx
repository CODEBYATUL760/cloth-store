/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { ProductFilters as FilterType, Gender, SortOption } from '../types';

interface ProductFiltersProps {
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  allCategories: string[];
  allBrands: string[];
  allMaterials: string[];
  allPatterns: string[];
  allFits: string[];
  allOccasions: string[];
  onResetFilters: () => void;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
}

export default function ProductFilters({
  filters,
  setFilters,
  sort,
  setSort,
  allCategories,
  allBrands,
  allMaterials,
  allPatterns,
  allFits,
  allOccasions,
  onResetFilters,
  isMobileFilterOpen,
  setIsMobileFilterOpen
}: ProductFiltersProps) {
  // Accordion toggle states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gender: true,
    category: true,
    brand: true,
    price: true,
    size: true,
    color: true,
    material: false,
    pattern: false,
    fit: false,
    occasion: false,
    rating: false,
    discount: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleGenderToggle = (gender: Gender) => {
    setFilters(prev => {
      const exists = prev.gender.includes(gender);
      return {
        ...prev,
        gender: exists ? prev.gender.filter(g => g !== gender) : [...prev.gender, gender]
      };
    });
  };

  const handleMultiToggle = (field: keyof FilterType, value: any) => {
    setFilters(prev => {
      const list = prev[field] as any[];
      const exists = list.includes(value);
      return {
        ...prev,
        [field]: exists ? list.filter(v => v !== value) : [...list, value]
      };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const val = parseInt(e.target.value) || 0;
    setFilters(prev => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = val;
      return { ...prev, priceRange: newRange };
    });
  };

  const GENDERS: Gender[] = ['Men', 'Women', 'Kids', 'Accessories'];
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const COLORS = [
    { name: 'Pitch Black', hex: '#0F0F11' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Navy Blue', hex: '#1D2A44' },
    { name: 'Slate Grey', hex: '#5A626A' },
    { name: 'Olive Green', hex: '#4B5320' },
    { name: 'Crimson Red', hex: '#990000' },
    { name: 'Deep Maroon', hex: '#500A15' },
    { name: 'Beige', hex: '#E1D9C1' },
    { name: 'Cream Off-White', hex: '#FFFDD0' },
    { name: 'Camel Brown', hex: '#C19A6B' },
    { name: 'Mustard Yellow', hex: '#E1AD01' },
    { name: 'Dusty Pink', hex: '#DCAE96' },
    { name: 'Royal Purple', hex: '#4B0082' },
  ];

  const renderFilterBody = () => (
    <div className="space-y-6">
      {/* Reset Filters */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <span className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
          Filter & Refine
        </span>
        <button
          onClick={onResetFilters}
          className="text-xs text-amber-700 hover:text-amber-900 font-bold uppercase tracking-wider"
          id="reset-filters-btn"
        >
          Clear All
        </button>
      </div>

      {/* Sorting Selection (Mobile Only in body, desktop handles in header) */}
      <div className="block lg:hidden border-b border-zinc-100 pb-5">
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2.5">Sort Products</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 bg-zinc-50"
          id="mobile-sort-select"
        >
          <option value="popularity">Popularity</option>
          <option value="newest">New Arrivals</option>
          <option value="best-selling">Best Sellers</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* 1. Gender Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('gender')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Gender</span>
          {openSections.gender ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.gender && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {GENDERS.map((g) => {
              const active = filters.gender.includes(g);
              return (
                <button
                  key={g}
                  onClick={() => handleGenderToggle(g)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-colors ${
                    active
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-sm'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Category Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Category</span>
          {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.category && (
          <div className="mt-3.5 max-h-48 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
            {allCategories.map((cat) => {
              const active = filters.category.includes(cat);
              return (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleMultiToggle('category', cat)}
                    className="w-4 h-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Brand Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Brand</span>
          {openSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.brand && (
          <div className="mt-3.5 max-h-48 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
            {allBrands.map((brand) => {
              const active = filters.brand.includes(brand);
              return (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleMultiToggle('brand', brand)}
                    className="w-4 h-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Price Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Price Range (₹)</span>
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-2.5">
              <div className="flex-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Min Price</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800"
                  min="0"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">Max Price</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-zinc-800"
                  min="0"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="15000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
              }}
              className="w-full accent-amber-600 h-1 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 5. Size Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Size</span>
          {openSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.size && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {SIZES.map((sz) => {
              const active = filters.size.includes(sz);
              return (
                <button
                  key={sz}
                  onClick={() => handleMultiToggle('size', sz)}
                  className={`text-xs font-black w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                    active
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-sm'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Color Swatches Accordion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Color Palette</span>
          {openSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.color && (
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            {COLORS.map((col) => {
              const active = filters.color.includes(col.name);
              return (
                <button
                  key={col.name}
                  onClick={() => handleMultiToggle('color', col.name)}
                  className={`w-6 h-6 rounded-full border shadow-2xs transition-all relative ${
                    active ? 'scale-125 ring-2 ring-zinc-800 ring-offset-2' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                >
                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-500 font-bold select-none mix-blend-difference">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Advanced filters */}
      {/* 7. Fabric Material */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('material')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Fabric Material</span>
          {openSections.material ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.material && (
          <div className="mt-3 max-h-36 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
            {allMaterials.map((mat) => {
              const active = filters.material.includes(mat);
              return (
                <label key={mat} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleMultiToggle('material', mat)}
                    className="w-4 h-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>{mat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. Pattern Design */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('pattern')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Pattern Design</span>
          {openSections.pattern ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.pattern && (
          <div className="mt-3 max-h-36 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
            {allPatterns.map((pat) => {
              const active = filters.pattern.includes(pat);
              return (
                <label key={pat} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleMultiToggle('pattern', pat)}
                    className="w-4 h-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>{pat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 9. Occasion */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Occasion</span>
          {openSections.occasion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.occasion && (
          <div className="mt-3 max-h-36 overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
            {allOccasions.map((occ) => {
              const active = filters.occasion.includes(occ);
              return (
                <label key={occ} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleMultiToggle('occasion', occ)}
                    className="w-4 h-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                  />
                  <span>{occ}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 10. Discount Percentage Filter */}
      <div className="border-b border-zinc-100 pb-5">
        <button
          onClick={() => toggleSection('discount')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Minimum Discount</span>
          {openSections.discount ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.discount && (
          <div className="mt-4 space-y-2.5">
            {[10, 30, 50, 70].map((disc) => (
              <label key={disc} className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-700">
                <input
                  type="radio"
                  name="discount-filter"
                  checked={filters.discount === disc}
                  onChange={() => setFilters(prev => ({ ...prev, discount: disc }))}
                  className="w-4 h-4 border-zinc-300 text-amber-600 focus:ring-amber-500/20"
                />
                <span>{disc}% OFF or more</span>
              </label>
            ))}
            <button
              onClick={() => setFilters(prev => ({ ...prev, discount: 0 }))}
              className="text-[10px] text-zinc-400 hover:text-zinc-700 font-bold uppercase mt-1 block"
            >
              Reset Discount Filter
            </button>
          </div>
        )}
      </div>

      {/* 11. Minimum Rating */}
      <div className="pb-5">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-xs font-black text-zinc-800 uppercase tracking-widest py-1"
        >
          <span>Minimum Rating</span>
          {openSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.rating && (
          <div className="mt-3.5 space-y-2">
            {[4.5, 4.0, 3.5].map((rat) => (
              <button
                key={rat}
                onClick={() => setFilters(prev => ({ ...prev, rating: rat }))}
                className={`w-full flex items-center gap-1.5 p-2 rounded-xl border text-xs font-bold text-left transition-colors ${
                  filters.rating === rat
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span>{rat} ★ & above</span>
              </button>
            ))}
            <button
              onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
              className="text-[10px] text-zinc-400 hover:text-zinc-700 font-bold uppercase mt-1 block"
            >
              Reset Rating Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Desktop Filter (Persistent in layout) */}
      <div className="hidden lg:block w-64 bg-white border border-zinc-150 rounded-3xl p-5 shadow-xs sticky top-28 self-start">
        {renderFilterBody()}
      </div>

      {/* Mobile Sticky Floating Filter Trigger */}
      <div className="fixed bottom-20 left-4 z-30 sm:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-zinc-950 text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest py-3 px-5 rounded-full shadow-2xl shadow-zinc-900/30 border border-zinc-800"
          id="sticky-mobile-filter-btn"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          Filters
        </button>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex" id="mobile-filter-drawer">
          <div onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 z-10 overflow-y-auto animate-fade-in-right">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100">
              <span className="font-black text-zinc-900 text-sm uppercase tracking-widest">Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-zinc-500 hover:text-zinc-900 bg-zinc-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderFilterBody()}

            <div className="mt-8 pt-4 border-t border-zinc-100 flex gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl text-center shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
