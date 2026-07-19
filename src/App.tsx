/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, Gender, ToastMessage } from './types';
import { PRODUCTS } from './data/products';

// Views
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import WishlistView from './views/WishlistView';
import CompareView from './views/CompareView';
import SupportView from './views/SupportView';

// Components
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import QuickViewModal from './components/QuickViewModal';
import CompareModal from './components/CompareModal';
import Toast from './components/Toast';
import MbaLogo from './components/MbaLogo';

// Icons for Footer
import { Phone, Mail, MapPin, ShieldCheck, RefreshCw, Truck, Heart } from 'lucide-react';

export default function App() {
  // Main programmatic product list that tracks real-time inventory reduction
  const [currentProducts, setCurrentProducts] = useState<Product[]>(PRODUCTS);

  // Core state arrays loaded from LocalStorage for durable local persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ashen_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ashen_wishlist_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ashen_compare_items');
    return saved ? JSON.parse(saved) : [];
  });

  // Routing Views state
  const [currentView, setView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quick overlays state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search & Global Navigation filter syncing states
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');

  // Save states back to LocalStorage upon mutation
  useEffect(() => {
    localStorage.setItem('ashen_cart_items', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ashen_wishlist_items', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ashen_compare_items', JSON.stringify(compareList));
  }, [compareList]);

  // Toast notifier helper
  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 1. Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: any) => {
    // Find if the variant is already in the cart
    const isExistIdx = cart.findIndex(
      item =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name
    );

    // Fetch the maximum available stock for this variant size
    const szInfo = product.sizes.find(s => s.size === size);
    const maxStock = szInfo ? szInfo.stock : 0;

    if (maxStock === 0) {
      addToast('Out of stock', `Sorry, size ${size} for this outfit is completely sold out.`, 'warning');
      return;
    }

    if (isExistIdx > -1) {
      const currentQty = cart[isExistIdx].quantity;
      if (currentQty >= maxStock) {
        addToast(
          'Maximum Stock Reached',
          `We only have ${maxStock} items left in stock for size ${size}.`,
          'warning'
        );
        return;
      }
      const updated = [...cart];
      updated[isExistIdx].quantity += 1;
      setCart(updated);
    } else {
      setCart(prev => [...prev, { product, quantity: 1, selectedSize: size as any, selectedColor: color }]);
    }

    addToast('Added to Shopping Bag', `Successfully added ${product.name} (${size}) to your cart!`, 'cart');
  };

  const handleUpdateQty = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId, size, color);
      return;
    }

    // Check size stock level
    const p = currentProducts.find(item => item.id === productId);
    if (!p) return;

    const szInfo = p.sizes.find(s => s.size === size);
    const maxStock = szInfo ? szInfo.stock : 0;

    if (qty > maxStock) {
      addToast(
        'Insufficient Inventory',
        `Apologies, we only have ${maxStock} items left in stock for size ${size}.`,
        'warning'
      );
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    const item = cart.find(
      i =>
        i.product.id === productId &&
        i.selectedSize === size &&
        i.selectedColor.name === color
    );
    setCart(prev =>
      prev.filter(
        i =>
          !(
            i.product.id === productId &&
            i.selectedSize === size &&
            i.selectedColor.name === color
          )
      )
    );
    if (item) {
      addToast('Removed from Bag', `Removed ${item.product.name} from your cart.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 2. Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const isExist = wishlist.some(item => item.id === product.id);
    if (isExist) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      addToast('Removed from Wishlist', `Removed ${product.name} from your wardrobe wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      addToast('Saved to Wishlist', `Added ${product.name} to your wardrobe wishlist!`, 'wishlist');
    }
  };

  // 3. Comparison Handlers
  const handleToggleCompare = (product: Product) => {
    const isExist = compareList.some(item => item.id === product.id);
    if (isExist) {
      setCompareList(prev => prev.filter(item => item.id !== product.id));
      addToast('Removed from Compare', `${product.brand} outfit removed from comparison matrix.`, 'info');
    } else {
      if (compareList.length >= 3) {
        addToast(
          'Comparison Limit Exceeded',
          'You can compare a maximum of 3 signature outfits side-by-side.',
          'warning'
        );
        return;
      }
      setCompareList(prev => [...prev, product]);
      addToast('Added to Compare', `${product.brand} outfit added to comparison checklist.`, 'info');
    }
  };

  const handleRemoveFromCompare = (product: Product) => {
    setCompareList(prev => prev.filter(item => item.id !== product.id));
  };

  // 4. Real-Time Order placement & Inventory Decrement
  const handlePlaceOrder = (orderDetails: OrderDetails) => {
    // Fulfill order: decrease stock of purchased clothes in real-time!
    setCurrentProducts(prevProducts => {
      return prevProducts.map(p => {
        // Find if this product was purchased in this order
        const purchasedItems = orderDetails.items.filter(item => item.product.id === p.id);
        if (purchasedItems.length === 0) return p;

        // Clone and decrement size stocks
        const updatedSizes = p.sizes.map(sz => {
          const purchasedItem = purchasedItems.find(item => item.selectedSize === sz.size);
          if (purchasedItem) {
            const finalStock = Math.max(0, sz.stock - purchasedItem.quantity);
            return { ...sz, stock: finalStock };
          }
          return sz;
        });

        return { ...p, sizes: updatedSizes };
      });
    });

    // If the active viewed product was purchased, update it so detailed page shows new stock levels
    if (selectedProduct) {
      const updatedMatch = PRODUCTS.find(p => p.id === selectedProduct.id);
      if (updatedMatch) {
        const purchasedItems = orderDetails.items.filter(item => item.product.id === selectedProduct.id);
        const updatedSizes = updatedMatch.sizes.map(sz => {
          const purchasedItem = purchasedItems.find(item => item.selectedSize === sz.size);
          if (purchasedItem) {
            return { ...sz, stock: Math.max(0, sz.stock - purchasedItem.quantity) };
          }
          return sz;
        });
        setSelectedProduct({ ...updatedMatch, sizes: updatedSizes });
      }
    }

    setAppliedCoupon(''); // Reset applied coupons
  };

  // Scroll to top on view switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Render routing views helper
  const renderActiveView = () => {
    switch (currentView) {
      case 'shop':
        return (
          <ShopView
            products={currentProducts}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onToggleCompare={handleToggleCompare}
            compareList={compareList}
            addToast={addToast}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailView
            product={selectedProduct}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={(p) => wishlist.some(item => item.id === p.id)}
            onToggleCompare={handleToggleCompare}
            isInCompare={(p) => compareList.some(item => item.id === p.id)}
            addToast={addToast}
            onQuickView={setQuickViewProduct}
          />
        );
      case 'cart':
        return (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onToggleCompare={handleToggleCompare}
            compareList={compareList}
            addToast={addToast}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
          />
        );
      case 'checkout':
        return (
          <CheckoutView
            cart={cart}
            appliedCoupon={appliedCoupon}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            setView={setView}
            addToast={addToast}
          />
        );
      case 'wishlist':
        return (
          <WishlistView
            wishlist={wishlist}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case 'compare':
        return (
          <CompareView
            compareList={compareList}
            onRemoveFromCompare={handleRemoveFromCompare}
            onAddToCart={handleAddToCart}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case 'support':
      case 'faq':
        return <SupportView />;
      case 'home':
      default:
        return (
          <HomeView
            products={currentProducts}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onQuickView={setQuickViewProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onToggleCompare={handleToggleCompare}
            compareList={compareList}
            addToast={addToast}
            setSelectedGender={setSelectedGender}
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900 overflow-x-hidden antialiased">
      
      {/* Dynamic Navigation Header */}
      <Header
        currentView={currentView}
        setView={setView}
        setSelectedProduct={setSelectedProduct}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedGender={setSelectedGender}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main viewport area */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Trust Signal assurances directory */}
      <section className="bg-zinc-50 border-t border-b border-zinc-150 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-700 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">100% Genuine Fabrics</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-semibold">
                Directly sourced premium apparel curated from authentic looms and verified textile mills across India.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-700 flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">14-Day Free Exchange</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-semibold">
                Hassle-free size replacement with free reverse pickup service directly arranged at your doorstep.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-700 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">Free Express Delivery</h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed font-semibold">
                Qualifies for instant free dispatch with bluechip carriers on order sub-payments over ₹999.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer block */}
      <footer className="bg-zinc-950 text-white pt-16 pb-26 md:pb-12 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-zinc-900 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MbaLogo size="sm" />
              <h3 className="text-lg font-black tracking-widest text-white uppercase">
                MBA <span className="text-amber-500 font-medium">KAPDEWALA</span>
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              MBA Kapdewala is a premium clothing house dedicated to bringing you the finest selection of handloomed ethnic wear, luxury traditional fabrics, and modern styles.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-bold text-zinc-300">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-zinc-300">
              <Mail className="w-4 h-4 text-amber-500" />
              <span>care@mbakapdevala.com</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-4">Shop Menu</span>
            <ul className="text-xs font-bold text-zinc-400 space-y-2.5">
              <li><button onClick={() => { setSelectedGender('Men'); setView('shop'); }} className="hover:text-white transition-colors">Men's Wardrobe</button></li>
              <li><button onClick={() => { setSelectedGender('Women'); setView('shop'); }} className="hover:text-white transition-colors">Women's Closet</button></li>
              <li><button onClick={() => { setSelectedGender('Kids'); setView('shop'); }} className="hover:text-white transition-colors">Kids Wear</button></li>
              <li><button onClick={() => { setSelectedGender('Accessories'); setView('shop'); }} className="hover:text-white transition-colors">Bags & Accessories</button></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-4">Help & Info</span>
            <ul className="text-xs font-bold text-zinc-400 space-y-2.5">
              <li><button onClick={() => setView('support')} className="hover:text-white transition-colors">Shipping Logistics</button></li>
              <li><button onClick={() => setView('support')} className="hover:text-white transition-colors">doorstep exchanges</button></li>
              <li><button onClick={() => setView('support')} className="hover:text-white transition-colors">Privacy and Policy</button></li>
              <li><button onClick={() => setView('support')} className="hover:text-white transition-colors">Contact Support</button></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">Our Offices</span>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed flex gap-2">
              <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
              Sector 62, Electronic City, Noida, Uttar Pradesh, 201301, India.
            </p>
          </div>
        </div>

        {/* Payment Partner Badges and copyright bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 text-xs font-bold text-zinc-500">
          <p>© {new Date().getFullYear()} MBA Kapdewala. Handloomed in Delhi, UP & India. All Rights Reserved.</p>
          
          {/* Simulated Payment Icons */}
          <div className="flex items-center gap-2">
            <span className="bg-white/10 text-zinc-300 text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">UPI / GPAY</span>
            <span className="bg-white/10 text-zinc-300 text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">RU-PAY</span>
            <span className="bg-white/10 text-zinc-300 text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">VISA / MC</span>
            <span className="bg-white/10 text-zinc-300 text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">COD QR</span>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Touch Navigation optimized for Mobile layouts */}
      <MobileNav
        currentView={currentView}
        setView={setView}
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
      />

      {/* Quick View Modal dialog */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={quickViewProduct ? wishlist.some(item => item.id === quickViewProduct.id) : false}
      />

      {/* Floating comparison matrices drawer */}
      <CompareModal
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClose={() => setIsCompareOpen(false)}
        isOpen={isCompareOpen}
        onAddToCart={handleAddToCart}
        setView={setView}
      />

      {/* Global notification stack */}
      <Toast toasts={toasts} removeToast={removeToast} />

    </div>
  );
}
