import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Compass, MapPin, Phone, Mail, Clock, ShieldCheck, 
  Truck, ArrowRight, HelpCircle, ChevronDown, ChevronUp,
  BookOpen, Eye, User, Calendar, CheckCircle2, Package, Play
} from "lucide-react";
import { BLOG_POSTS, PRODUCTS_DATABASE } from "../data/products";
import { BlogPost, Order } from "../types";

// ==========================================
// ABOUT PAGE
// ==========================================
export function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-12 px-4 text-white"
    >
      <div className="text-center mb-12">
        <span className="text-amber-500 font-sans text-xs tracking-widest uppercase block mb-2">Our Journey (हमारी यात्रा)</span>
        <h1 className="text-3xl sm:text-5xl font-sans tracking-tight font-black mb-6">MBA KAPDEWALA</h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Bringing high-quality, elegant clothing to hard-working people since 2018. Comfortable, authentic styles at honest and affordable pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
            alt="MBA Kapdewala workshop"
            className="rounded-2xl border border-zinc-800 shadow-2xl object-cover h-96 w-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-sans text-amber-500 tracking-wide font-black">Our Principles & Materials (हमारे विचार और कपड़े)</h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            At MBA Kapdewala, we believe garments should be simple, highly durable, and very comfortable. Every fabric in our catalog is selected with care—from premium long-staple cotton to fine soft woolen blends.
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Our clothes are stitched with extra care. By avoiding cheap synthetic blends, we guarantee rich seam strength, comfortable fits, and standard daily durability for everyone.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
            <div>
              <div className="text-lg font-bold text-white font-mono">100%</div>
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Sourced Traceability</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">Limited</div>
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Numbered Batches</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// FAQ PAGE
// ==========================================
export function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: "मेरा ऑर्डर कितने दिनों में आएगा? (How fast will my order arrive?)", a: "हम बहुत तेजी से काम करते हैं! आपका ऑर्डर 3 से 5 दिनों में सुरक्षित तरीके से आपके घर पहुंचा दिया जाएगा। सभी कपड़े बढ़िया पर्यावरण-अनुकूल पैकेजिंग में भेजे जाते हैं।" },
    { q: "क्या मैं कपड़े वापस या बदल सकता हूँ? (What is your return policy?)", a: "हाँ, बिल्कुल! हम 15 दिनों की आसान वापसी और बदलने की सुविधा देते हैं। बस सुनिश्चित करें कि कपड़ों का टैग न निकाला गया हो।" },
    { q: "क्या मुझे कपड़े चुनने में मदद मिल सकती है? (Can I get styling suggestions?)", a: "हाँ! नीचे दिए गए 'AI Guide' बटन पर क्लिक करके आप हमारे कपड़ा सहायक से बात कर सकते हैं। वह आपको सही साइज और बेहतरीन मैच चुनने में मदद करेगा।" },
    { q: "ये कपड़े कहाँ बनाए जाते हैं? (Where are the products made?)", a: "हमारे सभी उत्पाद गर्व के साथ भारत में बनाए जाते हैं। हम बेहतरीन भारतीय कारीगरों और धागों का उपयोग करते हैं जिससे देश के हुनर को बढ़ावा मिले।" }
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-sans tracking-tight font-black mb-2">Frequently Asked Questions (आपके सवाल-जवाब)</h1>
        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Quick Help Center</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="border border-zinc-900 bg-zinc-950 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-zinc-200">{faq.q}</span>
                {isOpen ? <ChevronUp size={16} className="text-amber-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
              </button>
              {isOpen && (
                <div className="p-4 bg-zinc-900/10 border-t border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// CONTACT PAGE
// ==========================================
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-sans font-black tracking-tight mb-2">Contact Us (हमसे संपर्क करें)</h1>
        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Reach out to MBA Kapdewala</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-sans font-bold text-base text-amber-500">Our Head Office (मुख्य कार्यालय)</h3>
            
            <div className="flex items-start gap-3 text-xs text-zinc-300">
              <MapPin size={16} className="text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">MBA Kapdewala Office</p>
                <p>Sector 62, Noida</p>
                <p>Uttar Pradesh, India - 201301</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <Phone size={16} className="text-zinc-500" />
              <span>+39 02 8872 901</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <Mail size={16} className="text-zinc-500" />
              <span>concierge@urbanvogue.com</span>
            </div>

            <div className="flex items-start gap-3 text-xs text-zinc-300">
              <Clock size={16} className="text-zinc-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white">Boutique Hours</p>
                <p>Mon - Sat: 10:00 - 19:30</p>
                <p>Sunday: Closed for private fittings</p>
              </div>
            </div>
          </div>

          {/* Google Maps placeholder */}
          <div className="h-44 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
            <Compass className="text-amber-500 animate-spin mb-2" size={24} style={{ animationDuration: "12s" }} />
            <p className="text-xs text-white font-medium">Milano Flagship Interactive Map</p>
            <p className="text-[10px] text-zinc-600 mt-1">Satellite coordinate simulation active</p>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <CheckCircle2 size={44} className="text-amber-500 mb-4 animate-bounce" />
              <h3 className="text-lg font-medium text-white">Consultation Requested</h3>
              <p className="text-xs text-zinc-400 max-w-xs mt-2">
                Our bespoke concierge team has logged your query. An assistant will contact you within 2 business hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-sans font-medium text-sm uppercase tracking-wider text-zinc-400 font-mono border-b border-zinc-900 pb-2">Send Secure Inquiry</h3>
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-zinc-400 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sterling Cooper"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. concierge@cooper.com"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-zinc-400 mb-1">Consultation Details</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Inquire about custom fittings, wedding styling, or specific sizes..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-lg p-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold py-2.5 rounded-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
              >
                Send Message <ArrowRight size={12} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// BLOG PAGE
// ==========================================
export function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-white">
      {selectedPost ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs text-zinc-400 hover:text-amber-500 mb-6 flex items-center gap-1.5 transition-colors font-mono uppercase tracking-wider"
          >
            ← Back to Editorial List
          </button>
          
          <div className="mb-6">
            <span className="bg-amber-500/15 text-amber-500 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-amber-500/20">
              {selectedPost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-sans font-medium tracking-tight mt-3 mb-2">{selectedPost.title}</h1>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
              <span className="flex items-center gap-1"><User size={12} /> {selectedPost.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>
          </div>

          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-zinc-850 mb-8 shadow-2xl"
            referrerPolicy="no-referrer"
          />

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line space-y-4">
            {selectedPost.content}
          </div>
        </motion.div>
      ) : (
        <div>
          <div className="text-center mb-12">
            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest block mb-2">Aesthetic & Curation</span>
            <h1 className="text-3xl sm:text-4xl font-sans font-medium tracking-tight">The Vogue Journal</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                onClick={() => setSelectedPost(post)}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-amber-500 text-[9px] uppercase font-mono px-2 py-0.5 rounded border border-zinc-800">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold group-hover:text-amber-500 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </div>
                <div className="p-5 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{post.date}</span>
                  <span className="text-amber-500 group-hover:underline flex items-center gap-1 font-semibold">
                    Read Article <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// LOOKBOOK PAGE
// ==========================================
export function LookbookPage() {
  const lookbookItems = [
    { title: "Metropolitan Nomad", subtitle: "Urban streetwear utility", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600" },
    { title: "Sartorial Nocturne", subtitle: "Velvet textures & evening drapes", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" },
    { title: "Silent Cashmere", subtitle: "Subtle neutral woolen knitwear", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" },
    { title: "Mulberry Solitude", subtitle: "Fine flowing satin gowns", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-white">
      <div className="text-center mb-12">
        <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest block mb-2">Editorial Portfolio</span>
        <h1 className="text-3xl sm:text-5xl font-sans tracking-tight font-medium">Vol. III Lookbook</h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">Summer-Autumn Bespoke Runway Capsule</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {lookbookItems.map((item, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl border border-zinc-900 shadow-2xl">
            <div className="h-[450px] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay description */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end h-40">
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500">Editorial Capsule</span>
              <h3 className="text-lg font-medium text-white tracking-wide mt-1">{item.title}</h3>
              <p className="text-xs text-zinc-400 font-light mt-1">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// LEGAL POLICIES PAGE
// ==========================================
export function LegalPoliciesPage({ docType }: { docType: "privacy" | "terms" | "return" | "shipping" }) {
  const docs = {
    privacy: {
      title: "Privacy Policy (गोपनीयता नीति)",
      text: `आपकी गोपनीयता हमारे लिए सबसे महत्वपूर्ण है। MBA Kapdewala में आपकी जानकारी पूरी तरह सुरक्षित है।
      
      हम सिर्फ आपकी डिलीवरी और संपर्क के लिए आपका नाम, पता और ईमेल सुरक्षित रखते हैं। हम आपकी जानकारी कभी किसी के साथ साझा या बेचते नहीं हैं। आप जब चाहें अपना अकाउंट बंद कर सकते हैं।`
    },
    terms: {
      title: "Terms & Conditions (नियम और शर्तें)",
      text: `यह एक डेमो वेबसाइट है जिसे प्रदर्शन (Portfolio) के उद्देश्य से बनाया गया है।
      
      इस वेबसाइट पर उपलब्ध नाम 'MBA Kapdewala', तस्वीरें, डिस्काउंट कूपन और सभी उत्पाद केवल डेमो दिखाने के लिए हैं। कोई भी असली पेमेंट या लेन-देन यहाँ नहीं होता है।`
    },
    return: {
      title: "Returns & Exchanges (आसान वापसी नीति)",
      text: `हम अपने ग्राहकों के भरोसे का सम्मान करते हैं। इसलिए हम 15 दिनों की आसान वापसी और एक्सचेंज की सुविधा देते हैं।
      
      वापसी के लिए सुनिश्चित करें कि कपड़े पहने न गए हों, धोए न गए हों और उनका ओरिजिनल टैग सुरक्षित हो। आप अपने प्रोफाइल से सीधे वापसी का अनुरोध कर सकते हैं और हमारा पार्टनर आपके घर आकर पार्सल पिकअप कर लेगा।`
    },
    shipping: {
      title: "Shipping Policy (डिलीवरी नीति)",
      text: `हम भारत के कोने-कोने में बहुत तेजी से डिलीवरी करते हैं।
      
      ₹1,499 से ऊपर के सभी ऑर्डर्स पर डिलीवरी बिल्कुल फ्री है! उससे कम के ऑर्डर्स पर केवल ₹99 डिलीवरी चार्ज लगता है। आपके कपड़े सुरक्षित, वाटरप्रूफ इको-फ्रेंडली पैकेजिंग में भेजे जाते हैं और 3-5 दिनों में आपके पास पहुँच जाते हैं।`
    }
  };

  const selected = docs[docType];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <h1 className="text-2xl font-sans tracking-tight font-medium mb-4 text-amber-500">{selected.title}</h1>
      <p className="text-xs text-zinc-500 uppercase font-mono tracking-wider mb-6 border-b border-zinc-900 pb-2">Last Updated: July 2026</p>
      <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
        {selected.text}
      </div>
    </div>
  );
}

// ==========================================
// TRACK ORDER (SIMULATOR)
// ==========================================
export function TrackOrderPage({ orderHistory }: { orderHistory: Order[] }) {
  const [trackId, setTrackId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSearchedOrder(null);

    const match = orderHistory.find(o => o.id.toLowerCase() === trackId.trim().toLowerCase());
    if (match) {
      setSearchedOrder(match);
    } else if (trackId.trim()) {
      // Create a simulated order for tracking demo if they put a random code
      setErrorMsg("Order ID not found in current session. Try inserting one of your order IDs or insert UV-DEMO-777 to simulate a transit timeline.");
      if (trackId.trim().toUpperCase() === "UV-DEMO-777") {
        setErrorMsg("");
        setSearchedOrder({
          id: "UV-DEMO-777",
          date: "2026-07-16",
          items: [],
          subtotal: 189,
          discount: 0,
          shipping: 0,
          tax: 15,
          total: 204,
          shippingAddress: {
            fullName: "Regina Phalange",
            phone: "+1 415 901 021",
            email: "regina@example.com",
            street: "742 Evergreen Terrace",
            city: "San Francisco",
            state: "CA",
            zipCode: "94103"
          },
          paymentMethod: "Credit Card (Visa)",
          status: "Shipped",
          trackingHistory: [
            { status: "Shipped", date: "2026-07-17 14:00", description: "Parcel handed over to fast delivery courier partner." },
            { status: "Processing", date: "2026-07-16 11:30", description: "Outfit carefully checked, folded, and packed safely in premium eco-friendly MBA Kapdewala packing." },
            { status: "Placed", date: "2026-07-16 09:15", description: "Order received by MBA Kapdewala shipment system." }
          ]
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-sans tracking-tight font-black mb-1 flex items-center justify-center gap-2">
          Track Delivery Status (ऑर्डर ट्रैकिंग)
        </h1>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Live Shipment Transit Timeline</p>
      </div>

      {/* Tracker input */}
      <form onSubmit={handleTrack} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl mb-8 space-y-4 shadow-xl">
        <p className="text-xs text-zinc-400">
          Insert your order identifier (e.g. <span className="font-mono text-amber-500">UV-DEMO-777</span> or one from your profile orders list) to locate package location.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            required
            value={trackId}
            onChange={e => setTrackId(e.target.value)}
            placeholder="e.g. UV-DEMO-777"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 uppercase font-mono"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Track Parcel
          </button>
        </div>
        {errorMsg && <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">{errorMsg}</p>}
      </form>

      {/* Search results */}
      {searchedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-xl space-y-6"
        >
          {/* Summary header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 gap-2">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider block">Currently Tracking:</span>
              <span className="text-sm font-semibold font-mono text-amber-500">{searchedOrder.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider block text-left sm:text-right">Fulfillment Code:</span>
              <span className="text-xs font-mono text-white text-left sm:text-right block">{searchedOrder.status}</span>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative pl-6 border-l border-zinc-850 space-y-6">
            {searchedOrder.trackingHistory.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <span className={`absolute -left-8.5 top-0.5 h-5 w-5 rounded-full border flex items-center justify-center ${
                  idx === 0 
                    ? "bg-amber-500 border-black text-black animate-pulse" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                }`}>
                  {idx === 0 ? <CheckCircle2 size={12} /> : <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />}
                </span>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold tracking-wide uppercase font-mono ${idx === 0 ? "text-amber-500" : "text-zinc-400"}`}>
                      {step.status}
                    </span>
                    <span className="text-[9px] text-zinc-600 font-mono">{step.date}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ship destination info */}
          <div className="border-t border-zinc-900 pt-4 bg-zinc-900/15 p-4 rounded-xl space-y-2">
            <h4 className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">Consignment Destination</h4>
            <div className="text-xs text-zinc-300">
              <p className="font-semibold text-white">{searchedOrder.shippingAddress.fullName}</p>
              <p className="font-light">{searchedOrder.shippingAddress.street}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
