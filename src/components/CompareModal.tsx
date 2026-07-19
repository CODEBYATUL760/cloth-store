/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ArrowRight, ShoppingCart, Trash2, HelpCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  compareList: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onClose: () => void;
  isOpen: boolean;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  setView: (view: string) => void;
}

export default function CompareModal({
  compareList,
  onRemoveFromCompare,
  onClose,
  isOpen,
  onAddToCart,
  setView
}: CompareModalProps) {
  if (!isOpen) {
    // Render the floating drawer instead
    if (compareList.length === 0) return null;
    return (
      <div className="fixed bottom-16 sm:bottom-0 left-0 right-0 bg-white border-t border-zinc-200 shadow-[0_-8px_24px_rgba(0,0,0,0.1)] py-4 px-6 z-40 animate-fade-in-up">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {compareList.length} Selected
            </span>
            <p className="text-sm font-bold text-zinc-800">
              Compare items side-by-side (max 3 items)
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto py-1">
            {compareList.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-zinc-50 border border-zinc-150 rounded-xl pl-2 pr-3 py-1.5 flex-shrink-0"
              >
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-8 h-10 object-cover rounded-md bg-zinc-100"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold text-amber-700 block leading-none">{product.brand}</span>
                  <span className="text-[11px] font-semibold text-zinc-700 line-clamp-1 w-24 mt-0.5">{product.name}</span>
                </div>
                <button
                  onClick={() => onRemoveFromCompare(product)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-150 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {compareList.length < 3 && (
              <div className="hidden sm:flex items-center gap-1.5 border border-dashed border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-400 font-bold">
                <HelpCircle className="w-4 h-4 text-zinc-300" />
                <span>Add {3 - compareList.length} more</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                // Clear compare list helper or close
                compareList.forEach(p => onRemoveFromCompare(p));
              }}
              className="w-1/2 sm:w-auto text-zinc-500 hover:text-zinc-800 text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-xl transition-all"
            >
              Clear All
            </button>
            <button
              disabled={compareList.length < 2}
              onClick={() => {
                setView('compare');
                onClose();
              }}
              className={`w-1/2 sm:w-auto font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-full flex items-center justify-center gap-1.5 shadow-md transition-all ${
                compareList.length >= 2
                  ? 'bg-zinc-950 hover:bg-zinc-900 text-white hover:shadow-lg'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-150'
              }`}
            >
              Compare Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full detailed modal view (if isOpen is true)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="compare-full-modal">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto z-10 flex flex-col border border-zinc-100 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">Detailed Comparison Matrix</h2>
            <p className="text-xs text-zinc-500 mt-1">Analyzing technical specs, fabric ratings, and fit side-by-side.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <AlertCircle className="w-12 h-12 text-zinc-300 mb-4" />
            <p className="text-zinc-500 text-sm font-semibold">No products selected for comparison.</p>
            <button
              onClick={() => {
                setView('shop');
                onClose();
              }}
              className="mt-4 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-full"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[600px] divide-y divide-zinc-100">
              
              {/* Product Card Row */}
              <div className="grid grid-cols-4 gap-4 pb-6">
                <div className="flex flex-col justify-end text-zinc-400 font-bold text-xs uppercase tracking-wider">
                  Product Details
                </div>
                {compareList.map((product) => (
                  <div key={product.id} className="relative flex flex-col border border-zinc-150 rounded-2xl p-3 bg-zinc-50/50">
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-2 right-2 p-1.5 bg-white border border-zinc-100 rounded-full text-zinc-400 hover:text-rose-600 hover:border-rose-100 shadow-sm transition-all"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="aspect-[3/4] object-cover rounded-xl bg-zinc-100 w-full mb-3"
                      referrerPolicy="no-referrer"
                    />

                    <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider block">{product.brand}</span>
                    <h4 className="text-xs font-bold text-zinc-800 line-clamp-1 mt-1">{product.name}</h4>
                    
                    <div className="flex items-baseline gap-1.5 mt-2 mb-3">
                      <span className="text-sm font-black text-zinc-950">₹{product.price}</span>
                      <span className="text-[10px] text-zinc-400 line-through">₹{product.mrp}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">{product.discount}% OFF</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, 'M', product.colors[0])}
                      className="w-full bg-zinc-950 hover:bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-wider py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add Standard M
                    </button>
                  </div>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                  <div key={idx} className="border border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 font-medium p-6 bg-zinc-50/20">
                    <HelpCircle className="w-8 h-8 text-zinc-200 mb-2" />
                    <span className="text-xs">Select product to compare</span>
                  </div>
                ))}
              </div>

              {/* Technical Spec Rows */}
              <CompareSpecRow label="Category" values={compareList.map(p => p.category)} />
              <CompareSpecRow label="Fabric Weave" values={compareList.map(p => p.fabric)} />
              <CompareSpecRow label="Material" values={compareList.map(p => p.material)} />
              <CompareSpecRow label="Fit Silhouette" values={compareList.map(p => p.fit)} />
              <CompareSpecRow label="Pattern Design" values={compareList.map(p => p.pattern)} />
              <CompareSpecRow label="Neck Style" values={compareList.map(p => p.neck || 'Standard')} />
              <CompareSpecRow label="Sleeve Cut" values={compareList.map(p => p.sleeve || 'N/A')} />
              <CompareSpecRow label="Occasion Type" values={compareList.map(p => p.occasion)} />
              <CompareSpecRow label="Wash Care Instructions" values={compareList.map(p => p.washCare)} />
              <CompareSpecRow label="Availability" values={compareList.map(p => p.availability)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CompareSpecRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-3.5 items-center text-xs">
      <span className="font-bold text-zinc-500 uppercase tracking-wide">{label}</span>
      {values.map((val, idx) => (
        <span key={idx} className="font-semibold text-zinc-800 break-words pl-1 pr-4">
          {val}
        </span>
      ))}
      {Array.from({ length: 3 - values.length }).map((_, idx) => (
        <span key={idx} className="text-zinc-300 font-medium italic">—</span>
      ))}
    </div>
  );
}
