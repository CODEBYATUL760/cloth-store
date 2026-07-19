/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, RefreshCw, Grid, List, AlertCircle, X } from 'lucide-react';
import { Product, ProductFilters as FilterType, SortOption, Gender } from '../types';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  selectedGender: Gender | null;
  setSelectedGender: (gender: Gender | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onToggleCompare: (product: Product) => void;
  compareList: Product[];
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
}

const INITIAL_FILTERS: FilterType = {
  gender: [],
  category: [],
  brand: [],
  priceRange: [0, 15000],
  size: [],
  color: [],
  material: [],
  pattern: [],
  sleeve: [],
  fit: [],
  occasion: [],
  rating: 0,
  discount: 0,
  availability: []
};

export default function ShopView({
  products,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  setView,
  setSelectedProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onToggleCompare,
  compareList,
  addToast
}: ShopViewProps) {
  // Filters state
  const [filters, setFilters] = useState<FilterType>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortOption>('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  // Sync state selectors from global Header triggers
  useEffect(() => {
    setFilters(prev => {
      const gList = selectedGender ? [selectedGender] : [];
      const cList = selectedCategory ? [selectedCategory] : [];
      return {
        ...prev,
        gender: gList,
        category: cList
      };
    });
    setCurrentPage(1);
  }, [selectedGender, selectedCategory]);

  // Sync scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Aggregate metadata values dynamically from catalog database for robust filters
  const allCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))).sort(), [products]);
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products]);
  const allMaterials = useMemo(() => Array.from(new Set(products.map(p => p.material))).sort(), [products]);
  const allPatterns = useMemo(() => Array.from(new Set(products.map(p => p.pattern))).sort(), [products]);
  const allFits = useMemo(() => Array.from(new Set(products.filter(p => p.fit).map(p => p.fit!))).sort(), [products]);
  const allOccasions = useMemo(() => Array.from(new Set(products.map(p => p.occasion))).sort(), [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchFabric = p.fabric.toLowerCase().includes(query);
        const matchPattern = p.pattern.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory && !matchFabric && !matchPattern) {
          return false;
        }
      }

      // 2. Gender
      if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) return false;

      // 3. Category
      if (filters.category.length > 0 && !filters.category.includes(p.category)) return false;

      // 4. Brand
      if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;

      // 5. Price Range
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;

      // 6. Sizes
      if (filters.size.length > 0) {
        const hasSize = p.sizes.some(s => filters.size.includes(s.size) && s.stock > 0);
        if (!hasSize) return false;
      }

      // 7. Colors
      if (filters.color.length > 0) {
        const hasColor = p.colors.some(c => filters.color.includes(c.name));
        if (!hasColor) return false;
      }

      // 8. Material
      if (filters.material.length > 0 && !filters.material.includes(p.material)) return false;

      // 9. Pattern
      if (filters.pattern.length > 0 && !filters.pattern.includes(p.pattern)) return false;

      // 10. Fit
      if (filters.fit.length > 0 && (!p.fit || !filters.fit.includes(p.fit))) return false;

      // 11. Occasion
      if (filters.occasion.length > 0 && !filters.occasion.includes(p.occasion)) return false;

      // 12. Rating
      if (filters.rating > 0 && p.rating < filters.rating) return false;

      // 13. Discount
      if (filters.discount > 0 && p.discount < filters.discount) return false;

      return true;
    }).sort((a, b) => {
      // Sorting Options
      switch (sort) {
        case 'newest':
          return b.tags.includes('New Arrival') ? 1 : a.tags.includes('New Arrival') ? -1 : 0;
        case 'best-selling':
          return b.tags.includes('Best Seller') ? 1 : a.tags.includes('Best Seller') ? -1 : 0;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [products, filters, sort, searchQuery]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSort('popularity');
    setSelectedGender(null);
    setSelectedCategory(null);
    setSearchQuery('');
    setCurrentPage(1);
    addToast('Filters Cleared', 'Catalog is showing all products.', 'info');
  };

  // Check if active filters exist to display quick-clear tag lines
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.gender.length > 0) count += filters.gender.length;
    if (filters.category.length > 0) count += filters.category.length;
    if (filters.brand.length > 0) count += filters.brand.length;
    if (filters.size.length > 0) count += filters.size.length;
    if (filters.color.length > 0) count += filters.color.length;
    if (filters.material.length > 0) count += filters.material.length;
    if (filters.pattern.length > 0) count += filters.pattern.length;
    if (filters.fit.length > 0) count += filters.fit.length;
    if (filters.occasion.length > 0) count += filters.occasion.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 15000) count++;
    if (filters.rating > 0) count++;
    if (filters.discount > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [filters, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="master-shop-view">
      
      {/* Title / Info Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-zinc-950 uppercase tracking-widest leading-none">
            {selectedGender ? `${selectedGender}'s Wardrobe` : selectedCategory ? `${selectedCategory}` : 'The Complete Fashion Catalog'}
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-bold uppercase tracking-wider">
            Showing <strong className="text-zinc-800">{filteredProducts.length}</strong> matching premium items
          </p>
        </div>

        {/* Desktop Sorting Select Row */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort By
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-zinc-200 hover:border-zinc-400 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 bg-white shadow-2xs focus:outline-none transition-colors"
            id="desktop-sort-select"
          >
            <option value="popularity">Popularity (Most Reviewed)</option>
            <option value="newest">New Arrivals Drop</option>
            <option value="best-selling">Top Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Star Ratings</option>
          </select>
        </div>
      </div>

      {/* Active filters summary badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 bg-zinc-50 border border-zinc-150 p-4.5 rounded-2xl animate-fade-in-up">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Refinements:</span>
          
          {searchQuery && (
            <span className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              Search: "{searchQuery}"
              <X onClick={() => setSearchQuery('')} className="w-3 h-3 text-zinc-400 hover:text-rose-600 cursor-pointer" />
            </span>
          )}

          {filters.gender.map(g => (
            <span key={g} className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              {g}
              <X
                onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender.filter(item => item !== g) }))}
                className="w-3 h-3 text-zinc-400 hover:text-rose-600 cursor-pointer"
              />
            </span>
          ))}

          {filters.category.map(c => (
            <span key={c} className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              {c}
              <X
                onClick={() => setFilters(prev => ({ ...prev, category: prev.category.filter(item => item !== c) }))}
                className="w-3 h-3 text-zinc-400 hover:text-rose-600 cursor-pointer"
              />
            </span>
          ))}

          {filters.brand.map(b => (
            <span key={b} className="bg-white border border-zinc-200 text-zinc-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              {b}
              <X
                onClick={() => setFilters(prev => ({ ...prev, brand: prev.brand.filter(item => item !== b) }))}
                className="w-3 h-3 text-zinc-400 hover:text-rose-600 cursor-pointer"
              />
            </span>
          ))}

          <button
            onClick={handleResetFilters}
            className="text-[10px] font-black text-amber-700 hover:text-amber-900 uppercase tracking-widest pl-2"
          >
            Clear All Tags
          </button>
        </div>
      )}

      {/* Main filters sidebar and grid layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* 1. Sidebar filter (Lg: fixed width) */}
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
          allCategories={allCategories}
          allBrands={allBrands}
          allMaterials={allMaterials}
          allPatterns={allPatterns}
          allFits={allFits}
          allOccasions={allOccasions}
          onResetFilters={handleResetFilters}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
        />

        {/* 2. Grid contents list */}
        <div className="flex-grow w-full space-y-8">
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 border border-zinc-150 rounded-3xl p-8 max-w-lg mx-auto flex flex-col items-center shadow-2xs">
              <AlertCircle className="w-10 h-10 text-amber-600 mb-4" />
              <h3 className="text-sm font-bold text-zinc-800">No clothes match your active filter tags</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed font-semibold">
                Try loosening your budget range, checking different color boxes, or clearing the search keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-full transition-all shadow-md"
              >
                Show All 850+ Products
              </button>
            </div>
          ) : (
            <>
              {/* Product cards grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    setView={setView}
                    setSelectedProduct={setSelectedProduct}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isInWishlist={wishlist.some(p => p.id === product.id)}
                    onToggleCompare={onToggleCompare}
                    isInCompare={compareList.some(p => p.id === product.id)}
                    addToast={addToast}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8 border-t border-zinc-100 select-none">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pg = idx + 1;
                      const isCurrent = currentPage === pg;
                      // Display a subset of pages if pagination count is massive to look highly neat
                      if (totalPages > 6 && Math.abs(currentPage - pg) > 2 && pg !== 1 && pg !== totalPages) {
                        if (pg === 2 || pg === totalPages - 1) {
                          return <span key={pg} className="px-1 text-zinc-300 font-bold">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pg}
                          onClick={() => setCurrentPage(pg)}
                          className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center text-xs font-black transition-all ${
                            isCurrent
                              ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
                          }`}
                        >
                          {pg}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
