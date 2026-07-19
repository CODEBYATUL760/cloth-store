/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Tag, ShieldCheck, Truck, RefreshCw, Star, Percent } from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (productId: string, size: string, color: string, qty: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  setView: (view: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL', color: any) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onToggleCompare: (product: Product) => void;
  compareList: Product[];
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
  appliedCoupon: string;
  setAppliedCoupon: (coupon: string) => void;
}

export default function CartView({
  cart,
  onUpdateQty,
  onRemoveItem,
  setView,
  setSelectedProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onToggleCompare,
  compareList,
  addToast,
  appliedCoupon,
  setAppliedCoupon
}: CartViewProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  // Sizing and finance calculations
  const FREE_SHIPPING_THRESHOLD = 999;
  let totalMrp = 0;
  let totalSellingPrice = 0;

  cart.forEach(item => {
    totalMrp += item.product.mrp * item.quantity;
    totalSellingPrice += item.product.price * item.quantity;
  });

  const rawSavings = totalMrp - totalSellingPrice;
  
  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon === 'FESTIVE15') {
    couponDiscount = Math.round(totalSellingPrice * 0.15);
  } else if (appliedCoupon === 'WELCOME10') {
    couponDiscount = Math.round(totalSellingPrice * 0.10);
  }

  const finalSubtotal = totalSellingPrice - couponDiscount;
  const shippingCharges = finalSubtotal >= FREE_SHIPPING_THRESHOLD || finalSubtotal === 0 ? 0 : 80;
  
  // Simulated Tax (approx. 5% GST on luxury textiles)
  const tax = Math.round(finalSubtotal * 0.05);
  const finalTotal = finalSubtotal + tax + shippingCharges;

  const freeShippingProgress = Math.min(100, (finalSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - finalSubtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'FESTIVE15') {
      setAppliedCoupon('FESTIVE15');
      setCouponError('');
      addToast('Promo Code Applied', '15% Festive discount has been applied successfully!', 'success');
    } else if (cleanCode === 'WELCOME10') {
      setAppliedCoupon('WELCOME10');
      setCouponError('');
      addToast('Promo Code Applied', '10% Welcome discount has been applied successfully!', 'success');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or FESTIVE15.');
      setAppliedCoupon('');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    setCouponError('');
    addToast('Coupon Removed', 'Discount code removed.', 'info');
  };

  // Get a few recommended best-seller items to display
  const recommended = PRODUCTS.filter(p => p.tags.includes('Best Seller')).slice(2, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="shopping-cart-container">
      <h2 className="text-xl font-black text-zinc-950 uppercase tracking-widest mb-8 border-b border-zinc-100 pb-3">
        Shopping Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center bg-white border border-zinc-150 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
          <div className="p-4 bg-zinc-50 rounded-full mb-4">
            <ShoppingBag className="w-10 h-10 text-zinc-300" />
          </div>
          <h3 className="text-base font-bold text-zinc-800">Your shopping bag is empty</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
            Fill your bag with premium Indian fashion and explore our latest seasonal lookbooks.
          </p>
          <button
            onClick={() => setView('shop')}
            className="mt-6 bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded-full transition-all shadow-md"
            id="empty-cart-shop-now-btn"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cart Items list (Lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Free Shipping Progress bar */}
            {remainingForFreeShipping > 0 ? (
              <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl animate-fade-in-up">
                <div className="flex justify-between items-center text-xs font-bold text-amber-900 mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-700" />
                    Add <strong className="text-amber-800 font-black">₹{remainingForFreeShipping}</strong> more for FREE Shipping!
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full transition-all duration-500" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/60 border border-emerald-100 p-5 rounded-2xl flex items-center gap-3 animate-fade-in-up">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-full">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-emerald-900">
                  <span>Congratulations! Your order qualifies for <strong className="font-black text-emerald-950">Free Express Delivery</strong> across India.</span>
                </div>
              </div>
            )}

            {/* Cart Items list */}
            <div className="divide-y divide-zinc-100 border border-zinc-150 rounded-3xl bg-white p-5 space-y-4 shadow-2xs">
              {cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-4 pt-4 first:pt-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-26 object-cover rounded-xl bg-zinc-100 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setView('product-detail');
                    }}
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-black text-amber-700 tracking-wider leading-none">
                            {item.product.brand}
                          </span>
                          <h4
                            onClick={() => {
                              setSelectedProduct(item.product);
                              setView('product-detail');
                            }}
                            className="text-sm font-bold text-zinc-900 line-clamp-1 mt-1 hover:text-amber-600 cursor-pointer transition-colors"
                          >
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor.name)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2 text-xs font-bold text-zinc-500">
                        <span className="flex items-center gap-1">
                          Size: <strong className="text-zinc-800 font-bold uppercase">{item.selectedSize}</strong>
                        </span>
                        <span className="text-zinc-300">|</span>
                        <span className="flex items-center gap-1.5">
                          Color: 
                          <span className="w-3 h-3 rounded-full border shadow-2xs" style={{ backgroundColor: item.selectedColor.hex }} />
                          <strong className="text-zinc-800 font-bold">{item.selectedColor.name}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector & Price row */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50/50">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-zinc-150 text-zinc-600 font-black text-sm"
                        >
                          -
                        </button>
                        <span className="px-3.5 text-xs font-bold text-zinc-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor.name, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-zinc-150 text-zinc-600 font-black text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-black text-zinc-950">₹{item.product.price * item.quantity}</span>
                          <span className="text-xs text-zinc-400 line-through">₹{item.product.mrp * item.quantity}</span>
                        </div>
                        {item.product.discount > 0 && (
                          <span className="text-[10px] text-emerald-600 font-bold leading-none block mt-0.5">
                            Saved ₹{(item.product.mrp - item.product.price) * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6">
              <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-800">100% Genuine</span>
                <p className="text-[10px] text-zinc-400 mt-1">Directly sourced original products.</p>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col items-center">
                <Truck className="w-5 h-5 text-amber-600 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-800">Express Delivery</span>
                <p className="text-[10px] text-zinc-400 mt-1">Fast delivery with tracking link.</p>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-blue-600 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-800">Easy Exchanges</span>
                <p className="text-[10px] text-zinc-400 mt-1">Free reverse pickup for size replacement.</p>
              </div>
            </div>
          </div>

          {/* Checkout Summaries panel (Lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            {/* Coupon Code validator */}
            <div className="bg-white border border-zinc-150 rounded-3xl p-5 shadow-2xs">
              <span className="text-xs font-black text-zinc-800 uppercase tracking-widest block mb-3.5">
                Apply Coupons & Offers
              </span>
              
              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between animate-fade-in-up">
                  <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-bold">
                    <Percent className="w-5 h-5 text-emerald-700" />
                    <div>
                      <span className="block font-black">{appliedCoupon} APPLIED</span>
                      <span className="text-emerald-700 font-medium block mt-0.5">
                        Saved extra {appliedCoupon === 'FESTIVE15' ? '15%' : '10%'} on your purchase!
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (FESTIVE15 or WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs text-zinc-800 flex-grow placeholder-zinc-400 focus:outline-none focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-rose-600 font-bold">{couponError}</p>}
                  <p className="text-[10px] text-zinc-400 font-semibold block leading-relaxed pt-1.5">
                    💡 Tip: Use <strong className="text-amber-700 font-black">FESTIVE15</strong> for 15% off, or <strong className="text-amber-700 font-black">WELCOME10</strong> for 10% off.
                  </p>
                </form>
              )}
            </div>

            {/* Financial Summary */}
            <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-at-t from-zinc-800 via-transparent to-transparent opacity-40 pointer-events-none" />
              
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-4 border-b border-white/10 pb-3">
                Order Summary
              </span>

              <div className="space-y-3 text-sm font-semibold text-zinc-300">
                <div className="flex justify-between">
                  <span>Total MRP (Gross)</span>
                  <span className="text-zinc-400 line-through">₹{totalMrp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount on MRP</span>
                  <span className="text-emerald-400 font-bold">- ₹{rawSavings}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span className="text-emerald-400 font-bold">- ₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST / Tax (Approx. 5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between pb-3.5 border-b border-white/10">
                  <span>Shipping & Handling</span>
                  <span>{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</span>
                </div>
                
                {/* Final Payable */}
                <div className="flex justify-between items-baseline pt-4 text-white">
                  <span className="text-base font-bold">Total Amount Payable</span>
                  <span className="text-2xl font-black text-amber-500 font-serif">₹{finalTotal}</span>
                </div>
              </div>

              {/* Savings reminder */}
              {rawSavings + couponDiscount > 0 && (
                <div className="mt-6 bg-white/10 border border-white/10 p-3.5 rounded-2xl text-xs text-center font-bold text-amber-400">
                  🎉 Congrats! You are saving ₹{rawSavings + couponDiscount} on this purchase.
                </div>
              )}

              {/* Checkout CTA */}
              <button
                onClick={() => setView('checkout')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full flex items-center justify-center gap-2 mt-6 shadow-lg shadow-amber-600/20 transform hover:-translate-y-0.5 transition-all"
                id="cart-checkout-cta"
              >
                Proceed to Secure Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Carousel at the Bottom of Cart */}
      {recommended.length > 0 && (
        <section className="py-12 border-t border-zinc-150 mt-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest">
              You Might Also Like (Add to Bag)
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {recommended.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                setView={setView}
                setSelectedProduct={setSelectedProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.some(item => item.id === p.id)}
                onToggleCompare={onToggleCompare}
                isInCompare={compareList.some(item => item.id === p.id)}
                addToast={addToast}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
