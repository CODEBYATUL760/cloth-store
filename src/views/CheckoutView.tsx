/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Landmark, Truck, ArrowLeft, Percent } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedCoupon: string;
  onClearCart: () => void;
  onPlaceOrder: (order: OrderDetails) => void;
  setView: (view: string) => void;
  addToast: (title: string, msg: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => void;
}

export default function CheckoutView({
  cart,
  appliedCoupon,
  onClearCart,
  onPlaceOrder,
  setView,
  addToast
}: CheckoutViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [instructions, setInstructions] = useState('');

  // Gift options
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Card'>('COD');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  // Placed Order result
  const [finalOrder, setFinalOrder] = useState<OrderDetails | null>(null);

  // Finance calculations
  let totalMrp = 0;
  let totalSellingPrice = 0;

  cart.forEach(item => {
    totalMrp += item.product.mrp * item.quantity;
    totalSellingPrice += item.product.price * item.quantity;
  });

  const rawSavings = totalMrp - totalSellingPrice;
  let couponDiscount = 0;
  if (appliedCoupon === 'FESTIVE15') {
    couponDiscount = Math.round(totalSellingPrice * 0.15);
  } else if (appliedCoupon === 'WELCOME10') {
    couponDiscount = Math.round(totalSellingPrice * 0.10);
  }

  const finalSubtotal = totalSellingPrice - couponDiscount;
  const shippingCharges = finalSubtotal >= 999 || finalSubtotal === 0 ? 0 : 80;
  const tax = Math.round(finalSubtotal * 0.05);
  const finalTotal = finalSubtotal + tax + shippingCharges;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !city || !pincode) {
      addToast('Validation Error', 'Please fill in all required shipping fields.', 'warning');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      addToast('Validation Error', 'Please enter a valid 10-digit phone number.', 'warning');
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      addToast('Validation Error', 'Please enter a valid 6-digit postal code (Pincode).', 'warning');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'Card' && (!cardNo || !cardExpiry || !cardCvv)) {
      addToast('Payment Error', 'Please provide card credentials to proceed.', 'warning');
      return;
    }
    if (paymentMethod === 'UPI' && !upiId.includes('@')) {
      addToast('Payment Error', 'Please enter a valid UPI ID (e.g. name@paytm).', 'warning');
      return;
    }

    // Success order placement
    const orderId = `MBA-${Math.floor(Math.random() * 900000) + 100000}`;
    const orderDetails: OrderDetails = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: [...cart],
      shippingAddress: { fullName, phone, addressLine, city, state, pincode, landmark },
      deliveryInstructions: instructions,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      subtotal: totalSellingPrice,
      discountAmount: couponDiscount,
      savings: rawSavings + couponDiscount,
      tax,
      shipping: shippingCharges,
      total: finalTotal,
      isGift,
      giftMessage: isGift ? giftMessage : undefined
    };

    setFinalOrder(orderDetails);
    onPlaceOrder(orderDetails); // This callback will update the products inventory in real-time!
    onClearCart();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('Order Confirmed!', 'Thank you! Your Indian style statement is on its way.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="checkout-view-container">
      
      {/* 3 Steps indicator */}
      <div className="max-w-3xl mx-auto mb-10 flex items-center justify-between relative select-none">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-amber-600 -translate-y-1/2 transition-all duration-300 z-0"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        />

        <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center font-black text-xs ${step >= 1 ? 'bg-amber-600 text-white shadow-md' : 'bg-zinc-200 text-zinc-500'}`}>1</div>
        <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center font-black text-xs ${step >= 2 ? 'bg-amber-600 text-white shadow-md' : 'bg-zinc-200 text-zinc-500'}`}>2</div>
        <div className={`z-10 w-9 h-9 rounded-full flex items-center justify-center font-black text-xs ${step >= 3 ? 'bg-amber-600 text-white shadow-md' : 'bg-zinc-200 text-zinc-500'}`}>3</div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
          {/* Address form (Lg: 7 cols) */}
          <form onSubmit={handleAddressSubmit} className="lg:col-span-7 bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-5">
            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest border-b border-zinc-100 pb-3">
              Shipping & Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bhanu Prakash"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Flat, House no., Apartment, Street address *</label>
              <input
                type="text"
                required
                placeholder="Address line details"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:bg-white"
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="6-digit postal code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Landmark (Optional)</label>
              <input
                type="text"
                placeholder="e.g. near temple / central school"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1.5">Special Delivery Instructions (Optional)</label>
              <textarea
                placeholder="e.g. Leave with security guard / ring bell twice"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={2}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white"
              />
            </div>

            {/* Gift wrap checkbox */}
            <div className="border-t border-zinc-100 pt-5 space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-zinc-800">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="w-4 h-4 text-amber-600 border-zinc-300 focus:ring-amber-500/20"
                />
                <span>🎁 Add Premium Gift Wrap & Message (Free)</span>
              </label>
              {isGift && (
                <input
                  type="text"
                  placeholder="Enter custom gift message (max 80 chars)"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  maxLength={80}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white animate-fade-in-up"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              Continue to Payment Method
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Mini order summaries sidebar */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block pb-3 border-b border-zinc-200">
              Your Items ({cart.length})
            </span>
            <div className="divide-y divide-zinc-200/60 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 py-3.5 first:pt-0">
                  <img src={item.product.images[0]} className="w-10 h-13 object-cover rounded-md bg-zinc-200 flex-shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-grow min-w-0">
                    <h5 className="text-xs font-bold text-zinc-800 truncate">{item.product.name}</h5>
                    <span className="text-[10px] text-zinc-400 font-bold block mt-0.5">Size {item.selectedSize} · {item.selectedColor.name} · Qty {item.quantity}</span>
                  </div>
                  <span className="text-xs font-black text-zinc-900">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-zinc-200 pt-4 space-y-2.5 text-xs font-semibold text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal (Selling Price)</span>
                <span>₹{totalSellingPrice}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span>Coupon discount ({appliedCoupon})</span>
                  <span className="text-emerald-600">- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fees</span>
                <span>{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</span>
              </div>
              <div className="flex justify-between pt-3.5 border-t border-zinc-200 text-sm text-zinc-900 font-bold">
                <span>Order Total</span>
                <span className="text-amber-700 font-black">₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up">
          {/* Payment form methods (Lg: 7 cols) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="p-1.5 hover:bg-zinc-100 rounded-full text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-sm font-black text-zinc-950 uppercase tracking-widest">
                Select Secure Payment Method
              </h3>
            </div>

            {/* Payments options select */}
            <div className="space-y-3.5">
              
              {/* COD */}
              <label
                className={`border rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-amber-500 bg-amber-50/10'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="w-4 h-4 text-amber-600 border-zinc-300 focus:ring-amber-500/20 mt-1"
                />
                <div className="text-xs">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-700" />
                    Cash on Delivery (COD) — Free
                  </span>
                  <span className="text-zinc-500 block mt-1.5 leading-relaxed font-semibold">
                    Pay on delivery using Cash, UPI QR code, or Card at your doorstep. No extra handling fees.
                  </span>
                </div>
              </label>

              {/* UPI */}
              <label
                className={`border rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-amber-500 bg-amber-50/10'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="w-4 h-4 text-amber-600 border-zinc-300 focus:ring-amber-500/20 mt-1"
                />
                <div className="text-xs w-full">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    Instant UPI QR / ID (GPay, PhonePe, Paytm)
                  </span>
                  <span className="text-zinc-500 block mt-1.5 leading-relaxed font-semibold">
                    Simulate secure instant UPI payout using your Virtual Payment Address (VPA).
                  </span>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-4 bg-white border border-zinc-150 p-4 rounded-xl space-y-2.5 animate-fade-in-up">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">Your UPI ID (VPA) *</label>
                      <input
                        type="text"
                        placeholder="e.g. username@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Card */}
              <label
                className={`border rounded-2xl p-4 flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-amber-500 bg-amber-50/10'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="w-4 h-4 text-amber-600 border-zinc-300 focus:ring-amber-500/20 mt-1"
                />
                <div className="text-xs w-full">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-zinc-700" />
                    Credit / Debit Card (Secure Demo Gateway)
                  </span>
                  <span className="text-zinc-500 block mt-1.5 leading-relaxed font-semibold">
                    Pay securely using our simulated premium checkout gateway.
                  </span>

                  {paymentMethod === 'Card' && (
                    <div className="mt-4 bg-white border border-zinc-150 p-4 rounded-xl space-y-4 animate-fade-in-up">
                      <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Card Number *</label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444 (Demo card)"
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value)}
                          maxLength={19}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4.5">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Expiry Date *</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">CVV Code *</label>
                          <input
                            type="password"
                            placeholder="***"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={3}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

            </div>

            {/* Secures assurances */}
            <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-2xl text-xs text-zinc-500 font-semibold border border-zinc-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>SSL Secured Gateway. Your credential payments are simulated and never recorded. Ready to update inventory database.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 transform hover:-translate-y-0.5 transition-all"
              id="confirm-checkout-btn"
            >
              Confirm and Place Order (₹{finalTotal})
            </button>
          </form>

          {/* Delivery summaries sidebar */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block pb-3 border-b border-zinc-200">
              Deliver To:
            </span>
            <div className="text-xs leading-relaxed font-semibold text-zinc-600">
              <strong className="text-zinc-900 font-bold block mb-1">{fullName}</strong>
              <p>{addressLine}</p>
              <p>{city}, {state} - {pincode}</p>
              <p className="mt-2.5">📞 {phone}</p>
              {instructions && (
                <p className="mt-2.5 italic text-zinc-400">Note: "{instructions}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 3 && finalOrder && (
        <div className="max-w-xl mx-auto bg-white border border-zinc-150 rounded-3xl p-6 md:p-8 shadow-xl text-center space-y-6 animate-fade-in-up" id="order-success-card">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-zinc-950 font-serif">Order Confirmed Successfully!</h2>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-semibold">
              Thank you for shopping with <strong className="text-zinc-800">MBA Kapdewala</strong>. Your transaction has processed securely and warehouse dispatch is underway.
            </p>
          </div>

          {/* Order Details Matrix Box */}
          <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-150 text-left space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400 uppercase">Order Invoice ID</span>
              <span className="text-zinc-900 font-mono font-black">{finalOrder.id}</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400 uppercase">Placed Date</span>
              <span className="text-zinc-900">{finalOrder.date}</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400 uppercase">Secure Payment Status</span>
              <span className="text-emerald-700">{finalOrder.paymentStatus === 'Paid' ? 'PAID ONLINE (SECURED)' : 'PENDING ON DELIVERY'}</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400 uppercase">Real-Time Inventory Status</span>
              <span className="text-zinc-800 font-black">STOCKS ADJUSTED (-{finalOrder.items.reduce((acc, it) => acc + it.quantity, 0)} items)</span>
            </div>
            <div className="flex justify-between text-xs font-bold pt-3 border-t border-zinc-200 text-zinc-900">
              <span className="uppercase font-black text-zinc-400">Total Payable Payout</span>
              <span className="text-base font-serif font-black text-amber-700">₹{finalOrder.total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 pt-4">
            <button
              onClick={() => {
                setView('shop');
              }}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              Continue Shopping Categories
            </button>
            <button
              onClick={() => setView('home')}
              className="w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-bold text-xs uppercase tracking-widest py-3 rounded-xl text-center transition-all"
            >
              Back to Home Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
