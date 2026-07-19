/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function SupportView() {
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketSubject, setTicketSubject] = useState('Order Issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketEmail || !ticketMessage) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setTicketName('');
    setTicketEmail('');
    setTicketSubject('Order Issue');
    setTicketMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="support-view-container">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-[11px] font-black tracking-[0.2em] text-amber-600 uppercase block mb-1">
          HELP CENTER
        </span>
        <h2 className="text-3xl font-black text-zinc-950 font-serif uppercase tracking-wide">Customer Support & Policies</h2>
        <p className="text-xs text-zinc-500 max-w-md mx-auto mt-2 leading-relaxed">
          Need help tracking an order, returning an item, or finding your perfect size? Our premium Delhi-based support agents are ready 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Column 1: Core Policies (Lg: 7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Policy Segment 1 */}
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2.5">
              📦 Shipping & Dispatch Policy
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
              We process and dispatch all orders within 24 hours of successful placement. We partner with India's premium logistic carriers (Delhivery, BlueDart, Xpressbees) to ensure speedy shipping.
            </p>
            <ul className="text-xs text-zinc-500 font-semibold space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Metros (Delhi, Mumbai, Bengaluru):</strong> Delivery in 2 - 4 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Rest of India:</strong> Delivery in 4 - 6 business days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Standard Shipping Fees:</strong> Absolutely FREE for all purchases exceeding ₹999. Orders below ₹999 incur a flat nominal delivery charge of ₹80.</span>
              </li>
            </ul>
          </div>

          {/* Policy Segment 2 */}
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest border-b border-zinc-100 pb-2.5">
              🔄 Returns & 100% Free Exchange Policy
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
              Not 100% satisfied with the fit, fabric, or color? We offer a hassle-free <strong className="text-zinc-800">14-day return and exchange window</strong> from the date of package delivery.
            </p>
            <ul className="text-xs text-zinc-500 font-semibold space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Reverse Pickup:</strong> We will schedule a pickup driver to collect the items from your doorstep for free.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Conditions:</strong> The clothes must be unwashed, unused, with all original brand tags, invoice documents, and packaging intact.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                <span><strong className="text-zinc-800">Refund Settlement:</strong> Direct bank account transfers or store credit payouts will settle within 3-5 business days post reverse pickup verification.</span>
              </li>
            </ul>
          </div>

          {/* FAQ Accordions highlights */}
          <div className="bg-zinc-50 border border-zinc-150 rounded-3xl p-6 shadow-2xs">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-4">
              🛡️ Payment Security & Authenticity
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-semibold mb-3">
              Your security is our absolute highest priority. We use industry-standard SSL encryption technology and partner with certified payment gateway operators (Razorpay, Cashfree) to ensure billing details are fully safe and encrypted.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
              All listed clothing items represent 100% genuine products sourced directly from registered Indian craftsmen and high-end retail manufacturers.
            </p>
          </div>

        </div>

        {/* Column 2: Contact Form (Lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick contact markers */}
          <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-at-t from-zinc-800 via-transparent to-transparent opacity-40" />
            <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block mb-4 border-b border-white/10 pb-2.5">
              Direct Channels
            </span>
            <div className="space-y-4 font-semibold text-zinc-300 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>Call support: +91 98765 43210 (9 AM - 6 PM IST)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Email support: care@mbakapdevala.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Registered office: Sector 62, Noida, UP, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-zinc-150 rounded-3xl p-6 shadow-2xs">
            <span className="text-xs font-black text-zinc-800 uppercase tracking-widest block mb-4">
              Submit Support Ticket
            </span>

            {submitted ? (
              <div className="text-center py-6 space-y-4 animate-fade-in-up">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Ticket Submitted successfully!</h4>
                  <p className="text-xs text-zinc-400 mt-1">Our support specialists will reply on your email within 2 hours.</p>
                </div>
                <button
                  onClick={resetForm}
                  className="bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl transition-colors"
                >
                  Submit Another Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@gmail.com"
                    value={ticketEmail}
                    onChange={(e) => setTicketEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Subject *</label>
                  <select
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:bg-white"
                  >
                    <option value="Order Issue">Order status inquiry</option>
                    <option value="Exchange Issue">Exchanges & size swaps</option>
                    <option value="Refund Issue">Billing / Refund inquiry</option>
                    <option value="Others">Others / Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detail your inquiry here..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-bold text-zinc-800 focus:outline-none focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Help Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
