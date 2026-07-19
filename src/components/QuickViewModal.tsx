/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product, ColorVariant } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: ColorVariant) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: QuickViewModalProps) {
  if (!product) return null;

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>(
    (product.sizes.find(s => s.stock > 0)?.size as any) || 'M'
  );

  const activeSizeInfo = product.sizes.find(s => s.size === selectedSize);
  const currentStock = activeSizeInfo ? activeSizeInfo.stock : 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="quick-view-modal">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto z-10 flex flex-col md:flex-row border border-zinc-100 animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors"
          id="close-quickview-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Images */}
        <div className="w-full md:w-1/2 p-6 flex flex-col gap-4 border-r border-zinc-100">
          <div className="relative aspect-[3/4] bg-zinc-50 rounded-2xl overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  mainImage === img ? 'border-amber-500 scale-102 shadow-md' : 'border-zinc-100 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Configuration */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* Brand & SKU */}
            <div className="flex justify-between items-center mb-1.5 mt-2">
              <span className="text-xs uppercase font-black text-amber-700 tracking-widest">{product.brand}</span>
              <span className="text-[10px] text-zinc-400 font-mono font-medium">SKU: {product.sku}</span>
            </div>

            {/* Name */}
            <h2 className="text-xl font-bold text-zinc-900 tracking-wide mb-3">{product.name}</h2>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold text-zinc-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-zinc-400 font-medium">|</span>
              <span className="text-xs text-zinc-500 font-bold">{product.reviewCount} Verified Customer Reviews</span>
            </div>

            {/* Price section */}
            <div className="mb-6 bg-zinc-50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-zinc-950">₹{product.price}</span>
                  <span className="text-sm text-zinc-400 line-through font-medium">MRP ₹{product.mrp}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2.5 py-1 rounded-full uppercase tracking-wider leading-none">
                    {product.discount}% OFF
                  </span>
                </div>
              </div>
              <div className="text-right border-l border-zinc-200 pl-4">
                <span className="text-xs text-zinc-400 font-bold block mb-1">Your Total Savings</span>
                <span className="text-sm text-emerald-600 font-black">₹{product.mrp - product.price}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-500 leading-relaxed mb-6 line-clamp-3">{product.description}</p>

            {/* Color Swatch Selection */}
            <div className="mb-6">
              <span className="text-xs font-black text-zinc-800 uppercase tracking-widest block mb-3">
                Selected Color: <span className="text-zinc-500 font-medium normal-case">{selectedColor.name}</span>
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border shadow-sm transition-all ${
                      selectedColor.name === color.name ? 'scale-120 ring-2 ring-zinc-800 ring-offset-2' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection (XS-XXXL) */}
            {product.gender !== 'Accessories' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-zinc-800 uppercase tracking-widest">
                    Select Size: <span className="text-zinc-500 font-medium uppercase">{selectedSize}</span>
                  </span>
                  <span className="text-xs text-amber-700 font-bold hover:underline cursor-pointer">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz, idx) => {
                    const isSelected = selectedSize === sz.size;
                    const hasStock = sz.stock > 0;
                    return (
                      <button
                        key={idx}
                        disabled={!hasStock}
                        onClick={() => setSelectedSize(sz.size as any)}
                        className={`text-xs font-black px-4 py-2.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                            : hasStock
                            ? 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
                            : 'bg-zinc-50 border-zinc-100 text-zinc-300 line-through cursor-not-allowed'
                        }`}
                      >
                        {sz.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real-time Stock Status */}
            <div className="mb-6 flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${currentStock > 10 ? 'bg-emerald-500' : currentStock > 0 ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-xs font-bold text-zinc-700">
                {currentStock > 10 ? 'Available in Stock' : currentStock > 0 ? `Hurry! Only ${currentStock} left in stock` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Action buttons (Add to Cart / Wishlist) */}
          <div className="flex gap-4 border-t border-zinc-100 pt-6">
            <button
              disabled={currentStock === 0}
              onClick={handleAddToCart}
              className={`flex-grow font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md ${
                currentStock > 0
                  ? 'bg-zinc-950 hover:bg-zinc-900 text-white hover:shadow-lg'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
              id="quickview-addcart-action"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Bag
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-4 rounded-xl border shadow-xs transition-all ${
                isInWishlist
                  ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
              id="quickview-wishlist-action"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
