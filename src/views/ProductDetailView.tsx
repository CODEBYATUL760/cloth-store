/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Heart, BarChart3, ShoppingBag, ShieldCheck, Truck, RefreshCw, ChevronRight, HelpCircle, MapPin, ZoomIn } from 'lucide-react';
import { Product, ColorVariant } from '../types';
import { getRelatedProducts, PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import SizeGuideModal from '../components/SizeGuideModal';

interface ProductDetailViewProps {
  product: Product | null;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: ColorVariant) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: (product: Product) => boolean;
  onToggleCompare: (product: Product) => void;
  isInCompare: (product: Product) => boolean;
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
  onQuickView: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  setView,
  setSelectedProduct,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onToggleCompare,
  isInCompare,
  addToast,
  onQuickView
}: ProductDetailViewProps) {
  if (!product) return null;

  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [selectedCol, setSelectedCol] = useState(product.colors[0]);
  const [selectedSz, setSelectedSz] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>(
    (product.sizes.find(s => s.stock > 0)?.size as any) || 'M'
  );
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<{ checked: boolean; days: number; cost: number; error?: string } | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState<'craft' | 'care' | 'trust'>('craft');
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Scroll to top on load and handle Recently Viewed syncing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImg(product.images[0]);
    setSelectedCol(product.colors[0]);
    setSelectedSz((product.sizes.find(s => s.stock > 0)?.size as any) || 'M');
    setDeliveryStatus(null);
    setPincode('');

    // Handle Recently Viewed Storage
    const key = 'mba_recently_viewed_v1';
    try {
      const stored = localStorage.getItem(key);
      const ids: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.id, ...ids.filter(id => id !== product.id)].slice(0, 6);
      localStorage.setItem(key, JSON.stringify(updated));

      // Resolve product items excluding the current product
      const resolved = updated
        .filter(id => id !== product.id)
        .map(id => PRODUCTS.find(p => p.id === id))
        .filter((p): p is Product => !!p)
        .slice(0, 4);
      setRecentlyViewed(resolved);
    } catch (e) {
      console.error('Error handling recently viewed:', e);
    }
  }, [product]);

  const activeSzInfo = product.sizes.find(s => s.size === selectedSz);
  const currentStock = activeSzInfo ? activeSzInfo.stock : 0;

  // Zoom-on-Hover coordinates calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      // Valid Indian Pincode
      const days = 2 + (parseInt(pincode.charAt(0)) % 4);
      const isExpress = pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56');
      setDeliveryStatus({
        checked: true,
        days: isExpress ? 2 : days,
        cost: 0, // Free shipping
      });
      addToast('Pincode Checked', `Express delivery available for ${pincode}`, 'info');
    } else {
      setDeliveryStatus({
        checked: false,
        days: 0,
        cost: 0,
        error: 'Please enter a valid 6-digit Indian pincode.'
      });
    }
  };

  const handleAddToCart = () => {
    if (currentStock > 0) {
      onAddToCart(product, selectedSz, selectedCol);
    }
  };

  const getEstimatedDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
  };

  const related = getRelatedProducts(product, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="product-detail-container">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
        <button onClick={() => setView('home')} className="hover:text-zinc-700">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => { setView('shop'); }} className="hover:text-zinc-700">{product.gender}</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-800">{product.category}</span>
      </div>

      {/* Main product configuration layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-100">
        
        {/* Gallery Column (Lg: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-2.5 order-2 md:order-1 overflow-x-auto md:overflow-y-auto pb-1.5 md:pb-0 scrollbar-thin">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-16 h-20 md:w-20 md:h-26 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImg === img ? 'border-amber-500 scale-102 shadow-md' : 'border-zinc-150 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

          {/* Main Image View with Zoom on Hover */}
          <div className="flex-grow order-1 md:order-2">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              className="relative aspect-[3/4] bg-zinc-50 rounded-3xl overflow-hidden cursor-crosshair select-none border border-zinc-100"
            >
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
                style={{ opacity: isZooming ? 0 : 1 }}
                referrerPolicy="no-referrer"
              />

              {/* The Zoomed Layer */}
              {isZooming && (
                <div
                  className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none"
                  style={{
                    backgroundImage: `url(${activeImg})`,
                    backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    backgroundSize: '250%'
                  }}
                />
              )}

              {/* Zoom overlay help badge */}
              <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 select-none pointer-events-none uppercase tracking-wider">
                <ZoomIn className="w-3.5 h-3.5" />
                Hover to Zoom
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Details Column (Lg: 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Brand Title */}
            <div>
              <span className="text-xs uppercase font-black text-amber-700 tracking-widest block mb-1">
                {product.brand}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              {/* Product SKU and tags */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-zinc-400 font-bold">SKU: {product.sku}</span>
                {product.tags.includes('Top Rated') && (
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Top Rated
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-150 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">Selling Price</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-zinc-950">₹{product.price}</span>
                  <span className="text-sm text-zinc-400 line-through font-bold">MRP ₹{product.mrp}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2.5 py-1 rounded-full uppercase tracking-widest leading-none">
                    {product.discount}% OFF
                  </span>
                </div>
              </div>
              <div className="text-right border-l border-zinc-200 pl-5">
                <span className="text-[10px] text-zinc-400 font-bold block mb-1">Your Total Savings</span>
                <span className="text-base text-emerald-600 font-black">₹{product.mrp - product.price}</span>
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="text-xs font-black text-zinc-800 uppercase tracking-widest block mb-3">
                Select Color variant: <span className="text-zinc-500 font-medium normal-case">{selectedCol.name}</span>
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCol(col)}
                    className={`w-7 h-7 rounded-full border shadow-sm transition-transform ${
                      selectedCol.name === col.name ? 'scale-120 ring-2 ring-zinc-800 ring-offset-2' : 'hover:scale-115'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            {product.gender !== 'Accessories' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-zinc-800 uppercase tracking-widest">
                    Select Size: <span className="text-zinc-500 font-medium uppercase">{selectedSz}</span>
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-amber-700 hover:text-amber-900 font-bold uppercase tracking-wider"
                    id="size-chart-trigger-btn"
                  >
                    Size Guide Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz, idx) => {
                    const isSel = selectedSz === sz.size;
                    const hasSt = sz.stock > 0;
                    return (
                      <button
                        key={idx}
                        disabled={!hasSt}
                        onClick={() => setSelectedSz(sz.size as any)}
                        className={`text-xs font-black px-4.5 py-3 rounded-xl border transition-all ${
                          isSel
                            ? 'bg-zinc-950 border-zinc-950 text-white shadow-md scale-102'
                            : hasSt
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

            {/* Inventory Real-time status */}
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-100">
              <div className={`w-3 h-3 rounded-full ${currentStock > 10 ? 'bg-emerald-500' : currentStock > 0 ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-xs font-bold text-zinc-700">
                {currentStock > 10 ? 'Available in Stock' : currentStock > 0 ? `Hurry! Only ${currentStock} left in stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Estimated Delivery Box */}
            <div className="bg-zinc-50 border border-zinc-150 rounded-3xl p-5">
              <span className="text-xs font-black text-zinc-800 uppercase tracking-widest flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-amber-600" />
                Delivery Information
              </span>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 flex-grow placeholder-zinc-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-colors"
                >
                  Verify
                </button>
              </form>

              {deliveryStatus?.checked && (
                <div className="mt-4 flex items-start gap-3 bg-white border border-zinc-150 p-3 rounded-2xl animate-fade-in-up">
                  <Truck className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-zinc-800 block">Express Delivery Eligible</span>
                    <span className="text-zinc-500 block mt-1">Guaranteed delivery by <strong className="text-emerald-700 font-black">{getEstimatedDate(deliveryStatus.days)}</strong>.</span>
                  </div>
                </div>
              )}

              {deliveryStatus?.error && (
                <p className="text-xs text-rose-600 font-bold mt-2">{deliveryStatus.error}</p>
              )}

              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-3">
                * Standard shipping time: {product.estimatedDeliveryDays} - {product.estimatedDeliveryDays + 2} days.
              </p>
            </div>

          </div>

          {/* Checkout & Wishlist Actions */}
          <div className="flex gap-4 border-t border-zinc-100 pt-6 mt-8">
            <button
              disabled={currentStock === 0}
              onClick={handleAddToCart}
              className={`flex-grow font-bold text-sm uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md ${
                currentStock > 0
                  ? 'bg-zinc-950 hover:bg-zinc-900 text-white hover:shadow-lg'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
              id="detail-addcart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Bag
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-4 rounded-xl border shadow-2xs transition-all ${
                isInWishlist(product)
                  ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
              id="detail-wishlist-btn"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product) ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Specifications Tabs & Store trust guidelines */}
      <section className="py-12 border-b border-zinc-100" id="product-rich-details">
        <div className="flex border-b border-zinc-200 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSpecTab('craft')}
            className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
              activeSpecTab === 'craft'
                ? 'border-amber-600 text-zinc-950'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            The Craft & Fabric
          </button>
          <button
            onClick={() => setActiveSpecTab('care')}
            className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
              activeSpecTab === 'care'
                ? 'border-amber-600 text-zinc-950'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Sizing & Wash Care
          </button>
          <button
            onClick={() => setActiveSpecTab('trust')}
            className={`pb-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
              activeSpecTab === 'trust'
                ? 'border-amber-600 text-zinc-950'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Shipping & Easy Returns
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Contents */}
          <div className="lg:col-span-8 bg-zinc-50/50 border border-zinc-100 p-6 md:p-8 rounded-3xl min-h-[220px]">
            {activeSpecTab === 'craft' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-zinc-700 animate-fade-in-up">
                <div className="space-y-4">
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Fabric Weave</span>
                    <span className="text-zinc-900">{product.fabric}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Composition</span>
                    <span className="text-zinc-900">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Pattern Motif</span>
                    <span className="text-zinc-900">{product.pattern}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {product.neck && (
                    <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                      <span className="text-zinc-400 font-medium">Neckline Style</span>
                      <span className="text-zinc-900">{product.neck}</span>
                    </div>
                  )}
                  {product.sleeve && (
                    <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                      <span className="text-zinc-400 font-medium">Sleeve Details</span>
                      <span className="text-zinc-900">{product.sleeve}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Handloomed Origin</span>
                    <span className="text-zinc-900">Delhi, UP & India</span>
                  </div>
                </div>
              </div>
            )}

            {activeSpecTab === 'care' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-zinc-700 animate-fade-in-up">
                <div className="space-y-4">
                  {product.fit && (
                    <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                      <span className="text-zinc-400 font-medium">Silhouette Fit</span>
                      <span className="text-zinc-900">{product.fit}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Occasion Match</span>
                    <span className="text-zinc-900">{product.occasion}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col py-1.5">
                    <span className="text-zinc-400 font-medium mb-1">Wash & Laundry Instructions</span>
                    <span className="text-zinc-950 bg-amber-50 text-amber-850 p-3 rounded-xl border border-amber-100/60 font-semibold leading-relaxed">
                      {product.washCare}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeSpecTab === 'trust' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-zinc-700 animate-fade-in-up">
                <div className="space-y-4">
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Return Window</span>
                    <span className="text-emerald-600 font-black">15 Days Hassle-Free</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Shipping Speed</span>
                    <span className="text-zinc-900">Shipped in {product.estimatedDeliveryDays} days (Free Express)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-100/80">
                    <span className="text-zinc-400 font-medium">Quality Check</span>
                    <span className="text-zinc-900">100% Quality Assured</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col py-1.5">
                    <span className="text-zinc-400 font-medium mb-1">Product Manufacturer</span>
                    <span className="text-zinc-950 leading-relaxed font-semibold">
                      {product.manufacturer} <br />
                      <span className="text-zinc-400 text-[10px] font-normal block mt-1">Country of Origin: {product.countryOfOrigin}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust badges side box (Lg: 4 cols) */}
          <div className="lg:col-span-4 bg-zinc-950 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-6 self-stretch">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-500">Mba Kapdewala Trust</h4>
            
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-white/10 rounded-xl text-amber-500 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Quality Assured Handlooms</span>
                <span className="text-zinc-400 block mt-1 leading-relaxed">Each thread is hand-picked and verified by traditional weavers before cataloging.</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-white/10 pt-4.5">
              <div className="p-2 bg-white/10 rounded-xl text-amber-500 flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">15-Day Hassle-Free Exchange</span>
                <span className="text-zinc-400 block mt-1 leading-relaxed">Not the perfect fit? We will pick it up right from your doorstep for free.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews, FAQ & Customer Trust panel */}
      <ReviewSection rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />

      {/* Related / Customers Also Bought slider */}
      {related.length > 0 && (
        <section className="py-12 border-t border-zinc-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest">
              Customers Also Bought (Similar Styles)
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                setView={setView}
                setSelectedProduct={setSelectedProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={isInWishlist(p)}
                onToggleCompare={onToggleCompare}
                isInCompare={isInCompare(p)}
                addToast={addToast}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed slider */}
      {recentlyViewed.length > 0 && (
        <section className="py-12 border-t border-zinc-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest">
              Recently Viewed Products
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {recentlyViewed.map((p) => (
              <ProductCard
                key={`rv-${p.id}`}
                product={p}
                setView={setView}
                setSelectedProduct={setSelectedProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={isInWishlist(p)}
                onToggleCompare={onToggleCompare}
                isInCompare={isInCompare(p)}
                addToast={addToast}
              />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Chart Modal overlay */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} gender={product.gender} />
    </div>
  );
}
