/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Search, Heart, ShoppingBag, BarChart3 } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  setView: (view: string) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onMobileSearchTrigger?: () => void;
}

export default function MobileNav({
  currentView,
  setView,
  cartCount,
  wishlistCount,
  compareCount,
  onMobileSearchTrigger
}: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] sm:hidden h-16 flex items-center justify-around px-2">
      <button
        onClick={() => setView('home')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          currentView === 'home' ? 'text-amber-600' : 'text-zinc-400 hover:text-zinc-800'
        }`}
        id="mob-nav-home"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">Home</span>
      </button>

      <button
        onClick={() => {
          setView('shop');
          if (onMobileSearchTrigger) onMobileSearchTrigger();
        }}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
          currentView === 'shop' ? 'text-amber-600' : 'text-zinc-400 hover:text-zinc-800'
        }`}
        id="mob-nav-shop"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">Shop</span>
      </button>

      <button
        onClick={() => setView('compare')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all relative ${
          currentView === 'compare' ? 'text-amber-600' : 'text-zinc-400 hover:text-zinc-800'
        }`}
        id="mob-nav-compare"
      >
        <BarChart3 className="w-5 h-5" />
        {compareCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-zinc-900 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white leading-none">
            {compareCount}
          </span>
        )}
        <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">Compare</span>
      </button>

      <button
        onClick={() => setView('wishlist')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all relative ${
          currentView === 'wishlist' ? 'text-amber-600' : 'text-zinc-400 hover:text-zinc-800'
        }`}
        id="mob-nav-wishlist"
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-amber-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white leading-none">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">Wishlist</span>
      </button>

      <button
        onClick={() => setView('cart')}
        className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all relative ${
          currentView === 'cart' ? 'text-amber-600' : 'text-zinc-400 hover:text-zinc-800'
        }`}
        id="mob-nav-cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-emerald-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white leading-none">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-bold mt-1 tracking-wide uppercase">Cart</span>
      </button>
    </div>
  );
}
