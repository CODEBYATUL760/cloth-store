/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface WishlistViewProps {
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
}

export default function WishlistView({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  setView,
  setSelectedProduct
}: WishlistViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="wishlist-container">
      <div className="flex items-center gap-4 mb-8 pb-3 border-b border-zinc-100">
        <button
          onClick={() => setView('home')}
          className="p-1.5 hover:bg-zinc-50 rounded-full text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-black text-zinc-950 uppercase tracking-widest">
          My Closet Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
        </h2>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center bg-white border border-zinc-150 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
          <div className="p-4 bg-zinc-50 rounded-full mb-4 text-rose-400">
            <Heart className="w-10 h-10 fill-rose-500" />
          </div>
          <h3 className="text-base font-bold text-zinc-800">Your wishlist closet is empty</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
            Save items you love here so you can shop them at any time or add to your shopping bag.
          </p>
          <button
            onClick={() => setView('shop')}
            className="mt-6 bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-full transition-all shadow-md"
          >
            Explore Hot Trends
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group relative"
            >
              {/* Image box */}
              <div
                onClick={() => {
                  setSelectedProduct(product);
                  setView('product-detail');
                }}
                className="relative aspect-[3/4] bg-zinc-50 overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-zinc-400 hover:text-rose-600 transition-colors z-10"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Info box */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider block">
                    {product.brand}
                  </span>
                  <h4
                    onClick={() => {
                      setSelectedProduct(product);
                      setView('product-detail');
                    }}
                    className="text-xs font-bold text-zinc-800 truncate mt-1.5 cursor-pointer hover:text-amber-600"
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5 mt-2 mb-3">
                    <span className="text-sm font-black text-zinc-950">₹{product.price}</span>
                    <span className="text-[10px] text-zinc-400 line-through">₹{product.mrp}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">{product.discount}% OFF</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product, 'M', product.colors[0])}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Bag (M)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
