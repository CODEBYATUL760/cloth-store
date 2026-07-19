/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, HelpCircle, ShieldAlert } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender: string;
}

export default function SizeGuideModal({ isOpen, onClose, gender }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const isKids = gender === 'Kids';
  const isWomen = gender === 'Women';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="size-guide-modal">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 z-10 border border-zinc-100 animate-fade-in-up overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-zinc-950">Official Sizing Guide</h2>
          <p className="text-xs text-zinc-500 mt-1">Get the perfect fit. Measurements are in inches unless stated otherwise.</p>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto border border-zinc-150 rounded-2xl mb-6 bg-zinc-50/30">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-500 font-black uppercase tracking-wider">
                <th className="py-3 px-4">Size Tag</th>
                <th className="py-3 px-4">Chest / Bust</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4">Shoulder</th>
                <th className="py-3 px-4">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-150 font-bold text-zinc-800">
              {isKids ? (
                <>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XS (3-4 Yrs)</td>
                    <td className="py-3.5 px-4">22" - 23"</td>
                    <td className="py-3.5 px-4">20" - 21"</td>
                    <td className="py-3.5 px-4">10"</td>
                    <td className="py-3.5 px-4">12"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">S (5-6 Yrs)</td>
                    <td className="py-3.5 px-4">24" - 25"</td>
                    <td className="py-3.5 px-4">21" - 22"</td>
                    <td className="py-3.5 px-4">10.5"</td>
                    <td className="py-3.5 px-4">14"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">M (7-8 Yrs)</td>
                    <td className="py-3.5 px-4">26" - 27"</td>
                    <td className="py-3.5 px-4">22" - 23"</td>
                    <td className="py-3.5 px-4">11"</td>
                    <td className="py-3.5 px-4">16"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">L (9-10 Yrs)</td>
                    <td className="py-3.5 px-4">28" - 29"</td>
                    <td className="py-3.5 px-4">23" - 24"</td>
                    <td className="py-3.5 px-4">12"</td>
                    <td className="py-3.5 px-4">18"</td>
                  </tr>
                </>
              ) : isWomen ? (
                <>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XS</td>
                    <td className="py-3.5 px-4">32" - 33"</td>
                    <td className="py-3.5 px-4">25" - 26"</td>
                    <td className="py-3.5 px-4">14"</td>
                    <td className="py-3.5 px-4">22"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">S</td>
                    <td className="py-3.5 px-4">34" - 35"</td>
                    <td className="py-3.5 px-4">27" - 28"</td>
                    <td className="py-3.5 px-4">14.5"</td>
                    <td className="py-3.5 px-4">22.5"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">M</td>
                    <td className="py-3.5 px-4">36" - 37"</td>
                    <td className="py-3.5 px-4">29" - 30"</td>
                    <td className="py-3.5 px-4">15"</td>
                    <td className="py-3.5 px-4">23"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">L</td>
                    <td className="py-3.5 px-4">38" - 39"</td>
                    <td className="py-3.5 px-4">31" - 32"</td>
                    <td className="py-3.5 px-4">15.5"</td>
                    <td className="py-3.5 px-4">23.5"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XL</td>
                    <td className="py-3.5 px-4">40" - 41"</td>
                    <td className="py-3.5 px-4">33" - 34"</td>
                    <td className="py-3.5 px-4">16.2"</td>
                    <td className="py-3.5 px-4">24"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XXL</td>
                    <td className="py-3.5 px-4">42" - 44"</td>
                    <td className="py-3.5 px-4">35" - 37"</td>
                    <td className="py-3.5 px-4">17"</td>
                    <td className="py-3.5 px-4">24.5"</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XS</td>
                    <td className="py-3.5 px-4">34" - 35"</td>
                    <td className="py-3.5 px-4">28" - 29"</td>
                    <td className="py-3.5 px-4">16.5"</td>
                    <td className="py-3.5 px-4">24"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">S</td>
                    <td className="py-3.5 px-4">36" - 37"</td>
                    <td className="py-3.5 px-4">30" - 31"</td>
                    <td className="py-3.5 px-4">17"</td>
                    <td className="py-3.5 px-4">24.5"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">M</td>
                    <td className="py-3.5 px-4">38" - 40"</td>
                    <td className="py-3.5 px-4">32" - 34"</td>
                    <td className="py-3.5 px-4">17.5"</td>
                    <td className="py-3.5 px-4">25"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">L</td>
                    <td className="py-3.5 px-4">41" - 43"</td>
                    <td className="py-3.5 px-4">35" - 37"</td>
                    <td className="py-3.5 px-4">18"</td>
                    <td className="py-3.5 px-4">25.5"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XL</td>
                    <td className="py-3.5 px-4">44" - 46"</td>
                    <td className="py-3.5 px-4">38" - 40"</td>
                    <td className="py-3.5 px-4">19"</td>
                    <td className="py-3.5 px-4">26"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XXL</td>
                    <td className="py-3.5 px-4">47" - 49"</td>
                    <td className="py-3.5 px-4">41" - 43"</td>
                    <td className="py-3.5 px-4">20"</td>
                    <td className="py-3.5 px-4">26.5"</td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="py-3.5 px-4 text-amber-700">XXXL</td>
                    <td className="py-3.5 px-4">50" - 52"</td>
                    <td className="py-3.5 px-4">44" - 46"</td>
                    <td className="py-3.5 px-4">21"</td>
                    <td className="py-3.5 px-4">27"</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Measuring Advice */}
        <div className="space-y-4">
          <span className="text-xs font-black text-zinc-900 uppercase tracking-widest block">How to Measure Yourself</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-500 leading-relaxed font-semibold">
            <div className="flex gap-3 bg-zinc-50 p-4 rounded-xl">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black flex-shrink-0">1</span>
              <div>
                <strong className="text-zinc-800 font-bold block mb-1">Chest / Bust</strong>
                <span>Measure around the fullest part of your chest, keeping the tape horizontal.</span>
              </div>
            </div>
            <div className="flex gap-3 bg-zinc-50 p-4 rounded-xl">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black flex-shrink-0">2</span>
              <div>
                <strong className="text-zinc-800 font-bold block mb-1">Waist Circumference</strong>
                <span>Measure around your natural waistline, keeping the measuring tape slightly loose.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100 flex items-start gap-3 text-xs text-amber-900 bg-amber-50/50 p-4 rounded-2xl">
          <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Not sure about the sizing?</strong>
            <p className="mt-1">We offer a <strong className="font-black">100% free exchange policy</strong>. If your item doesn't fit perfectly, we will pick it up and deliver the new size for free!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
