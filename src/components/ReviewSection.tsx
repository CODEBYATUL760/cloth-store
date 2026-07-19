/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductReview } from '../types';

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

const FAQS = [
  {
    q: 'How long does shipping take within India?',
    a: 'We ship from Noida, Uttar Pradesh, and express delivery typically takes 2-4 business days for major metropolitan areas (Delhi, Mumbai, Bangalore, Chennai) and 4-6 business days for tier-2 or tier-3 cities across India.'
  },
  {
    q: 'What is your return and exchange policy?',
    a: 'We offer a hassle-free 14-day return and exchange window. The items must be unused, unwashed, and returned with original tags intact. Re-scheduling exchanges is 100% free; we will arrange the reverse pickup.'
  },
  {
    q: 'Can I pay with Cash on Delivery (COD)?',
    a: 'Yes, we support Cash on Delivery (COD) for orders up to ₹10,000 across 25,000+ pincodes in India. There is no additional fee for COD purchases!'
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, we send you an SMS and Email containing the tracking link from our shipping partners (Delhivery, BlueDart, or Xpressbees).'
  },
  {
    q: 'Are the colors on the website exactly accurate?',
    a: 'We use high-resolution, professional fashion photography in natural lighting to capture true-to-life colors. However, slight variations might occur depending on your screen resolution or settings.'
  }
];

export default function ReviewSection({ rating, reviewCount, reviews }: ReviewSectionProps) {
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({});
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  const handleLike = (reviewId: string, initialLikes: number) => {
    setLikesState(prev => {
      const state = prev[reviewId] || { count: initialLikes, liked: false };
      if (state.liked) {
        return { ...prev, [reviewId]: { count: state.count - 1, liked: false } };
      } else {
        return { ...prev, [reviewId]: { count: state.count + 1, liked: true } };
      }
    });
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Calculate rating breakdown distribution
  const ratingDistribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 star counts
  reviews.forEach(r => {
    const starIdx = 5 - Math.round(r.rating);
    if (starIdx >= 0 && starIdx < 5) {
      ratingDistribution[starIdx]++;
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10" id="reviews-faq-section">
      
      {/* Column 1 & 2: Reviews List */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-lg font-black text-zinc-950 uppercase tracking-widest border-b border-zinc-100 pb-3">
          Verified Customer Reviews ({reviewCount})
        </h3>

        {reviews.length === 0 ? (
          <p className="text-xs text-zinc-500 font-medium">No reviews submitted yet for this product. Be the first to review!</p>
        ) : (
          <div className="divide-y divide-zinc-100 space-y-5">
            {reviews.map((rev) => {
              const rLike = likesState[rev.id] || { count: rev.likes, liked: false };
              return (
                <div key={rev.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-800">{rev.userName}</span>
                      {rev.verified && (
                        <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-bold">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-2.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-zinc-600 leading-relaxed font-medium mb-3">
                    "{rev.comment}"
                  </p>

                  {/* Helpfulness Action */}
                  <button
                    onClick={() => handleLike(rev.id, rev.likes)}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                      rLike.liked
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({rLike.count})</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Column 3: Rating Distribution & FAQ */}
      <div className="space-y-8">
        
        {/* Rating Summary Card */}
        <div className="bg-zinc-50 border border-zinc-150 rounded-3xl p-6 shadow-2xs">
          <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block mb-4">Product Metrics</span>
          
          <div className="flex items-center gap-4 mb-5">
            <span className="text-4xl font-black text-zinc-950 font-serif leading-none">{rating}</span>
            <div>
              <div className="flex items-center text-amber-400 mb-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < Math.round(rating) ? 'fill-amber-400' : 'text-zinc-200'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-bold">Based on {reviewCount} ratings</span>
            </div>
          </div>

          {/* Sizing bars breakdown */}
          <div className="space-y-2.5">
            {ratingDistribution.map((cnt, idx) => {
              const stars = 5 - idx;
              const pct = reviewCount > 0 ? (cnt / reviews.length) * 100 : 0;
              return (
                <div key={idx} className="flex items-center gap-2.5 text-[11px] text-zinc-600 font-bold">
                  <span className="w-3">{stars}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                  <div className="flex-grow h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${Math.max(5, pct)}%` }} />
                  </div>
                  <span className="w-7 text-right text-zinc-400 font-medium">{Math.round(pct)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs list */}
        <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-black text-zinc-950 uppercase tracking-widest">Shopping Help & FAQ</h4>
          </div>

          <div className="divide-y divide-zinc-100 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const open = faqOpen[idx];
              return (
                <div key={idx} className="pt-3.5 first:pt-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-zinc-800 hover:text-amber-700 transition-colors py-1"
                  >
                    <span>{faq.q}</span>
                    {open ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  {open && (
                    <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed font-semibold">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
