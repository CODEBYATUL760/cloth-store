import { useState, useEffect, useMemo, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, Heart, Search, Menu, X, ArrowRight, 
  ChevronRight, Star, Tag, Info, User, ShieldCheck, 
  MapPin, HelpCircle, FileText, Lock, Plus, Minus,
  RefreshCcw, Grid, List, SlidersHorizontal, LogOut, Check, Sparkles
} from "lucide-react";

import { Product, CartItem, Order, Address, Coupon } from "./types";
import { PRODUCTS_DATABASE, COUPONS } from "./data/products";
import { 
  AboutPage, FAQPage, ContactPage, BlogPage, 
  LookbookPage, LegalPoliciesPage, TrackOrderPage 
} from "./components/Pages";

import AssistantDrawer from "./components/AssistantDrawer";
import BottomNav from "./components/BottomNav";
import SizeGuideModal from "./components/SizeGuideModal";
import AdminPanel from "./components/AdminPanel";

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function App() {
  // Navigation & Routing State
  const [currentTab, setCurrentTab] = useState<string>("home"); // home, shop, product-details, wishlist, cart, checkout, order-success, track-order, about, faq, contact, blog, lookbook, privacy, terms, return, shipping, auth, profile, admin
  const [selectedProductId, setSelectedProductId] = useState<string>("prod-1");
  const [legalDocType, setLegalDocType] = useState<"privacy" | "terms" | "return" | "shipping">("privacy");
  
  // Theme State (Default Luxury Light, toggle support)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // E-commerce Core States
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATABASE);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  // Search & Filtering State (Shop)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(8000);
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Auxiliary UI States
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<Product["category"]>("Men");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Auth Simulation State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string } | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">("login");

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Product Detail Interactive State
  const [detailColor, setDetailColor] = useState<string>("");
  const [detailSize, setDetailSize] = useState<string>("");
  const [detailQty, setDetailQty] = useState<number>(1);
  const [detailImageIdx, setDetailImageIdx] = useState<number>(0);
  const [detailMessage, setDetailMessage] = useState<string>("");

  // Checkout Form State
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("Card");
  const [lastPlacedOrderId, setLastPlacedOrderId] = useState<string>("");

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentTab, selectedProductId]);

  // Set default details attributes when viewing product changes
  const activeProduct = useMemo(() => {
    const prod = products.find(p => p.id === selectedProductId) || products[0];
    if (prod) {
      setDetailColor(prod.colors[0]);
      setDetailSize(prod.sizes[0]);
      setDetailQty(1);
      setDetailImageIdx(0);
      setDetailMessage("");
    }
    return prod;
  }, [selectedProductId, products]);

  // Add recently viewed item
  useEffect(() => {
    if (activeProduct) {
      setRecentlyViewed(prev => {
        const filtered = prev.filter(id => id !== activeProduct.id);
        return [activeProduct.id, ...filtered].slice(0, 5);
      });
    }
  }, [activeProduct]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.discountType === "percentage") {
      return Math.round((subtotal * activeCoupon.value) / 100);
    } else {
      return activeCoupon.value;
    }
  }, [activeCoupon, subtotal]);

  const shippingCharges = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 1499 ? 0 : 99; // Free shipping over ₹1499, else ₹99
  }, [subtotal]);

  const taxAmount = useMemo(() => {
    return Math.round((subtotal - discountAmount) * 0.05); // 5% standard GST
  }, [subtotal, discountAmount]);

  const totalCartAmount = useMemo(() => {
    return subtotal - discountAmount + shippingCharges + taxAmount;
  }, [subtotal, discountAmount, shippingCharges, taxAmount]);

  // Handle wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Add to cart with validation
  const handleAddToCart = (product: Product, size: string, color: string, qty: number) => {
    if (product.stock === 0) {
      setDetailMessage("This luxury item is currently depleted in our inventory.");
      return;
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
      }
    });

    setDetailMessage("Added to your shopping bag.");
    setTimeout(() => setDetailMessage(""), 3000);
  };

  // Remove from cart
  const handleRemoveFromCart = (idx: number) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  // Update cart quantity
  const handleUpdateQuantity = (idx: number, change: number) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[idx].quantity + change;
      if (newQty > 0 && newQty <= updated[idx].product.stock) {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  // Apply promo coupon
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];

    if (!coupon) {
      setCouponError("Invalid promo code.");
      return;
    }

    if (subtotal < coupon.minSpend) {
      setCouponError(`Min spend of $${coupon.minSpend} required.`);
      return;
    }

    setActiveCoupon(coupon);
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
  };

  // Place order
  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `UV-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingCharges,
      tax: taxAmount,
      total: totalCartAmount,
      couponCode: activeCoupon?.code,
      shippingAddress: { ...shippingAddress },
      paymentMethod,
      status: "Placed",
      trackingHistory: [
        { status: "Placed", date: new Date().toISOString().replace("T", " ").substring(0, 16), description: "Order logged into MBA Kapdewala shipment system." }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrderId(orderId);
    setCart([]);
    setActiveCoupon(null);
    setCurrentTab("order-success");
  };

  // Admin handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const history = [...o.trackingHistory];
        if (!history.find(h => h.status === status)) {
          history.unshift({
            status,
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
            description: `Package state updated to ${status}.`
          });
        }
        return { ...o, status, trackingHistory: history };
      }
      return o;
    }));
  };

  // Auth Action
  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (authMode === "forgot") {
      alert("Style recovery instructions transmitted to your email inbox.");
      setAuthMode("login");
      return;
    }

    if (authMode === "signup" && !authName) {
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({
      name: authMode === "signup" ? authName : "Sterling Cooper",
      email: authEmail,
      phone: "+1 415 902 0122"
    });

    // Populate billing address with default values
    setShippingAddress({
      fullName: authMode === "signup" ? authName : "Sterling Cooper",
      phone: "+1 415 902 0122",
      email: authEmail,
      street: "742 Evergreen Terrace",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103"
    });

    setCurrentTab("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentTab("home");
  };

  // Dynamic filter products (Shop page)
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Deep search query
      const matchesSearch = searchQuery === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter (Men, Women, Kids, Footwear, Accessories)
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;

      // Style Filter (Casual, Formal, Sportswear, Winter, Ethnic, etc.)
      const matchesStyle = selectedStyle === "All" || p.subCategory === selectedStyle;

      // Price filter
      const matchesPrice = p.price <= priceRange;

      // Color filter
      const matchesColor = selectedColor === "All" || p.colors.some(c => c.includes(selectedColor));

      // Size filter
      const matchesSize = selectedSize === "All" || p.sizes.includes(selectedSize);

      // Brand filter
      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesStyle && matchesPrice && matchesColor && matchesSize && matchesBrand;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.sku.localeCompare(a.sku); // SKU represents chronological index
      return b.rating * b.price - a.rating * a.price; // popularity mock formula
    });
  }, [products, searchQuery, selectedCategory, selectedStyle, priceRange, selectedColor, selectedSize, selectedBrand, sortBy]);

  // Unique brand/colors for filters
  const filterOptions = useMemo(() => {
    const brandsSet = new Set<string>();
    const colorsSet = new Set<string>();
    const sizesSet = new Set<string>();

    products.forEach(p => {
      brandsSet.add(p.brand);
      p.colors.forEach(c => colorsSet.add(c.split(" ")[0])); // standard prefix
      p.sizes.forEach(s => sizesSet.add(s));
    });

    return {
      brands: Array.from(brandsSet),
      colors: Array.from(colorsSet).slice(0, 8),
      sizes: Array.from(sizesSet).sort()
    };
  }, [products]);

  // Homepage curated grids
  const newArrivals = useMemo(() => products.slice(0, 8), [products]);
  const trendingItems = useMemo(() => products.filter(p => p.rating >= 4.8).slice(0, 8), [products]);
  const featuredCollections = useMemo(() => products.filter(p => p.discount > 20).slice(0, 6), [products]);

  // Navigation page trigger helper
  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentTab("product-details");
    setIsAssistantOpen(false);
  };

  const triggerSearchModal = () => {
    setSearchModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"} font-sans antialiased`}>
      
      {/* HEADER SECTION (Warm, inviting, premium but highly approachable theme) */}
      <header
        id="urban-header"
        className="sticky top-0 z-40 bg-gradient-to-r from-amber-600 to-orange-600 text-white border-b border-orange-700 shadow-md backdrop-blur-md transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="hamburger-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-md text-orange-100 hover:text-white transition-colors"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={triggerSearchModal}
              className="p-1.5 rounded-md text-orange-100 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Friendly Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => setCurrentTab("home")}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <h1 className="font-sans font-black text-xl sm:text-2xl tracking-wide text-white drop-shadow-sm">
              MBA Kapdewala
            </h1>
            <span className="h-2.5 w-2.5 bg-yellow-300 rounded-full inline-block animate-pulse" />
          </div>

          {/* Desktop Navigation Link items */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-medium">
            <button
              onClick={() => { setSelectedCategory("All"); setSelectedStyle("All"); setCurrentTab("shop"); }}
              className={`hover:text-amber-500 transition-colors ${currentTab === "shop" ? "text-amber-500 font-bold" : "text-zinc-100"}`}
            >
              Shop (कपड़े)
            </button>
            <button
              onClick={() => { setSelectedCategory("Men"); setSelectedStyle("All"); setCurrentTab("shop"); }}
              className="hover:text-amber-500 text-zinc-100 transition-colors"
            >
              Men (पुरुष)
            </button>
            <button
              onClick={() => { setSelectedCategory("Women"); setSelectedStyle("All"); setCurrentTab("shop"); }}
              className="hover:text-amber-500 text-zinc-100 transition-colors"
            >
              Women (महिलाएं)
            </button>
            <button
              onClick={() => { setSelectedCategory("Kids"); setSelectedStyle("All"); setCurrentTab("shop"); }}
              className="hover:text-amber-500 text-zinc-100 transition-colors"
            >
              Kids (बच्चे)
            </button>
            <button
              onClick={() => setCurrentTab("lookbook")}
              className={`hover:text-amber-500 transition-colors ${currentTab === "lookbook" ? "text-amber-500 font-bold" : "text-zinc-100"}`}
            >
              Styles (डिज़ाइन)
            </button>
            <button
              onClick={() => setCurrentTab("blog")}
              className={`hover:text-amber-500 transition-colors ${currentTab === "blog" ? "text-amber-500 font-bold" : "text-zinc-100"}`}
            >
              Blog (कहानियां)
            </button>
            <button
              onClick={() => setCurrentTab("about")}
              className="hover:text-amber-500 text-zinc-100 transition-colors"
            >
              About (हमारे बारे में)
            </button>
          </nav>

          {/* Quick utilities: search, assistant, wishlist, cart, account, admin */}
          <div className="flex items-center gap-3">
            {/* Desktop search bar */}
            <div className="hidden lg:relative lg:flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); if (currentTab !== "shop") setCurrentTab("shop"); }}
                placeholder="Search clothes (खोजें)..."
                className="bg-orange-850 border border-orange-700 text-xs rounded-full py-1.5 pl-3.5 pr-8 w-44 focus:w-56 transition-all focus:outline-none focus:border-yellow-300 text-white placeholder-orange-200"
              />
              <Search size={14} className="absolute right-3 text-orange-200" />
            </div>

            {/* AI Assistant Activator (Blinking/Glowing highlight) */}
            <button
              id="ai-assistant-header-btn"
              onClick={() => setIsAssistantOpen(true)}
              className="relative flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border border-yellow-300 text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all font-bold select-none group shadow-sm"
            >
              <Sparkles size={11} className="animate-spin text-orange-700 group-hover:scale-110 transition-transform" style={{ animationDuration: "8s" }} />
              <span className="hidden sm:inline">AI कपड़ा गाइड (AI Guide)</span>
            </button>

            {/* Wishlist counter */}
            <button
              id="header-wishlist-btn"
              onClick={() => setCurrentTab("wishlist")}
              className="relative p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Wishlist"
            >
              <Heart size={20} className={wishlist.length > 0 ? "fill-amber-500 text-amber-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center border border-black">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart counter */}
            <button
              id="header-cart-btn"
              onClick={() => setCurrentTab("cart")}
              className="relative p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Shopping bag"
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center border border-black">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Client Account Link */}
            <button
              id="header-account-btn"
              onClick={() => setCurrentTab(isLoggedIn ? "profile" : "auth")}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title={isLoggedIn ? "My Profile" : "Login / Register"}
            >
              <User size={20} className={isLoggedIn ? "text-amber-500" : ""} />
            </button>

            {/* Admin Backoffice Entry Link */}
            <button
              onClick={() => setCurrentTab("admin")}
              className={`hidden sm:inline-block text-[10px] font-mono tracking-widest px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/30 transition-all ${currentTab === "admin" ? "text-amber-500 border-amber-500/50" : ""}`}
            >
              OFFICE
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            className="fixed inset-0 bg-black z-50 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-8">
                <span className="font-sans tracking-wide text-lg font-black text-white">MBA KAPDEWALA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg uppercase tracking-widest font-medium">
                <button
                  onClick={() => { setSelectedCategory("All"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Shop Catalog
                </button>
                <button
                  onClick={() => { setSelectedCategory("Men"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Men Apparel
                </button>
                <button
                  onClick={() => { setSelectedCategory("Women"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Women Apparel
                </button>
                <button
                  onClick={() => { setSelectedCategory("Kids"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Kids Wear
                </button>
                <button
                  onClick={() => setCurrentTab("lookbook")}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Runway Lookbook
                </button>
                <button
                  onClick={() => setCurrentTab("blog")}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  Style Journal
                </button>
                <button
                  onClick={() => setCurrentTab("about")}
                  className="text-left text-white hover:text-amber-500 transition-colors"
                >
                  About Us (हमारे बारे में)
                </button>
                <button
                  onClick={() => setCurrentTab("admin")}
                  className="text-left text-amber-500 font-mono text-sm tracking-widest"
                >
                  [ADMIN BACKOFFICE]
                </button>
              </div>
            </div>

            {/* Mobile bottom session details */}
            <div className="border-t border-zinc-900 pt-6 text-xs text-zinc-500">
              <p>MBA Kapdewala Fictional Showcase</p>
              <p className="mt-1 font-mono text-[9px]">SUPPORT DIRECT: +91 98765 43210</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE COMPACT SEARCH MODAL */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start pt-20 justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchModalOpen(false)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 p-4 rounded-xl flex items-center"
            >
              <input
                type="text"
                autoFocus
                placeholder="Search premium styles..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); if (currentTab !== "shop") setCurrentTab("shop"); }}
                className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm placeholder-zinc-600"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-zinc-500 hover:text-white"
              >
                <X size={16} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN VIEW CONTENT RENDERING */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        
        {/* VIEW: HOME PAGE */}
        {currentTab === "home" && (
          <div className="space-y-12">
            
            {/* HERO BANNER SECTION (High contrast runway aesthetic) */}
            <section
              id="hero-section"
              className="relative h-[400px] sm:h-[550px] rounded-3xl overflow-hidden flex items-center p-6 sm:p-12 border border-zinc-900 bg-black text-white"
            >
              {/* Background cover image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200"
                  alt="High fashion runway backdrop"
                  className="w-full h-full object-cover opacity-65 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>

              {/* Text copy */}
              <div className="relative z-10 max-w-lg space-y-6">
                <span className="text-amber-500 font-mono text-xs sm:text-sm tracking-widest uppercase block animate-pulse">
                  Now Unveiled: Volume III Capsule
                </span>
                <h2 className="text-3xl sm:text-6xl font-sans tracking-tight leading-none font-medium text-white">
                  METROPOLITAN <br />SARTORIAL
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  Explore Italian cashmere trench coats, tailored mulberry silk slip dresses, and minimal calfskin boots engineered for metropolitan environments.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    id="hero-shop-all-btn"
                    onClick={() => { setSelectedCategory("All"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                    className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-lg transition-all shadow-xl flex items-center gap-1.5"
                  >
                    Explore Catalog <ArrowRight size={14} />
                  </button>
                  <button
                    id="hero-lookbook-btn"
                    onClick={() => setCurrentTab("lookbook")}
                    className="bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-800 text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-lg transition-all backdrop-blur-md"
                  >
                    View Runway Lookbook
                  </button>
                </div>
              </div>
            </section>

            {/* FEATURED CATEGORIES Bento-style Grid */}
            <section id="categories-section">
              <div className="text-center mb-8">
                <span className="text-amber-500 text-[10px] uppercase font-mono tracking-widest">Aesthetic Portals</span>
                <h3 className="text-xl sm:text-2xl font-sans tracking-tight font-medium mt-1">Shop by Curated Division</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "Women", label: "Women's Wear (महिलाएं)", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" },
                  { id: "Men", label: "Men's Wear (पुरुष)", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400" },
                  { id: "Footwear", label: "Footwear (जूते-चप्पल)", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400" },
                  { id: "Accessories", label: "Accessories (सामान)", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400" }
                ].map((cat, i) => (
                  <div
                    key={i}
                    onClick={() => { setSelectedCategory(cat.id); setSelectedStyle("All"); setCurrentTab("shop"); }}
                    className="relative h-60 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-900 shadow-lg"
                  >
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-amber-500 font-bold">Category (कैटेगरी)</span>
                      <h4 className="text-sm font-semibold tracking-wide text-white mt-0.5">{cat.label}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Limited-time Sale Banner (Flash Sale) */}
            <section
              id="flash-sale-section"
              className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 shadow-xl"
            >
              <div>
                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 rounded border border-amber-500/25 font-bold">Limited Special Discount (खास सेल)</span>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">Festival Season Special Sale</h4>
                <p className="text-xs text-zinc-400 font-light mt-1">Enjoy hand-picked quality clothing with exciting discounts up to 40% off. Best Swadeshi clothes at honest prices.</p>
              </div>
              <button
                onClick={() => { setSelectedCategory("All"); setSelectedStyle("All"); setSearchQuery(""); setPriceRange(400); setCurrentTab("shop"); }}
                className="bg-white hover:bg-amber-500 hover:text-black text-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
              >
                Shop Sale Collection
              </button>
            </section>

            {/* CURATED GRID: NEW ARRIVALS */}
            <section id="new-arrivals-section">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-amber-500 text-[10px] uppercase font-mono tracking-widest block">Fresh Styles</span>
                  <h3 className="text-xl sm:text-2xl font-sans tracking-tight font-black">New Clothing Styles (नए कपड़े)</h3>
                </div>
                <button
                  onClick={() => { setSelectedCategory("All"); setSelectedStyle("All"); setCurrentTab("shop"); }}
                  className="text-xs text-zinc-400 hover:text-amber-500 font-semibold tracking-wide flex items-center gap-1.5 transition-colors uppercase font-mono"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {newArrivals.map((prod) => (
                  <div
                    key={prod.id}
                    className="group bg-zinc-950/45 border border-zinc-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {prod.discount > 0 && (
                        <span className="absolute top-3 left-3 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded shadow-md">
                          -{prod.discount}% LUX
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 hover:bg-black text-zinc-400 hover:text-amber-500 border border-zinc-900/60 backdrop-blur-sm transition-all"
                      >
                        <Heart size={14} className={wishlist.includes(prod.id) ? "fill-amber-500 text-amber-500" : ""} />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-medium block mb-1">
                          {prod.category} • {prod.brand}
                        </span>
                        <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-amber-500 transition-colors text-white leading-snug">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star size={10} className="fill-amber-500 text-amber-500" />
                          <span className="text-[10px] font-mono text-zinc-400 font-bold">{prod.rating}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-amber-500 font-mono">{formatPrice(prod.price)}</span>
                          {prod.discount > 0 && (
                            <span className="text-[10px] text-zinc-600 line-through font-mono">{formatPrice(prod.mrp)}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                          className="bg-zinc-900 hover:bg-amber-500 text-zinc-300 hover:text-black border border-zinc-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* REVIEWS GRID (Luxury client feedbacks) */}
            <section id="reviews-section" className="border-t border-zinc-900 pt-10">
              <div className="text-center mb-8">
                <span className="text-amber-500 text-[10px] uppercase font-mono tracking-widest block">Client Feedback</span>
                <h3 className="text-xl sm:text-2xl font-sans tracking-tight font-medium mt-1">Refined Urban Testimonials</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Victoria Sterling", comment: "The velvet fabric weight and sleeve stitching details are outstanding. It represents pure, understated European haute couture.", rating: 5, date: "2 days ago" },
                  { name: "Arthur Pendelton", comment: "Ordered the wool sweater and Chelsea boots. Safe delivery and beautifully packaged. Truly standard-setting customer support.", rating: 5, date: "1 week ago" },
                  { name: "Alessia Conti", comment: "Vogue AI curated a stunning outfit combination for my gallery gala. Sizing guide corresponds perfectly to the tailoring sizes.", rating: 5, date: "3 days ago" }
                ].map((rev, i) => (
                  <div key={i} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, rIdx) => (
                          <Star key={rIdx} size={11} className="fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-900">
                      <span className="text-xs font-semibold text-white">{rev.name}</span>
                      <span className="text-[10px] text-zinc-600 font-mono">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: SHOP CATALOG */}
        {currentTab === "shop" && (
          <div>
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Sidebar Filters */}
              <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-white flex items-center gap-1.5">
                    <SlidersHorizontal size={14} className="text-amber-500" /> Filter Selection
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedStyle("All");
                      setPriceRange(400);
                      setSelectedColor("All");
                      setSelectedSize("All");
                      setSelectedBrand("All");
                      setSearchQuery("");
                    }}
                    className="text-[10px] text-zinc-500 hover:text-amber-500 font-mono uppercase tracking-wider transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Search in Shop */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Keyword Query</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search fabric, style, code..."
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>

                {/* Division Category List */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1.5">Apparel Division</label>
                  {["All", "Men", "Women", "Kids", "Footwear", "Accessories"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded transition-all ${
                        selectedCategory === cat 
                          ? "bg-amber-500 text-black font-semibold" 
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
                      }`}
                    >
                      {cat === "All" ? "All Division Styles" : cat}
                    </button>
                  ))}
                </div>

                {/* Price Range Slider */}
                <div>
                  <div className="flex justify-between text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">
                    <span>Max Price (अधिकतम दाम)</span>
                    <span className="text-amber-500 font-bold">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="199"
                    max="8000"
                    step="100"
                    value={priceRange}
                    onChange={e => setPriceRange(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Colors Checkbox selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Hue Spectrum</label>
                  <div className="flex flex-wrap gap-1">
                    {["All", ...filterOptions.colors].map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`text-[10px] font-mono px-2 py-1 rounded-md border transition-all ${
                          selectedColor === col
                            ? "bg-zinc-900 text-amber-500 border-amber-500/40 font-bold"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-800"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Tailor Size</label>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    {["All", "XS", "S", "M", "L", "XL"].map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`text-[10px] font-mono py-1 rounded border transition-all ${
                          selectedSize === sz
                            ? "bg-amber-500 text-black border-amber-500 font-bold"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Designer Label</label>
                  <select
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 text-xs rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="All">All Designer Labels</option>
                    {filterOptions.brands.map(br => (
                      <option key={br} value={br}>{br}</option>
                    ))}
                  </select>
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="flex-1 space-y-6">
                
                {/* Search Bar header status */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-950 border border-zinc-900 p-4 rounded-xl gap-3">
                  <div className="text-xs text-zinc-400">
                    Showing <span className="font-bold text-white">{filteredProducts.length}</span> high-quality garments
                    {selectedCategory !== "All" && <span> under <span className="text-amber-500 font-sans font-bold uppercase">{selectedCategory}</span></span>}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-zinc-500 font-sans">SORT BY:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded p-1 text-[11px] focus:outline-none focus:border-amber-500/50"
                    >
                      <option value="popular">Popularity (लोकप्रियता)</option>
                      <option value="price-low">Price: Low to High (सस्ता पहले)</option>
                      <option value="price-high">Price: High to Low (महंगा पहले)</option>
                      <option value="rating">Client Rating (रेटिंग)</option>
                      <option value="newest">New Styles (नए कपड़े)</option>
                    </select>
                  </div>
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24 bg-zinc-950/20 border border-zinc-900 rounded-3xl p-6">
                    <SlidersHorizontal className="mx-auto mb-3 text-zinc-600 animate-bounce" size={32} />
                    <h3 className="text-base font-semibold text-white">No matching tailored items found</h3>
                    <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">Adjust your division filters, keyword terms, or price range caps to identify available collections.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.slice(0, 24).map((prod) => (
                      <div
                        key={prod.id}
                        className="group bg-zinc-950/45 border border-zinc-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all flex flex-col justify-between"
                      >
                        <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {prod.discount > 0 && (
                            <span className="absolute top-3 left-3 bg-amber-500 text-black text-[9px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded shadow-md">
                              -{prod.discount}% LUX
                            </span>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 hover:bg-black text-zinc-400 hover:text-amber-500 border border-zinc-900/60 backdrop-blur-sm transition-all"
                          >
                            <Heart size={14} className={wishlist.includes(prod.id) ? "fill-amber-500 text-amber-500" : ""} />
                          </button>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div className="cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-medium block mb-1">
                              {prod.category} • {prod.brand}
                            </span>
                            <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-amber-500 transition-colors text-white leading-snug">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-1 mt-1.5">
                              <Star size={10} className="fill-amber-500 text-amber-500" />
                              <span className="text-[10px] font-mono text-zinc-400 font-bold">{prod.rating}</span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-bold text-amber-500 font-mono">{formatPrice(prod.price)}</span>
                              {prod.discount > 0 && (
                                <span className="text-[10px] text-zinc-600 line-through font-mono">{formatPrice(prod.mrp)}</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleAddToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                              className="bg-zinc-900 hover:bg-amber-500 text-zinc-300 hover:text-black border border-zinc-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded transition-colors"
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-zinc-500 font-mono text-center pt-4">Showing page 1 of catalog. Simulated continuous rendering enabled.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRODUCT DETAILS */}
        {currentTab === "product-details" && activeProduct && (
          <div className="space-y-12">
            <button
              onClick={() => setCurrentTab("shop")}
              className="text-xs text-zinc-400 hover:text-amber-500 flex items-center gap-1 transition-colors font-mono uppercase tracking-wider"
            >
              ← Back to Collection
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              
              {/* Product Media Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl">
                  <img
                    src={activeProduct.images[detailImageIdx] || activeProduct.images[0]}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {activeProduct.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider font-mono px-2.5 py-1 rounded shadow-lg">
                      {activeProduct.discount}% discount
                    </span>
                  )}
                </div>

                {/* Thumbnails row */}
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {activeProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setDetailImageIdx(i)}
                      className={`h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border transition-all ${
                        detailImageIdx === i ? "border-amber-500 scale-102" : "border-zinc-800/80 hover:border-zinc-500"
                      }`}
                    >
                      <img src={img} alt="Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs & buying selectors */}
              <div className="space-y-6">
                <div>
                  <span className="text-amber-500 font-mono text-xs uppercase tracking-widest font-semibold">
                    {activeProduct.brand} • {activeProduct.subCategory}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-sans tracking-tight font-medium text-white mt-1.5 leading-snug">
                    {activeProduct.name}
                  </h1>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">SKU CODE: {activeProduct.sku}</p>
                  
                  {/* Rating display */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className={i < Math.floor(activeProduct.rating) ? "fill-amber-500 text-amber-500" : "text-zinc-700"} />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-400 font-mono font-semibold">({activeProduct.rating} / 5.0 rating)</span>
                  </div>
                </div>

                {/* Pricing row */}
                <div className="flex items-baseline gap-3 pb-4 border-b border-zinc-900">
                  <span className="text-3xl font-bold text-amber-500 font-mono">{formatPrice(activeProduct.price)}</span>
                  {activeProduct.discount > 0 && (
                    <>
                      <span className="text-zinc-500 line-through text-base font-mono">{formatPrice(activeProduct.mrp)}</span>
                      <span className="text-xs text-emerald-400 font-mono font-medium uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Save {formatPrice(activeProduct.mrp - activeProduct.price)}</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {activeProduct.description}
                </p>

                {/* Buying interactive selections */}
                <div className="space-y-4 pt-2">
                  
                  {/* Color circle selection */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Selected Color Accent</label>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.colors.map(col => (
                        <button
                          key={col}
                          onClick={() => setDetailColor(col)}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                            detailColor === col
                              ? "bg-amber-500 text-black border-amber-500 font-semibold"
                              : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-500"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes buttons */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500">Tailor Dimension</label>
                      <button
                        onClick={() => { setSizeGuideCategory(activeProduct.category); setIsSizeGuideOpen(true); }}
                        className="text-[10px] text-amber-500 hover:underline font-mono uppercase tracking-wider"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.sizes.map(sz => (
                        <button
                          key={sz}
                          onClick={() => setDetailSize(sz)}
                          className={`h-10 min-w-10 text-xs font-mono font-semibold rounded border transition-all ${
                            detailSize === sz
                              ? "bg-white text-black border-white"
                              : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">Garment Quantity</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-lg">
                        <button
                          onClick={() => setDetailQty(prev => Math.max(1, prev - 1))}
                          className="p-2 hover:text-amber-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 text-center text-xs font-mono font-bold">{detailQty}</span>
                        <button
                          onClick={() => setDetailQty(prev => Math.min(activeProduct.stock, prev + 1))}
                          className="p-2 hover:text-amber-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="text-xs text-zinc-500">
                        {activeProduct.stock > 0 ? `${activeProduct.stock} units left in stock (बचे हैं)` : "Out of stock (खत्म हो गया)"}
                      </span>
                    </div>
                  </div>

                  {/* BUY & WISHLIST BUTTONS */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleAddToCart(activeProduct, detailSize, detailColor, detailQty)}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-xl"
                    >
                      Add to Bag (थैले में डालें)
                    </button>
                    <button
                      onClick={() => toggleWishlist(activeProduct.id)}
                      className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-850"
                      title="Add to Wishlist"
                    >
                      <Heart size={16} className={wishlist.includes(activeProduct.id) ? "fill-amber-500 text-amber-500" : ""} />
                    </button>
                  </div>

                  {detailMessage && (
                    <p className="text-xs font-semibold text-amber-500 mt-2 text-center animate-pulse">{detailMessage}</p>
                  )}
                </div>

                {/* Specs specs specifications */}
                <div className="border-t border-zinc-900 pt-6 space-y-4">
                  <h4 className="text-[10px] uppercase font-sans tracking-wider text-zinc-400 font-bold">Product Details (कपड़े की जानकारी)</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-zinc-500 block">Fabric (कपड़ा)</span>
                      <span className="text-zinc-300 font-medium">{activeProduct.fabric}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">Care (धोने का तरीका)</span>
                      <span className="text-zinc-300 font-medium">{activeProduct.washCare}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-zinc-500 block">Complimentary Shipping</span>
                      <span className="text-zinc-300 font-medium text-[11px] leading-relaxed block">{activeProduct.deliveryInfo}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* REVIEWS SECTION FOR PRODUCT */}
            <div className="border-t border-zinc-900 pt-10 space-y-6">
              <h3 className="font-sans font-medium text-lg text-white">Client Reviews ({activeProduct.reviews.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProduct.reviews.map((rev) => (
                  <div key={rev.id} className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-white block">{rev.userName}</span>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} size={10} className="fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono">{rev.date}</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">"{rev.comment}"</p>
                    {rev.verified && (
                      <span className="text-[9px] text-emerald-400 font-sans uppercase bg-emerald-500/5 border border-emerald-500/10 px-1.5 py-0.5 rounded inline-block font-semibold">Verified Purchase (असली खरीदार)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RECOMMENDED OUTFITS */}
            <div className="border-t border-zinc-900 pt-10 space-y-6">
              <h3 className="font-sans font-black text-lg text-white">You May Also Like (आपको यह भी पसंद आ सकता है)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products
                  .filter(p => p.category === activeProduct.category && p.id !== activeProduct.id)
                  .slice(0, 4)
                  .map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => navigateToProduct(rec.id)}
                      className="group cursor-pointer bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden p-3 hover:border-amber-500/20 transition-all text-xs"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-2.5">
                        <img src={rec.images[0]} alt={rec.name} className="w-full h-full object-cover group-hover:scale-103 transition-transform" />
                      </div>
                      <h4 className="font-semibold line-clamp-1 group-hover:text-amber-500 transition-colors text-white">{rec.name}</h4>
                      <span className="font-mono text-amber-500 font-bold mt-1 block">{formatPrice(rec.price)}</span>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW: CART PAGE */}
        {currentTab === "cart" && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-sans tracking-tight text-white font-medium">Shopping Bag</h1>

            {cart.length === 0 ? (
              <div className="text-center py-24 bg-zinc-950/20 border border-zinc-900 rounded-2xl p-6">
                <ShoppingBag className="mx-auto text-zinc-600 mb-4 animate-bounce" size={36} />
                <h3 className="text-base font-semibold text-white">Your boutique shopping bag is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1 mb-6">Explore our limited collections or consult Vogue AI to identify standard styles.</p>
                <button
                  onClick={() => setCurrentTab("shop")}
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Items List Column */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-20 w-20 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => navigateToProduct(item.product.id)}>
                          <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white hover:text-amber-500 transition-colors cursor-pointer" onClick={() => navigateToProduct(item.product.id)}>
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">
                            SIZE: {item.selectedSize} • COLOR: {item.selectedColor}
                          </p>
                          <span className="text-xs font-bold font-mono text-amber-500 block mt-1.5">{formatPrice(item.product.price)}</span>
                        </div>
                      </div>

                      {/* Controls qty */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-zinc-900 rounded border border-zinc-800">
                          <button
                            onClick={() => handleUpdateQuantity(idx, -1)}
                            className="p-1.5 text-zinc-400 hover:text-white"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(idx, 1)}
                            className="p-1.5 text-zinc-400 hover:text-white"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(idx)}
                          className="p-1.5 rounded text-zinc-600 hover:text-rose-500 transition-colors"
                          title="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Column */}
                <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl h-fit space-y-6">
                  <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-white border-b border-zinc-900 pb-3">Cart Summary (सामान की सूची)</h3>
                  
                  {/* Promo Form */}
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="block text-[10px] uppercase font-sans text-zinc-500 font-bold">Discount Coupon (कूपन कोड)</label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        placeholder="e.g. WELCOME50"
                        className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2 text-xs uppercase font-mono text-white placeholder-zinc-700 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 hover:text-amber-500 text-xs font-semibold px-3.5 rounded-lg transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-zinc-500 font-mono">{couponError}</p>}
                    
                    {activeCoupon && (
                      <div className="flex items-center justify-between bg-amber-500/5 border border-amber-500/20 rounded p-2 text-[10px] font-mono text-amber-500">
                        <span>COUPON APPLIED: {activeCoupon.code}</span>
                        <button type="button" onClick={handleRemoveCoupon} className="text-zinc-400 hover:text-white"><X size={10} /></button>
                      </div>
                    )}
                  </form>

                  {/* Calculations breakdown */}
                  <div className="space-y-3 text-xs text-zinc-400 font-light border-t border-b border-zinc-900 py-4 font-mono">
                    <div className="flex justify-between">
                      <span>Items Total (कपड़ों का मूल्य)</span>
                      <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-amber-500 font-bold">
                        <span>Coupon Discount (कूपन छूट)</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping Charges (डिलिवरी शुल्क)</span>
                      <span className="text-emerald-400 font-medium">
                        {shippingCharges === 0 ? "FREE Delivery" : formatPrice(shippingCharges)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (टैक्स)</span>
                      <span className="text-white font-medium">{formatPrice(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-900 font-sans">
                      <span>Total Amount (कुल राशि)</span>
                      <span className="text-amber-500 font-mono text-base">{formatPrice(totalCartAmount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTab("checkout")}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xl"
                  >
                    Proceed to Checkout <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* VIEW: CHECKOUT PAGE */}
        {currentTab === "checkout" && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-sans tracking-tight text-white font-black">Secure Checkout (सुरक्षित भुगतान)</h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form Inputs */}
              <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-6">
                
                {/* Shipping address details */}
                <div className="space-y-4">
                  <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-amber-500 border-b border-zinc-900 pb-2">Shipping Address (डिलीवरी का पता)</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-sans text-zinc-500 mb-1 font-bold">Full Name (पूरा नाम)</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.fullName}
                        onChange={e => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        placeholder="e.g. +1 415 901 0212"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">Delivery Street Address</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      placeholder="e.g. Corso Vittorio Emanuele II, 14"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        placeholder="e.g. San Francisco"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">State / Province</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        placeholder="e.g. CA"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-mono text-zinc-500 mb-1">Zip / Postal Code</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.zipCode}
                        onChange={e => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        placeholder="e.g. 94103"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-amber-500 border-b border-zinc-900 pb-2">Bespoke Payment Channel</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { id: "Card", label: "Credit Card (Visa/Mastercard)", desc: "Complimentary secure ledger" },
                      { id: "ApplePay", label: "Digital Wallet Payment", desc: "Express checkout processing" }
                    ].map(pay => (
                      <div
                        key={pay.id}
                        onClick={() => setPaymentMethod(pay.id)}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          paymentMethod === pay.id 
                            ? "bg-amber-500/5 border-amber-500 text-white" 
                            : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <p className="font-semibold">{pay.label}</p>
                        <p className="text-[10px] text-zinc-500 mt-1 font-light">{pay.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Order Summary */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl h-fit space-y-6">
                <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-white border-b border-zinc-900 pb-3">Order Summary (ऑर्डर सारांश)</h3>

                {/* Items preview */}
                <div className="space-y-3.5 max-h-44 overflow-y-auto pr-1">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-zinc-400">
                      <span className="truncate max-w-[150px]">{item.product.name} ({item.quantity}x)</span>
                      <span className="font-mono text-white">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-xs text-zinc-400 font-mono border-t border-b border-zinc-900 py-4">
                  <div className="flex justify-between">
                    <span>Subtotal (मूल्य)</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-amber-500 font-bold">
                      <span>Discount (कूपन छूट)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans text-sm font-bold text-white pt-2 border-t border-zinc-900">
                    <span>Grand Total (कुल देय राशि)</span>
                    <span className="text-amber-500 font-mono text-base">{formatPrice(totalCartAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-xl"
                >
                  Place Order (ऑर्डर करें)
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VIEW: ORDER SUCCESS */}
        {currentTab === "order-success" && (
          <div className="max-w-md mx-auto py-16 text-center space-y-6">
            <div className="mx-auto h-16 w-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center animate-bounce">
              <ShieldCheck size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-wider block">CONSIGNMENT REGISTERED</span>
              <h1 className="text-2xl sm:text-3xl font-sans tracking-tight font-medium text-white">Outfit Successfully Booked</h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our Milan flagship has acknowledged your luxury wardrobe haul. We have triggered the custom gold box packing timeline.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl font-mono text-xs text-left space-y-3 shadow-xl">
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Logistic Code</span>
                <span className="text-amber-500 font-bold">{lastPlacedOrderId}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-900 pt-3">
                <span className="text-zinc-500 uppercase">Estimated Delivery</span>
                <span className="text-white font-semibold">3-5 Business Days</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={() => setCurrentTab("track-order")}
                className="bg-white hover:bg-amber-500 hover:text-black text-black text-xs font-semibold uppercase tracking-wider py-2.5 rounded-lg transition-colors"
              >
                Track Delivery (ऑर्डर ट्रैक करें)
              </button>
              <button
                onClick={() => setCurrentTab("home")}
                className="text-xs text-zinc-500 hover:text-white font-sans uppercase tracking-wider transition-colors pt-2"
              >
                Return to Home (होमपेज पर जाएं)
              </button>
            </div>
          </div>
        )}

        {/* VIEW: WISHLIST VIEW */}
        {currentTab === "wishlist" && (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-sans tracking-tight text-white font-medium">My Private Curations</h1>

            {wishlist.length === 0 ? (
              <div className="text-center py-24 bg-zinc-950/20 border border-zinc-900 rounded-2xl p-6">
                <Heart className="mx-auto text-zinc-600 mb-4 animate-bounce" size={36} />
                <h3 className="text-base font-semibold text-white">Your curation gallery is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1 mb-6">Flag styles with the heart icon while browsing to compile your private outfit coordinate boards.</p>
                <button
                  onClick={() => setCurrentTab("shop")}
                  className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {products
                  .filter(p => wishlist.includes(p.id))
                  .map((prod) => (
                    <div
                      key={prod.id}
                      className="group bg-zinc-950/45 border border-zinc-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/75 hover:bg-black text-amber-500 border border-zinc-900/60 backdrop-blur-sm transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="cursor-pointer" onClick={() => navigateToProduct(prod.id)}>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-medium block mb-1">
                            {prod.category} • {prod.brand}
                          </span>
                          <h4 className="text-xs font-semibold line-clamp-1 group-hover:text-amber-500 transition-colors text-white leading-snug">
                            {prod.name}
                          </h4>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3">
                          <span className="text-sm font-bold text-amber-500 font-mono">{formatPrice(prod.price)}</span>
                          <button
                            onClick={() => handleAddToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                            className="bg-zinc-900 hover:bg-amber-500 text-zinc-300 hover:text-black border border-zinc-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded transition-colors"
                          >
                            + Add Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: AUTHENTICATION (Login / Register) */}
        {currentTab === "auth" && (
          <div className="max-w-md mx-auto py-8">
            <div className="bg-zinc-950 border border-zinc-900 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 text-white">
              <div className="text-center">
                <span className="text-amber-500 font-sans text-[10px] uppercase tracking-widest font-bold">My Account (मेरा अकाउंट)</span>
                <h2 className="text-2xl font-sans tracking-tight font-black mt-1">
                  {authMode === "login" ? "Login (लॉग इन करें)" : authMode === "signup" ? "Register (नया अकाउंट बनाएं)" : "Reset Password (पासवर्ड बदलें)"}
                </h2>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "signup" && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans text-zinc-400 mb-1 font-bold">Your Name (आपका नाम)</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-sans text-zinc-400 mb-1 font-bold">Email Address (ईमेल पता)</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="rahul@gmail.com"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                </div>

                {authMode !== "forgot" && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-sans text-zinc-400 mb-1 font-bold">Password (पासवर्ड)</label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold py-2.5 rounded-lg uppercase tracking-widest transition-colors shadow-lg"
                >
                  {authMode === "login" ? "Sign In to Profile" : authMode === "signup" ? "Complete Registration" : "Transmit Reset Code"}
                </button>
              </form>

              {/* Toggle modes */}
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                {authMode === "login" ? (
                  <>
                    <button onClick={() => setAuthMode("signup")} className="hover:text-amber-500">Create Account</button>
                    <button onClick={() => setAuthMode("forgot")} className="hover:text-amber-500">Forgot Password?</button>
                  </>
                ) : (
                  <button onClick={() => setAuthMode("login")} className="hover:text-amber-500 w-full text-center">Already have a client account? Sign In</button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: CLIENT PROFILE */}
        {currentTab === "profile" && currentUser && (
          <div className="space-y-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 gap-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-sans tracking-wider font-bold">My Profile (मेरा प्रोफाइल)</span>
                <h2 className="text-2xl font-sans tracking-tight font-black text-white mt-1">{currentUser.name}</h2>
                <p className="text-xs text-zinc-400">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-zinc-400 hover:text-amber-500 border border-zinc-850 bg-zinc-950 px-3.5 py-2 rounded-lg transition-all"
              >
                <LogOut size={13} /> Sign Out (लॉग आउट)
              </button>
            </div>

            {/* Past orders timeline list */}
            <div className="space-y-6">
              <h3 className="font-sans font-medium text-lg text-white border-b border-zinc-900 pb-2">My Luxury Haul Ledger</h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-12 border border-zinc-900 rounded-2xl p-4 bg-zinc-900/10">
                  <p className="text-xs text-zinc-500">You haven't checked out any luxury garments during this simulation session yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl shadow-lg space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between text-xs font-mono border-b border-zinc-900 pb-3 gap-2">
                        <div>
                          <span className="text-zinc-500">ORDER CODE:</span>
                          <span className="text-amber-500 font-bold ml-1.5">{ord.id}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-zinc-500">TOTAL:</span>
                            <span className="text-white font-bold ml-1.5">{formatPrice(ord.total)}</span>
                          </div>
                          <div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                              ord.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            }`}>{ord.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-zinc-400 font-light">
                            <span>{item.product.name} ({item.selectedSize}, {item.selectedColor}) • {item.quantity}x</span>
                            <span className="font-mono text-white">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Track order trigger */}
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => { setLastPlacedOrderId(ord.id); setCurrentTab("track-order"); }}
                          className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-850 px-3 py-1.5 rounded-lg transition-colors font-mono uppercase tracking-wider"
                        >
                          View Satellite Timeline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AUXILIARY PAGES IN THE PAGES HELPER */}
        {currentTab === "about" && <AboutPage />}
        {currentTab === "faq" && <FAQPage />}
        {currentTab === "contact" && <ContactPage />}
        {currentTab === "blog" && <BlogPage />}
        {currentTab === "lookbook" && <LookbookPage />}
        {currentTab === "track-order" && <TrackOrderPage orderHistory={orders} />}
        
        {/* LEGAL DOCS */}
        {["privacy", "terms", "return", "shipping"].includes(currentTab) && (
          <LegalPoliciesPage docType={currentTab as any} />
        )}

        {/* VIEW: ADMIN BACKOFFICE */}
        {currentTab === "admin" && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

      </main>

      {/* COMPREHENSIVE NEWSLETTER SIGNUP BANNER */}
      <section className="bg-black text-white border-t border-zinc-900 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-amber-500 font-sans text-[10px] uppercase tracking-widest block font-bold">Newsletter (खबरें और डिस्काउंट)</span>
          <h3 className="text-2xl sm:text-3xl font-sans tracking-tight font-black">Join Our Community (हमसे जुड़ें)</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            Subscribe to our newsletter to get updates on new clothing arrivals, exclusive sales, and a special ₹500 discount coupon code for your first buy.
          </p>

          {newsSuccess ? (
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl max-w-xs mx-auto text-xs text-amber-500 font-sans font-bold">
              ★ बधाई हो! You have subscribed. Use code: <span className="font-bold underline">WELCOME500</span> at checkout.
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setNewsSuccess(true); }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsEmail}
                onChange={e => setNewsEmail(e.target.value)}
                placeholder="Submit your email address..."
                className="flex-1 bg-zinc-950 border border-zinc-900 text-xs rounded-lg py-2.5 px-4 focus:outline-none focus:border-amber-500/50"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider py-2.5 px-6 rounded-lg transition-colors flex-shrink-0"
              >
                Request Admission
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-zinc-950 text-zinc-500 border-t border-zinc-900/60 pt-12 pb-24 md:pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-widest text-white font-extrabold">MBA KAPDEWALA</h4>
            <p className="text-[11px] leading-relaxed font-light text-zinc-400">
              Bringing you the best quality clothing at the most honest and affordable prices. Swadeshi style, ultimate comfort, and beautiful clothing for everyone.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-sans text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Our Pages (मुख्य लिंक)</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setCurrentTab("about")} className="hover:text-amber-500 transition-colors text-left">About Us (हमारे बारे में)</button></li>
              <li><button onClick={() => setCurrentTab("blog")} className="hover:text-amber-500 transition-colors text-left">Style Blog (कहानियां)</button></li>
              <li><button onClick={() => setCurrentTab("lookbook")} className="hover:text-amber-500 transition-colors text-left">Styles (डिज़ाइन)</button></li>
              <li><button onClick={() => setCurrentTab("contact")} className="hover:text-amber-500 transition-colors text-left">Contact Us (संपर्क करें)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-sans text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Customer Help (मदद)</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setCurrentTab("faq")} className="hover:text-amber-500 transition-colors text-left">Help & FAQ (सवाल-जवाब)</button></li>
              <li><button onClick={() => setCurrentTab("track-order")} className="hover:text-amber-500 transition-colors text-left">Track Order (ऑर्डर ट्रैक करें)</button></li>
              <li><button onClick={() => setCurrentTab("admin")} className="hover:text-amber-500 transition-colors text-left">Admin Panel (एडमिन)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-sans text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Policies (नियम)</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => setCurrentTab("privacy")} className="hover:text-amber-500 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentTab("terms")} className="hover:text-amber-500 transition-colors text-left">Terms & Conditions</button></li>
              <li><button onClick={() => setCurrentTab("return")} className="hover:text-amber-500 transition-colors text-left">Returns & Exchange</button></li>
              <li><button onClick={() => setCurrentTab("shipping")} className="hover:text-amber-500 transition-colors text-left">Shipping Policy</button></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-900 text-center font-mono text-[10px] text-zinc-600">
          <p>© 2026 MBA Kapdewala. Best quality daily clothing. Demo website for portfolio presentation purposes only.</p>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenSearch={triggerSearchModal}
      />

      {/* GEMINI AI ASSISTANT PANEL */}
      <AssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        cart={cart}
        wishlist={wishlist}
        currentProduct={activeProduct}
        onNavigateToProduct={navigateToProduct}
      />

      {/* STANDARD SIZE CHART MODAL */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={sizeGuideCategory}
      />

    </div>
  );
}
