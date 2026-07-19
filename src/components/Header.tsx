/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, BarChart3, User, Menu, X, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Product, Gender } from '../types';
import { PRODUCTS } from '../data/products';
import MbaLogo from './MbaLogo';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedGender: (gender: Gender | null) => void;
  setSelectedCategory: (category: string | null) => void;
}

const ANNOUNCEMENTS = [
  '✨ Festive Sale: Extra 15% off using code FESTIVE15 at checkout! ✨',
  '🚚 Free Express Shipping across India on all orders over ₹999!',
  '⚡ Easy 14-day hassle-free returns and exchanges.'
];

const POPULAR_SEARCHES = ['Saree', 'Kurta', 'Nehru Jacket', 'Linen Shirt', 'Oversized T-Shirt', 'Handbags', 'Frocks'];

export default function Header({
  currentView,
  setView,
  setSelectedProduct,
  cartCount,
  wishlistCount,
  compareCount,
  searchQuery,
  setSearchQuery,
  setSelectedGender,
  setSelectedCategory,
}: HeaderProps) {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Rotate announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('ashen_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside search autocomplete
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform instant autocompletion
  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Add to recent searches
      const updated = [searchQuery.trim(), ...recentSearches.filter(s => s !== searchQuery.trim())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('ashen_recent_searches', JSON.stringify(updated));
      
      setIsSearchFocused(false);
      setSelectedGender(null);
      setSelectedCategory(null);
      setView('shop');
    }
  };

  const selectPopularSearch = (term: string) => {
    setSearchQuery(term);
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('ashen_recent_searches', JSON.stringify(updated));
    
    setIsSearchFocused(false);
    setSelectedGender(null);
    setSelectedCategory(null);
    setView('shop');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('ashen_recent_searches');
  };

  const handleGenderClick = (gender: Gender) => {
    setSelectedGender(gender);
    setSelectedCategory(null);
    setSearchQuery('');
    setView('shop');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedGender(null);
    setSelectedCategory(null);
    setView('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
      {/* 1. Announcement Bar */}
      <div className="bg-zinc-950 text-white text-xs py-2 px-4 text-center font-medium select-none overflow-hidden h-8 flex items-center justify-center transition-all duration-500">
        <p className="animate-fade-in text-center text-[11px] md:text-xs tracking-wide">
          {ANNOUNCEMENTS[announcementIdx]}
        </p>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -ml-2 text-zinc-700 hover:text-zinc-900 rounded-lg hover:bg-zinc-50"
          id="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <MbaLogo size="sm" />
          <h1 className="text-lg md:text-xl font-black tracking-widest text-zinc-900 select-none uppercase">
            MBA <span className="text-amber-600 font-medium">KAPDEWALA</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold text-sm text-zinc-600 tracking-wide uppercase">
          <button
            onClick={() => handleGenderClick('Men')}
            className={`hover:text-amber-600 transition-colors pb-1 border-b-2 ${
              currentView === 'shop' && searchQuery === '' ? 'border-transparent' : 'border-transparent'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleGenderClick('Women')}
            className="hover:text-amber-600 transition-colors pb-1 border-b-2 border-transparent"
          >
            Women
          </button>
          <button
            onClick={() => handleGenderClick('Kids')}
            className="hover:text-amber-600 transition-colors pb-1 border-b-2 border-transparent"
          >
            Kids
          </button>
          <button
            onClick={() => handleGenderClick('Accessories')}
            className="hover:text-amber-600 transition-colors pb-1 border-b-2 border-transparent"
          >
            Accessories
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGender(null);
              setSelectedCategory(null);
              setView('shop');
            }}
            className="text-amber-700 hover:text-amber-900 font-bold transition-colors pb-1 border-b-2 border-transparent"
          >
            Explore All
          </button>
        </nav>

        {/* Search Bar - Desktop & Tablet */}
        <div ref={searchRef} className="hidden sm:block relative flex-grow max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products, Indian traditional, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-5 pr-11 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-250"
              id="desktop-search-input"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Search Autocomplete Panel */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-zinc-100 shadow-2xl overflow-hidden z-50">
              {searchQuery.trim() === '' ? (
                <div className="p-5 select-none">
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Recent Searches</span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-amber-600 hover:text-amber-800 font-semibold"
                        >
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectPopularSearch(term)}
                            className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs px-3 py-1.5 rounded-full border border-zinc-150 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Popular Searches</span>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectPopularSearch(term)}
                          className="bg-amber-50/50 hover:bg-amber-50 text-amber-800 text-xs px-3 py-1.5 rounded-full border border-amber-100 font-medium transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block px-3 pb-2 border-b border-zinc-50">
                    Product Suggestions ({filteredSuggestions.length} found)
                  </span>
                  {filteredSuggestions.length > 0 ? (
                    <div className="divide-y divide-zinc-50 mt-1">
                      {filteredSuggestions.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            setView('product-detail');
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2.5 hover:bg-zinc-50 rounded-xl cursor-pointer transition-colors"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-12 object-cover rounded-md bg-zinc-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow min-w-0">
                            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wide block leading-none">
                              {product.brand}
                            </span>
                            <h4 className="text-sm font-semibold text-zinc-800 truncate mt-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs font-bold text-zinc-900">₹{product.price}</span>
                              <span className="text-[10px] text-zinc-400 line-through">₹{product.mrp}</span>
                              <span className="text-[10px] text-emerald-600 font-bold">{product.discount}% OFF</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-300" />
                        </div>
                      ))}
                      <div
                        onClick={handleSearchSubmit}
                        className="p-3 text-center text-xs font-bold text-amber-600 hover:text-amber-800 cursor-pointer block mt-1"
                      >
                        View all matching items
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-zinc-500">
                      No matching products found. Press Enter to search all.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setView('compare')}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 rounded-full hover:bg-zinc-50 relative transition-colors"
            title="Compare Products"
            id="compare-header-btn"
          >
            <BarChart3 className="w-[22px] h-[22px]" />
            {compareCount > 0 && (
              <span className="absolute top-1 right-1 bg-zinc-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setView('wishlist')}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 rounded-full hover:bg-zinc-50 relative transition-colors"
            title="Wishlist"
            id="wishlist-header-btn"
          >
            <Heart className="w-[22px] h-[22px]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setView('cart')}
            className="p-2.5 text-zinc-600 hover:text-zinc-900 rounded-full hover:bg-zinc-50 relative transition-colors"
            title="Shopping Cart"
            id="cart-header-btn"
          >
            <ShoppingBag className="w-[22px] h-[22px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setView('support')}
            className="hidden md:flex p-2.5 text-zinc-600 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-colors"
            title="Customer Support"
            id="user-header-btn"
          >
            <User className="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Side Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-menu-drawer">
          {/* Overlay */}
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          {/* Drawer Body */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 z-10 transition-transform duration-300 transform translate-x-0">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <MbaLogo size="sm" />
                <span className="font-black tracking-widest text-zinc-900 text-base uppercase">
                  MBA <span className="text-amber-600 font-medium">KAPDEWALA</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Category Links */}
            <div className="flex flex-col gap-5 text-base font-bold text-zinc-800 uppercase tracking-wider">
              <button
                onClick={() => handleGenderClick('Men')}
                className="text-left py-2 border-b border-zinc-100 flex justify-between items-center"
              >
                <span>Men Collection</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleGenderClick('Women')}
                className="text-left py-2 border-b border-zinc-100 flex justify-between items-center"
              >
                <span>Women Collection</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleGenderClick('Kids')}
                className="text-left py-2 border-b border-zinc-100 flex justify-between items-center"
              >
                <span>Kids Collection</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => handleGenderClick('Accessories')}
                className="text-left py-2 border-b border-zinc-100 flex justify-between items-center"
              >
                <span>Accessories</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGender(null);
                  setSelectedCategory(null);
                  setView('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-zinc-100 text-amber-700 flex justify-between items-center font-black"
              >
                <span>Shop All Categories</span>
                <ArrowRight className="w-4 h-4 text-amber-700" />
              </button>
            </div>

            {/* Quick trust assurances in drawer */}
            <div className="mt-auto pt-6 border-t border-zinc-100 text-xs text-zinc-500 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Indian Fashion</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span>Easy Return & Refunds Policy</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
