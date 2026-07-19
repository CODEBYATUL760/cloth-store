/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface CompareViewProps {
  compareList: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
}

export default function CompareView({
  compareList,
  onRemoveFromCompare,
  onAddToCart,
  setView,
  setSelectedProduct
}: CompareViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="compare-matrix-view">
      <div className="flex items-center gap-4 mb-8 pb-3 border-b border-zinc-100">
        <button
          onClick={() => setView('home')}
          className="p-1.5 hover:bg-zinc-50 rounded-full text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-black text-zinc-950 uppercase tracking-widest">
          Product Comparison Matrix ({compareList.length}/4)
        </h2>
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center bg-white border border-zinc-150 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
          <h3 className="text-base font-bold text-zinc-800">No products compared</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
            Click the compare button on product cards to view side-by-side technical specifications.
          </p>
          <button
            onClick={() => setView('shop')}
            className="mt-6 bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-full transition-all shadow-md"
          >
            Explore Catalog Range
          </button>
        </div>
      ) : (
        <div className="bg-white border border-zinc-150 rounded-3xl overflow-hidden shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-zinc-50 divide-x divide-zinc-150 border-b border-zinc-150">
                <th className="py-4 px-6 text-zinc-400 font-bold uppercase tracking-wider w-1/5 bg-zinc-100/50">Specifications</th>
                {compareList.map((product) => (
                  <th key={product.id} className="py-4 px-6 w-1/5 relative">
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-rose-600 rounded-full hover:bg-zinc-100 transition-all"
                      title="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col items-center text-center mt-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-21 object-cover rounded-md bg-zinc-200 shadow-2xs mb-3"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[9px] uppercase font-black text-amber-700 tracking-wider">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-800 line-clamp-1 mt-1">{product.name}</h4>
                    </div>
                  </th>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <th key={idx} className="py-4 px-6 w-1/5 bg-zinc-50/20 text-center text-zinc-300 font-semibold italic">
                    Slot Available
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 font-bold text-zinc-700">
              {/* Row 1: Brand & Model */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Price / Offers</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-zinc-950">₹{product.price}</span>
                      <span className="text-[10px] text-zinc-400 line-through">₹{product.mrp}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">{product.discount}% OFF</span>
                  </td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 2: Fabric Material */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Fabric Raw Material</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6 font-medium text-zinc-800">{product.material} / {product.fabric}</td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 3: Pattern */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Pattern / Print</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6 font-medium text-zinc-800">{product.pattern}</td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 4: Occasion */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Ideal Occasion</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6 font-medium text-zinc-800">{product.occasion}</td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 5: Sleeve & Neck */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Style Cuts</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6 font-medium text-zinc-800">
                    <div>Neck: {product.neck || 'Standard'}</div>
                    <div className="mt-1">Sleeve: {product.sleeve || 'N/A'}</div>
                  </td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 6: Wash Care */}
              <tr className="divide-x divide-zinc-100 hover:bg-zinc-50/20">
                <td className="py-3.5 px-6 font-bold text-zinc-900 bg-zinc-50/20">Wash Maintenance</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-3.5 px-6 font-medium text-zinc-800 leading-relaxed">{product.washCare}</td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-3.5 px-6" />
                ))}
              </tr>

              {/* Row 7: Action buy */}
              <tr className="divide-x divide-zinc-100">
                <td className="py-4 px-6 font-bold text-zinc-900 bg-zinc-50/20">Action Buy</td>
                {compareList.map((product) => (
                  <td key={product.id} className="py-4 px-6">
                    <button
                      onClick={() => onAddToCart(product, 'M', product.colors[0])}
                      className="w-full bg-zinc-950 hover:bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag (M)
                    </button>
                  </td>
                ))}
                {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
                  <td key={idx} className="py-4 px-6" />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
