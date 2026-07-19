/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Flame, Clock, Award, Compass, HelpCircle } from 'lucide-react';
import { Product, Gender } from '../types';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';

interface HomeViewProps {
  products: Product[];
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onToggleCompare: (product: Product) => void;
  compareList: Product[];
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
  setSelectedGender: (gender: Gender | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
}

const BRAND_LOGOS = [
  { name: 'Biba', tag: 'Women' },
  { name: 'Louis Philippe', tag: 'Men' },
  { name: 'Allen Solly', tag: 'Men' },
  { name: 'Vero Moda', tag: 'Women' },
  { name: "Levi's", tag: 'Men' },
  { name: 'Jack & Jones', tag: 'Men' },
  { name: 'Roadster', tag: 'Men' },
  { name: 'Aurelia', tag: 'Women' }
];

const CATEGORIES_PROMOS = [
  {
    name: 'Sarees',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&h=500&q=80',
    count: 'Festive Drapery'
  },
  {
    name: 'Kurtas & Ethnic',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&h=500&q=80',
    count: 'Royal Weaves'
  },
  {
    name: 'Kurtis & Sets',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&h=500&q=80',
    count: 'Modern Traditional'
  },
  {
    name: 'Dresses',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&h=500&q=80',
    count: 'Fluid Westerns'
  }
];

export default function HomeView({
  products,
  setView,
  setSelectedProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onToggleCompare,
  compareList,
  addToast,
  setSelectedGender,
  setSelectedCategory,
  setSearchQuery
}: HomeViewProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });
  const [homeActiveCollection, setHomeActiveCollection] = useState<'ethnic' | 'summer' | 'office' | 'winter'>('ethnic');

  // Promotional countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBrandClick = (brandName: string, gender: string) => {
    setSearchQuery('');
    setSelectedGender(gender as Gender);
    setSelectedCategory(null);
    setView('shop');
    // Set brand filter directly on next frame
    setTimeout(() => {
      const activeBtn = document.querySelector(`input[type="checkbox"][value="${brandName}"]`) as HTMLInputElement;
      if (activeBtn) {
        activeBtn.click();
      }
    }, 100);
  };

  const handleCategoryClick = (catName: string, gender: string) => {
    // Sizing up Kurtis or Kurtas
    let resolvedCatName = catName;
    if (catName === 'Kurtis & Sets') resolvedCatName = 'Kurta Sets';
    else if (catName === 'Kurtas & Ethnic') resolvedCatName = 'Kurta';

    setSearchQuery(resolvedCatName);
    setSelectedGender(gender as Gender);
    setSelectedCategory(resolvedCatName);
    setView('shop');
  };

  // Curate home catalog items
  const trendingItems = products.filter(p => p.tags.includes('Trending')).slice(0, 8);
  const bestSellers = products.filter(p => p.tags.includes('Best Seller')).slice(0, 8);
  const newArrivals = products.filter(p => p.tags.includes('New Arrival')).slice(0, 8);

  const seasonalEthnic = products.filter(p => p.tags.includes('Ethnic Collection')).slice(0, 4);
  const seasonalSummer = products.filter(p => p.tags.includes('Summer Collection')).slice(0, 4);
  const seasonalOffice = products.filter(p => p.tags.includes('Office Collection')).slice(0, 4);
  const seasonalWinter = products.filter(p => p.tags.includes('Winter Collection')).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Campaign Slider */}
      <HeroSlider setView={setView} setSelectedGender={setSelectedGender} setSearchQuery={setSearchQuery} />

      {/* 2. Brand Showcases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-black tracking-[0.2em] text-amber-600 uppercase block mb-1">
            ORIGINAL LABELS
          </span>
          <h2 className="text-2xl font-black text-zinc-900 tracking-wide uppercase">Shop by Premium Brand</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRAND_LOGOS.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleBrandClick(brand.name, brand.tag)}
              className="bg-zinc-50 hover:bg-white border border-zinc-150 hover:border-amber-500/40 rounded-2xl py-6 px-4 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-zinc-200/20 flex flex-col justify-center items-center"
            >
              <span className="font-serif font-black tracking-widest text-zinc-800 text-sm md:text-base leading-none">
                {brand.name.toUpperCase()}
              </span>
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-2 block">
                {brand.tag} Collections
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shop by Category (Large Miniatures Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black tracking-[0.2em] text-amber-600 uppercase block mb-1">
              CURATED CLOSETS
            </span>
            <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-wide">Explore Signature Categories</h2>
          </div>
          <button
            onClick={() => {
              setSelectedGender(null);
              setSelectedCategory(null);
              setSearchQuery('');
              setView('shop');
            }}
            className="text-sm text-zinc-800 hover:text-amber-700 font-bold tracking-wide uppercase flex items-center gap-2 mt-4 sm:mt-0 group"
          >
            Explore Complete Range
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_PROMOS.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.name, cat.gender)}
              className="group relative aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-350"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/10 to-transparent z-10 transition-opacity duration-300 group-hover:from-zinc-950/90" />
              
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Tag information */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <span className="text-[10px] bg-amber-600 text-white font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2.5 inline-block">
                  {cat.gender}
                </span>
                <h3 className="text-lg font-bold tracking-wide mb-1 leading-none">{cat.name}</h3>
                <p className="text-xs text-zinc-300 font-medium">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="flex items-center gap-1.5 text-xs font-black tracking-[0.2em] text-amber-600 uppercase mb-1">
            <Flame className="w-4 h-4 text-amber-600" />
            ON THE RADAR
          </span>
          <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-wide">Trending Outfits Right Now</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingItems.map((product) => (
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
      </section>

      {/* 5. Urgency Campaign Banner with countdown timer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute inset-0 bg-radial-at-t from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          <div className="z-10 text-center lg:text-left text-white max-w-xl">
            <span className="flex items-center gap-2 justify-center lg:justify-start text-xs font-black tracking-[0.2em] text-amber-500 uppercase mb-4">
              <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
              LIMITED TIME FLASH DEAL
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-4 font-serif">
              Midnight Madness Sale: Flat 50% Off!
            </h3>
            <p className="text-sm text-zinc-300 font-medium leading-relaxed">
              Unlock maximum savings on signature handloom Sarees, formal blazers, and luxury cotton t-shirts. Offer applies automatically at checkout page.
            </p>

            {/* Countdown timers */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mt-6 select-none font-mono">
              <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="block text-2xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Hours</span>
              </div>
              <span className="text-xl font-bold">:</span>
              <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="block text-2xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Mins</span>
              </div>
              <span className="text-xl font-bold">:</span>
              <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <span className="block text-2xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>

          <div className="z-10 flex-shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedGender(null);
                setSelectedCategory(null);
                setSearchQuery('');
                setView('shop');
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 text-center shadow-lg shadow-amber-600/20 transform hover:-translate-y-0.5"
            >
              Shop Midnight Deals
            </button>
            <button
              onClick={() => setView('faq')}
              className="border border-white/30 hover:border-white text-zinc-300 hover:text-white font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-full transition-all text-center"
            >
              View Terms & Conditions
            </button>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="flex items-center gap-1.5 text-xs font-black tracking-[0.2em] text-amber-600 uppercase mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            FRESH FROM SEWING
          </span>
          <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-wide">The New Arrival Drop</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
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
      </section>

      {/* Seasonal & Curated Drops switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-zinc-50/50 py-12 rounded-[40px] border border-zinc-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-4">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-black tracking-[0.2em] text-amber-600 uppercase mb-1">
              <Compass className="w-4 h-4 text-amber-600" />
              SEASONAL EDIT
            </span>
            <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-wide">Signature Curations</h2>
          </div>
          
          {/* Tabs switch bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setHomeActiveCollection('ethnic')}
              className={`text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                homeActiveCollection === 'ethnic'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
            >
              Ethnic & Festive
            </button>
            <button
              onClick={() => setHomeActiveCollection('summer')}
              className={`text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                homeActiveCollection === 'summer'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
            >
              Summer Breeze
            </button>
            <button
              onClick={() => setHomeActiveCollection('office')}
              className={`text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                homeActiveCollection === 'office'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
            >
              Office Wear
            </button>
            <button
              onClick={() => setHomeActiveCollection('winter')}
              className={`text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                homeActiveCollection === 'winter'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
            >
              Winter cozy
            </button>
          </div>
        </div>

        {/* Selected Collection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 px-4">
          {homeActiveCollection === 'ethnic' && seasonalEthnic.map((p) => (
            <ProductCard
              key={`home-col-eth-${p.id}`}
              product={p}
              setView={setView}
              setSelectedProduct={setSelectedProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some(item => item.id === p.id)}
              onToggleCompare={onToggleCompare}
              isInCompare={compareList.some(item => item.id === p.id)}
              addToast={addToast}
            />
          ))}

          {homeActiveCollection === 'summer' && seasonalSummer.map((p) => (
            <ProductCard
              key={`home-col-sum-${p.id}`}
              product={p}
              setView={setView}
              setSelectedProduct={setSelectedProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some(item => item.id === p.id)}
              onToggleCompare={onToggleCompare}
              isInCompare={compareList.some(item => item.id === p.id)}
              addToast={addToast}
            />
          ))}

          {homeActiveCollection === 'office' && seasonalOffice.map((p) => (
            <ProductCard
              key={`home-col-off-${p.id}`}
              product={p}
              setView={setView}
              setSelectedProduct={setSelectedProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some(item => item.id === p.id)}
              onToggleCompare={onToggleCompare}
              isInCompare={compareList.some(item => item.id === p.id)}
              addToast={addToast}
            />
          ))}

          {homeActiveCollection === 'winter' && seasonalWinter.map((p) => (
            <ProductCard
              key={`home-col-win-${p.id}`}
              product={p}
              setView={setView}
              setSelectedProduct={setSelectedProduct}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.some(item => item.id === p.id)}
              onToggleCompare={onToggleCompare}
              isInCompare={compareList.some(item => item.id === p.id)}
              addToast={addToast}
            />
          ))}
        </div>
      </section>

      {/* 7. Style Inspiration Bento Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[11px] font-black tracking-[0.2em] text-amber-600 uppercase block mb-1">
            CURATED LOOKBOOKS
          </span>
          <h2 className="text-2xl font-black text-zinc-900 tracking-wide uppercase">Lookbook Inspiration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden h-72 flex flex-col justify-between shadow-lg">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&h=400&q=80')] bg-cover bg-center" />
            <div className="z-10">
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3.5 inline-block">
                Ethnic Majesty
              </span>
              <h4 className="text-xl font-bold tracking-wide leading-snug">The Golden Hour Kurta Combo</h4>
              <p className="text-xs text-zinc-400 mt-2 font-medium">How to style classic mustard Kurtas with ivory Nehru jackets.</p>
            </div>
            <button
              onClick={() => {
                setSelectedGender('Men');
                setSearchQuery('Nehru Jacket');
                setView('shop');
              }}
              className="z-10 text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest flex items-center gap-1.5 cursor-pointer mt-4"
            >
              <span>Explore Wardrobe Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-100 text-zinc-900 rounded-3xl p-8 relative overflow-hidden h-72 flex flex-col justify-between shadow-lg">
            <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&h=400&q=80')] bg-cover bg-center" />
            <div className="z-10">
              <span className="text-[10px] bg-amber-600/10 text-amber-800 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3.5 inline-block">
                Western Chic
              </span>
              <h4 className="text-xl font-bold tracking-wide leading-snug">The Pastel Linen Brunch Suit</h4>
              <p className="text-xs text-zinc-500 mt-2 font-medium">Sophisticated linen pairings for the perfect summer brunch look.</p>
            </div>
            <button
              onClick={() => {
                setSelectedGender('Women');
                setSearchQuery('Dresses');
                setView('shop');
              }}
              className="z-10 text-xs font-bold text-zinc-800 hover:text-amber-700 uppercase tracking-widest flex items-center gap-1.5 cursor-pointer mt-4"
            >
              <span>Explore Wardrobe Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-950 text-white rounded-3xl p-8 relative overflow-hidden h-72 flex flex-col justify-between shadow-lg">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=400&h=400&q=80')] bg-cover bg-center" />
            <div className="z-10">
              <span className="text-[10px] bg-zinc-800 text-zinc-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3.5 inline-block">
                Minimalist Tailoring
              </span>
              <h4 className="text-xl font-bold tracking-wide leading-snug">Modern Professional Blazer Sets</h4>
              <p className="text-xs text-zinc-400 mt-2 font-medium">Tailored boardroom blazers matching stretchable slim trousers.</p>
            </div>
            <button
              onClick={() => {
                setSelectedGender('Men');
                setSearchQuery('Blazers');
                setView('shop');
              }}
              className="z-10 text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest flex items-center gap-1.5 cursor-pointer mt-4"
            >
              <span>Explore Wardrobe Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
