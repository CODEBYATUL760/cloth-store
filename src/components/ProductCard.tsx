/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Eye, BarChart3, ShoppingCart, Star } from 'lucide-react';
import { Product, ColorVariant } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: ColorVariant) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onToggleCompare: (product: Product) => void;
  isInCompare: boolean;
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
}

export default function ProductCard({
  product,
  setView,
  setSelectedProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onToggleCompare,
  isInCompare,
  addToast
}: ProductCardProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first size available with stock, or 'M' as standard fallback
    const availableSize = product.sizes.find(s => s.stock > 0)?.size || 'M';
    onAddToCart(product, availableSize, selectedColor);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-300 transform hover:-translate-y-1.5"
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images[1]) {
          setActiveImage(product.images[1]);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImage(product.images[0]);
      }}
    >
      {/* Product Image Section */}
      <div className="relative aspect-[3/4] bg-zinc-50 overflow-hidden select-none">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Product Badges (Discount / Best Seller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tags.includes('Best Seller') && (
            <span className="bg-zinc-950 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md leading-none">
              Best Seller
            </span>
          )}
          {product.discount >= 40 && (
            <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md leading-none">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Quick action triggers overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-250 transform translate-x-1 sm:translate-x-3 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2.5 rounded-full shadow-lg border transition-all ${
              isInWishlist
                ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                : 'bg-white border-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
            title="Add to Wishlist"
            id={`wishlist-btn-${product.id}`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-2.5 rounded-full shadow-lg border transition-all ${
              isInCompare
                ? 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800'
                : 'bg-white border-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
            title="Compare Product"
            id={`compare-btn-${product.id}`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 bg-white border border-zinc-100 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-lg transition-all"
            title="Quick View"
            id={`quick-view-btn-${product.id}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick add to cart overlay banner at the bottom */}
        {product.totalStock > 0 ? (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-zinc-950/95 hover:bg-zinc-900 text-white text-xs font-bold py-3.5 flex items-center justify-center gap-2 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-20 backdrop-blur-xs select-none"
            id={`quick-add-cart-btn-${product.id}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add to Cart
          </button>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-800/90 text-zinc-400 text-xs font-bold py-3 text-center z-20 select-none">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Information Section */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex justify-between items-center text-[10px] text-zinc-400 uppercase font-black tracking-widest leading-none mb-1.5">
            <span>{product.brand}</span>
            <span className="font-medium text-zinc-500 normal-case">{product.category}</span>
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-zinc-800 tracking-wide line-clamp-1 group-hover:text-amber-600 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-zinc-700 leading-none">{product.rating}</span>
            <span className="text-[10px] text-zinc-400 leading-none">({product.reviewCount})</span>
          </div>
        </div>

        <div>
          {/* Size Pills Preview (Desktop) */}
          <div className="hidden group-hover:flex items-center gap-1 mb-3">
            <span className="text-[9px] text-zinc-400 uppercase font-bold mr-1 leading-none">Sizes:</span>
            {product.sizes.slice(0, 5).map((sz, idx) => (
              <span
                key={idx}
                className={`text-[9px] font-black w-5 h-5 rounded-md flex items-center justify-center border leading-none ${
                  sz.stock > 0
                    ? 'border-zinc-200 text-zinc-600'
                    : 'border-zinc-100 text-zinc-300 line-through'
                }`}
              >
                {sz.size}
              </span>
            ))}
          </div>

          {/* Colors & Price row */}
          <div className="flex items-center justify-between border-t border-zinc-50 pt-3">
            {/* Swatches */}
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.colors.slice(0, 3).map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(col)}
                  className={`w-3.5 h-3.5 rounded-full border shadow-2xs transition-transform ${
                    selectedColor.name === col.name ? 'scale-130 ring-1 ring-zinc-400 ring-offset-1' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-zinc-400 font-bold leading-none">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>

            {/* Pricing Details */}
            <div className="text-right">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-sm font-black text-zinc-900">₹{product.price}</span>
                <span className="text-[11px] text-zinc-400 line-through">₹{product.mrp}</span>
              </div>
              {product.discount > 0 && (
                <span className="text-[10px] text-emerald-600 font-bold leading-none block mt-0.5">
                  Save ₹{product.mrp - product.price}
                </span>
              )}
            </div>
          </div>

          {/* Mobile-optimized easy action bar */}
          <div className="block md:hidden border-t border-zinc-100 mt-3.5 pt-3">
            {product.totalStock > 0 ? (
              <button
                onClick={handleQuickAdd}
                className="w-full bg-zinc-950 active:bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs"
                id={`mobile-quick-add-${product.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />
                Add to Bag
              </button>
            ) : (
              <div className="w-full bg-zinc-50 text-zinc-400 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl text-center">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
