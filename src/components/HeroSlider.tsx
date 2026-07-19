/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Gender } from '../types';

interface HeroSliderProps {
  setView: (view: string) => void;
  setSelectedGender: (gender: Gender | null) => void;
  setSearchQuery: (query: string) => void;
}

const SLIDES = [
  {
    id: 1,
    title: 'Festival Collection 2026',
    subtitle: 'THE GRANDEUR OF INDIAN HERITAGE',
    description: 'Immerse yourself in luxurious Banarasi silks, intricately embroidered Kurta sets, and masterfully crafted Sarees designed for celebratory luxury.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&h=700&q=80',
    tag: 'Women',
    btnText: 'Shop Ethnic Wear',
    categoryFilter: 'Sarees',
    accentColor: 'border-amber-500 text-amber-500 bg-amber-50/10'
  },
  {
    id: 2,
    title: 'Modern Workwear Classics',
    subtitle: 'PRACTICAL LUXURY FOR HIM',
    description: 'Elevate your professional wardrobe with pure Italian linen shirts, tailored blazers, and ultra-comfortable formal trousers from top Indian brands.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&h=700&q=80',
    tag: 'Men',
    btnText: 'Explore Office Wear',
    categoryFilter: 'Formal Shirts',
    accentColor: 'border-zinc-500 text-white bg-zinc-800'
  },
  {
    id: 3,
    title: 'Lively Summer Pastels',
    subtitle: 'BREATHABLE ORGANIC ESSENTIALS',
    description: 'Effortless crop tops, flowy cotton skirts, and casual t-shirts made from 100% natural, ethically sourced Indian fabrics.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&h=700&q=80',
    tag: 'Women',
    btnText: 'Shop Summer Tops',
    categoryFilter: 'Tops',
    accentColor: 'border-amber-600 text-amber-900 bg-amber-100'
  }
];

export default function HeroSlider({ setView, setSelectedGender, setSearchQuery }: HeroSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const handleSlideClick = (slide: typeof SLIDES[0]) => {
    setSelectedGender(slide.tag as Gender);
    setSearchQuery(slide.categoryFilter);
    setView('shop');
  };

  return (
    <div className="relative h-[400px] md:h-[550px] lg:h-[620px] w-full overflow-hidden bg-zinc-950">
      {/* Slides wrapper */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Slide Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl text-white">
                <span className="flex items-center gap-2 text-xs font-black tracking-[0.25em] text-amber-500 uppercase mb-3">
                  <Sparkles className="w-4 h-4" />
                  {slide.subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4 font-serif">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 font-medium mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleSlideClick(slide)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-600/20 transform hover:-translate-y-0.5"
                    id={`hero-slide-cta-${slide.id}`}
                  >
                    {slide.btnText}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGender(null);
                      setSearchQuery('');
                      setView('shop');
                    }}
                    className="border border-white hover:bg-white hover:text-zinc-950 text-white font-bold text-sm tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded-full transition-all duration-300"
                    id={`hero-slide-explore-${slide.id}`}
                  >
                    Explore New Arrivals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
        id="hero-slider-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
        id="hero-slider-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIdx ? 'bg-amber-500 w-8' : 'bg-white/40 w-2.5'
            }`}
            title={`Go to slide ${idx + 1}`}
            id={`hero-indicator-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
