import { Product, Review } from "../types";

// Premium Unsplash fashion images, optimized for a modern premium Indian menswear clothing showroom
const IMAGES = {
  kurta: [
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615243450985-3876d9aff4db?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=600"
  ],
  sherwani: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615243450985-3876d9aff4db?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600"
  ],
  nehru: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1615243450985-3876d9aff4db?auto=format&fit=crop&q=80&w=600"
  ],
  suits: [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600"
  ],
  shirts: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600"
  ],
  trousers: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600"
  ],
  accessories: [
    "https://images.unsplash.com/photo-1624222247344-550fb8ec5519?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600"
  ]
};

const BASE_REVIEWS: Review[] = [
  { id: "r-1", userName: "Amit Sharma (Bhopal)", rating: 5, date: "2026-06-14", comment: "The clothing material is absolutely amazing. The fitting is also perfect. The quality is just as excellent as their MP Nagar showroom.", verified: true },
  { id: "r-2", userName: "Rajesh Indore", rating: 5, date: "2026-06-18", comment: "Perfect groom look. The Banarasi silk material feels premium and rich. Totally worth the money.", verified: true },
  { id: "r-3", userName: "Vikram Bundela", rating: 4, date: "2026-07-01", comment: "Very good fit. Quick delivery in Indore within 2 days. The color was slightly brighter than photo but quality is premium.", verified: true },
  { id: "r-4", userName: "Deepak Patidar", rating: 5, date: "2026-07-10", comment: "Bought a sherwani for my wedding and everyone praised it highly. MBA Kapdewala collections are always the best.", verified: true }
];

// Fictional base catalog of premium Indian clothing items
const productBases = [
  // Kurta Pyjama (Festival & Wedding Collection)
  {
    name: "Royal Banarasi Silk Kurta Pyjama",
    category: "Kurta Pyjama",
    subCategory: "Festival Special",
    basePrice: 1599,
    images: IMAGES.kurta,
    fabric: "Banarasi Silk Blend",
    washCare: "Dry Clean Only",
    features: ["Elegant Mandarin Collar", "Intricate zari neck embroidery", "Comes with premium cotton pyjama", "Perfect for festival and sangeet night"],
    tags: ["ethnic", "festival", "kurta", "wedding", "silk"]
  },
  {
    name: "Classic Lucknowi Chikankari Kurta",
    category: "Kurta Pyjama",
    subCategory: "Festival Special",
    basePrice: 1299,
    images: IMAGES.kurta,
    fabric: "100% Pure Georgette Cotton",
    washCare: "Gentle Hand Wash or Dry Clean",
    features: ["Handcrafted Lucknowi work", "Soft interior cotton lining", "Comfortable relaxed fit", "Best paired with churidar or denim"],
    tags: ["ethnic", "festival", "lucknowi", "cotton", "casual"]
  },
  {
    name: "Premium Khadi Cotton Comfort Kurta",
    category: "Kurta Pyjama",
    subCategory: "Daily Wear",
    basePrice: 899,
    images: IMAGES.kurta,
    fabric: "100% Handloom Organic Khadi Cotton",
    washCare: "Machine Wash Cold, Shade Dry",
    features: ["Highly breathable fabric", "Wooden coconut buttons", "Contemporary slim fit design", "Perfect for summer office wear"],
    tags: ["ethnic", "khadi", "cotton", "office", "comfortable"]
  },
  {
    name: "Jacquard Silk Pathani Suit",
    category: "Kurta Pyjama",
    subCategory: "Festival Special",
    basePrice: 1899,
    images: IMAGES.kurta,
    fabric: "Jacquard Art Silk",
    washCare: "Dry Clean Recommended",
    features: ["Stylish pathani collar", "Front pocket details", "Comes with free-flowing salwar pants", "Rich textured fabric pattern"],
    tags: ["pathani", "ethnic", "festival", "jacquard"]
  },

  // Sherwani & Indo-Western (Wedding Collection)
  {
    name: "Groom's Special Maharaja Sherwani",
    category: "Sherwani & Indo-Western",
    subCategory: "Groom's Sherwani",
    basePrice: 7499,
    images: IMAGES.sherwani,
    fabric: "Raw Silk with Velvet Patches",
    washCare: "Dry Clean Only",
    features: ["Handcrafted heavy zardozi work", "Royal velvet borders", "Includes matching maroon safa fabric and dupatta", "Tailored fit for grooms"],
    tags: ["wedding", "groom", "sherwani", "royal", "heavy"]
  },
  {
    name: "Modern Indo-Western Achkan Suit",
    category: "Sherwani & Indo-Western",
    subCategory: "Indo-Western",
    basePrice: 4999,
    images: IMAGES.sherwani,
    fabric: "Premium Jute Silk Blend",
    washCare: "Dry Clean Only",
    features: ["Asymmetrical modern button cut", "Complementary designer pocket square", "Pairs excellently with slim trousers", "Excellent for reception and cocktails"],
    tags: ["wedding", "indo-western", "achkan", "modern", "premium"]
  },
  {
    name: "Velvet Royal Bandhgala Jodhpuri Suit",
    category: "Sherwani & Indo-Western",
    subCategory: "Premium Achkan",
    basePrice: 5499,
    images: IMAGES.sherwani,
    fabric: "Micro-Velvet Premium",
    washCare: "Dry Clean Only",
    features: ["Classic closed-neck bandhgala", "Silver embossed luxury buttons", "Satin inner lining for premium feel", "Perfect luxury wedding attire"],
    tags: ["wedding", "bandhgala", "jodhpuri", "velvet", "royal"]
  },

  // Nehru Jackets & Koti (Festival & Wedding Collection)
  {
    name: "Premium Silk Nehru Jacket",
    category: "Nehru Jackets & Koti",
    subCategory: "Silk Nehru Jacket",
    basePrice: 1199,
    images: IMAGES.nehru,
    fabric: "Banarasi Art Silk",
    washCare: "Dry Clean Only",
    features: ["Elegant woven flower pattern", "Sleek pocket detailing", "Branded metallic buttons", "Pairs beautifully with any plain kurta"],
    tags: ["nehru jacket", "ethnic", "koti", "festival", "wedding"]
  },
  {
    name: "Khadi Modi Jacket",
    category: "Nehru Jackets & Koti",
    subCategory: "Modi Jacket",
    basePrice: 999,
    images: IMAGES.nehru,
    fabric: "Pure Handwoven Khadi",
    washCare: "Gentle Hand Wash",
    features: ["Classic Modi collar shape", "Matte wooden button elements", "Three functional outer pockets", "Great for formal and social meets"],
    tags: ["modi jacket", "khadi", "office", "formal", "ethnic"]
  },
  {
    name: "Designer Floral Print Koti",
    category: "Nehru Jackets & Koti",
    subCategory: "Designer Koti",
    basePrice: 1499,
    images: IMAGES.nehru,
    fabric: "Soft Linen Silk",
    washCare: "Dry Clean Recommended",
    features: ["HD digital floral print design", "Extremely lightweight and breathable", "Contrast color inside lining", "Perfect modern festival accessory"],
    tags: ["koti", "floral", "festival", "modern", "casual"]
  },

  // Suits & Blazers (Wedding & Office Wear)
  {
    name: "Italian Wool Italian-Cut Suit",
    category: "Suits & Blazers",
    subCategory: "Designer Suit",
    basePrice: 5999,
    images: IMAGES.suits,
    fabric: "80% Italian Wool, 20% Polyester",
    washCare: "Dry Clean Only",
    features: ["Slim notch lapel design", "Double vent backend", "Comes with trouser and blazer coat", "Incredibly sharp corporate or wedding look"],
    tags: ["suit", "formal", "office", "wedding", "wool"]
  },
  {
    name: "Premium Club Velvet Blazer",
    category: "Suits & Blazers",
    subCategory: "Formal Blazer",
    basePrice: 2999,
    images: IMAGES.suits,
    fabric: "Ultra Soft Premium Velvet",
    washCare: "Dry Clean Only",
    features: ["Satin shawl collar lapel", "Single button designer closure", "Double inner security pockets", "Perfect fit for party wear"],
    tags: ["blazer", "velvet", "partywear", "wedding", "modern"]
  },
  {
    name: "Linen Summer Breeze Blazer",
    category: "Suits & Blazers",
    subCategory: "Formal Blazer",
    basePrice: 2499,
    images: IMAGES.suits,
    fabric: "100% Organic Pure Linen",
    washCare: "Dry Clean Preferred",
    features: ["Unstructured casual fit shoulders", "Lightweight half-liner", "Breathable organic feel", "Perfect smart casual look"],
    tags: ["blazer", "linen", "casual", "summer", "office"]
  },

  // Shirts & T-shirts (Office Wear & Daily Premium)
  {
    name: "Premium Egyptian Giza Cotton Shirt",
    category: "Shirts & T-shirts",
    subCategory: "Formal Shirts",
    basePrice: 999,
    images: IMAGES.shirts,
    fabric: "100% Egyptian Giza Cotton",
    washCare: "Machine Wash Warm, Iron on High",
    features: ["Superfine 120s thread count", "Crisp semi-cutaway collar", "Lustrous white look", "Ideal for daily high-profile office meetings"],
    tags: ["shirt", "formal", "giza", "cotton", "office"]
  },
  {
    name: "Pure Linen Casual Button-Down",
    category: "Shirts & T-shirts",
    subCategory: "Formal Shirts",
    basePrice: 1199,
    images: IMAGES.shirts,
    fabric: "100% French Linen Yarn",
    washCare: "Machine Wash Cold, Hang Dry",
    features: ["Breathable lightweight texture", "Button-down collar styling", "Slim fit curved hem", "Dries super quickly"],
    tags: ["shirt", "casual", "linen", "summer", "premium"]
  },
  {
    name: "Signature Pique Mercerized Polo",
    category: "Shirts & T-shirts",
    subCategory: "Polo T-shirts",
    basePrice: 699,
    images: IMAGES.shirts,
    fabric: "Mercerized Pique Cotton",
    washCare: "Machine Wash Cold with Similar Colors",
    features: ["Elegant rib-knit collar and cuffs", "High-retention premium colors", "Subtle MBA embroidered emblem", "Ultimate smart casual look"],
    tags: ["polo", "t-shirt", "casual", "mercerized", "premium"]
  },

  // Trousers & Chinos (Office & Daily Premium)
  {
    name: "Premium Super-Stretch Chino Trousers",
    category: "Trousers & Chinos",
    subCategory: "Premium Chinos",
    basePrice: 1199,
    images: IMAGES.trousers,
    fabric: "97% Combed Cotton, 3% Lycra Spandex",
    washCare: "Machine Wash Cold, Iron Medium",
    features: ["Remarkable 4-way flexibility", "Inner grip waistband to keep shirts tucked", "Premium YKK metal zip fly", "Sleek flat-front styling"],
    tags: ["chinos", "trousers", "formal", "office", "casual"]
  },
  {
    name: "Classic Italian Fit Formal Trousers",
    category: "Trousers & Chinos",
    subCategory: "Formal Trousers",
    basePrice: 1099,
    images: IMAGES.trousers,
    fabric: "Poly-Viscose Premium Blend",
    washCare: "Machine Wash Warm, Steam Iron Only",
    features: ["Slightly tapered modern silhouette", "Wrinkle-resistant smart fabric", "Double functional back welt pockets", "Highly suitable for executive wear"],
    tags: ["trousers", "formal", "office", "wrinkle-free"]
  },
  {
    name: "Salvage Denim Indigo Jeans",
    category: "Trousers & Chinos",
    subCategory: "Premium Jeans",
    basePrice: 1499,
    images: IMAGES.trousers,
    fabric: "Raw Selvedge Denim Cotton Stretch",
    washCare: "Wash Inside Out Cold, Minimal Detergent",
    features: ["Deep authentic indigo dye", "Heavy-duty brass rivets", "Custom leather waistband patch", "Molds to your body shape over time"],
    tags: ["jeans", "denim", "indigo", "casual", "rugged"]
  },

  // Accessories (Traditional & Modern accents)
  {
    name: "Handcrafted Pure Leather Mojaris",
    category: "Accessories",
    subCategory: "Mojaris & Juttis",
    basePrice: 1299,
    images: IMAGES.accessories,
    fabric: "100% Genuine Goat Leather",
    washCare: "Wipe with Dry Cloth, Keep Away from Water",
    features: ["Stitched by local Madhya Pradesh artisans", "Cushioned memory foam inner padding", "Elegant pointed rajputana tip", "Perfect companion for Sherwanis"],
    tags: ["mojari", "juttis", "shoes", "wedding", "leather"]
  },
  {
    name: "Banarasi Silk Royal Safa & Turban",
    category: "Accessories",
    subCategory: "Turban & Safa",
    basePrice: 899,
    images: IMAGES.accessories,
    fabric: "Woven Silk Brocade",
    washCare: "Dry Clean Only",
    features: ["Pre-stitched ready-to-wear comfort", "Embellished with royal stone kalgi", "Traditional Bhopal-style drapes", "Instant royal appeal for weddings"],
    tags: ["safa", "turban", "pagri", "wedding", "royal"]
  },
  {
    name: "Premium Full-Grain Leather Formal Belt",
    category: "Accessories",
    subCategory: "Premium Belts",
    basePrice: 699,
    images: IMAGES.accessories,
    fabric: "Genuine Full-Grain Cow Leather",
    washCare: "Apply Specialized Leather Cream",
    features: ["Solid brass micro-adjust auto buckle", "Reversible dual colors: Black & Tan", "Scratch-resistant buckle finish", "Handcrafted premium stitching"],
    tags: ["belt", "leather", "formal", "office", "accessory"]
  }
];

// Curated list of traditional/modern brands for local showroom look
const BRANDS = ["MBA Kapdewala", "Rajputana Sartorial", "Malwa Handloom", "Swadeshi Premium", "Utsav Heritage", "Indore Club Shirts"];

const SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];

const COLORS = [
  "Royal Maroon", "Navy Blue", "Classic Ivory", "Golden Amber",
  "Forest Green", "Pitch Black", "Tan Brown", "Mustard Yellow",
  "Sage Green", "Charcoal Gray", "Wine Burgundy", "Midnight Blue"
];

// Generate exactly 300 highly polished products
export function generateProducts(): Product[] {
  const list: Product[] = [];
  const itemsNeeded = 300;

  for (let i = 0; i < itemsNeeded; i++) {
    const base = productBases[i % productBases.length];
    const index = Math.floor(i / productBases.length); // cycles completed
    
    const brand = BRANDS[i % BRANDS.length];
    
    // Create unique variations in the name
    let name = base.name;
    let category = base.category;
    let subCategory = base.subCategory;
    let fabric = base.fabric;
    let features = [...base.features];
    let images = base.images;
    let basePriceINR = base.basePrice;

    // Mutate properties for higher indices to make products distinct
    if (index > 0) {
      const adjectives = ["Premium", "Heritage", "Sartorial", "Royal", "Bespoke", "Exclusive", "Vintage", "Shahi", "Elite", "Malwa Special", "Maharaja", "Classic"];
      const adj = adjectives[(index + i) % adjectives.length];
      name = `${adj} ${base.name}`;
      
      // Vary prices realisticly
      basePriceINR = Math.round(base.basePrice * (0.85 + (i % 15) * 0.03));
    }

    // Ensure price is rounded and nice (e.g. ends in 49, 99)
    let price = Math.max(299, Math.round(basePriceINR / 100) * 100 - 1);
    if (price % 100 === 0) price -= 1; // get 999 style prices

    // Determine MRP (Higher than price for dynamic discount look)
    const givesDiscount = i % 4 !== 0; // 3 out of 4 items have discounts
    const discount = givesDiscount ? (10 + (i % 6) * 5) : 0;
    
    let mrp = price;
    if (discount > 0) {
      const rawMrp = Math.round((price * 100) / (100 - discount));
      mrp = Math.round(rawMrp / 100) * 100 - 1;
    }
    if (mrp <= price) {
      mrp = price + 300;
    }

    // Colors selector
    const startColor = i % COLORS.length;
    const itemColors = [
      COLORS[startColor],
      COLORS[(startColor + 2) % COLORS.length]
    ];
    if (i % 3 === 0) {
      itemColors.push(COLORS[(startColor + 4) % COLORS.length]);
    }

    // Sizes
    const itemSizes = category === "Accessories" ? ["One Size"] : SIZES;

    // SKUs
    const sku = `MBA-M-${category.substring(0, 2).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;

    // Grab 4 images per product (3-6 required, let's give 4 images to make excellent sliders)
    const finalImages = [
      images[i % images.length],
      images[(i + 1) % images.length],
      images[(i + 2) % images.length],
      images[(i + 3) % images.length]
    ];

    // Stock count
    const stock = (i % 14 === 0) ? 0 : (5 + (i % 35));

    // Rating
    const rating = parseFloat((4.1 + (i % 10) * 0.1).toFixed(1));

    // Reviews generator
    const reviews: Review[] = BASE_REVIEWS.map((rev, revIdx) => ({
      ...rev,
      id: `rev-${i}-${revIdx}`,
      rating: Math.min(5, Math.max(3, rev.rating + (i % 2 === 0 ? 0 : -1)))
    }));

    // Generate tags
    const tags = [
      category.toLowerCase(),
      subCategory.toLowerCase(),
      brand.toLowerCase(),
      "mba",
      "mens wear",
      "bhopal",
      "indore",
      ...base.tags
    ];

    // Distribute into Home Page sections dynamically using boolean flags
    const isFestival = category === "Kurta Pyjama" || category === "Nehru Jackets & Koti" || base.tags.includes("festival");
    const isWedding = category === "Sherwani & Indo-Western" || base.tags.includes("wedding");
    const isOfficeWear = category === "Suits & Blazers" || subCategory.includes("Formal") || base.tags.includes("office");
    const isBestSeller = i % 5 === 0;
    const isTrending = i % 6 === 1;
    const isNewArrival = i % 4 === 2;
    const isSeasonCollection = category === "Shirts & T-shirts" || category === "Trousers & Chinos";

    list.push({
      id: `prod-${i + 1}`,
      sku,
      name,
      category,
      subCategory,
      brand,
      price,
      mrp,
      discount,
      sizes: itemSizes,
      colors: itemColors,
      images: finalImages,
      stock,
      description: `Upgrade your clothing standard with the newly crafted ${name} by ${brand}. Made with premium ${fabric} fabric specifically curated for modern Indian tastes, this outfit ensures rich aesthetics, excellent air ventilation, and high durability. Ideal for modern showrooms, wedding ceremonies, or everyday premium style.`,
      features,
      fabric,
      washCare: base.washCare,
      deliveryInfo: "Complimentary super-fast shipping across Madhya Pradesh (Bhopal, Indore, Jabalpur, Gwalior) and all over India. Delivered securely in protective eco-friendly MBA Kapdewala boxes with easy tracking within 2-4 working days.",
      returnPolicy: "Hassle-free 15-day return and exchange policy. Return any unused item in original state with tag. Free home pickup available from Indore & Bhopal coordinates.",
      rating,
      reviews,
      tags,
      isFestival,
      isWedding,
      isOfficeWear,
      isBestSeller,
      isTrending,
      isNewArrival,
      isSeasonCollection
    });
  }

  return list;
}

export const PRODUCTS_DATABASE = generateProducts();

// Coupon presets suitable for India
export const COUPONS = {
  WELCOME500: { code: "WELCOME500", discountType: "fixed" as const, value: 500, minSpend: 1999, description: "Flat ₹500 discount on your first order of ₹1,999 and above." },
  FESTIVAL10: { code: "FESTIVAL10", discountType: "percentage" as const, value: 10, minSpend: 1499, description: "Celebrate with 10% discount on all ethnic wear purchases above ₹1,499." },
  MBASHOWROOM: { code: "MBASHOWROOM", discountType: "percentage" as const, value: 15, minSpend: 4999, description: "Exclusive 15% discount for premium high-value shoppers on orders above ₹4,999." }
};

// Local Bhopal / Indore Blog content
export const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "Trending Traditional Styles for the Bhopal Festive Season",
    summary: "Discover the perfect fusion of classic Lucknowi craftsmanship and royal Banarasi weaves curated by MBA Kapdewala.",
    content: `Festive celebrations in Madhya Pradesh are a grand affair, and your styling should reflect this majestic spirit. This year, we're witnessing a beautiful resurgence of traditional handloom fibers fused with modern, tailored cuts.

    At MBA Kapdewala Bhopal/Indore, we've carefully curated a festive line centering Lucknowi Chikankari work on soft pastels and royal Banarasi brocade silk jackets. Here is how you can stand out:
    
    1. Layer with a Koti: Slip a floral jacquard Nehru jacket over a solid white raw cotton kurta. It instantly adds depth and style.
    2. Embrace Pastels: Lavender, mint green, and champagne peach are dominating morning ceremonies, while royal maroon and deep indigo are reserved for the evening.
    3. Choose Genuine Mojaris: Finish your ethnic wear with handcrafted leather Mojaris instead of modern boots. It establishes ultimate authenticity.`,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600",
    category: "Festive Trends",
    date: "2026-07-12",
    author: "Sartorial Team Bhopal",
    readTime: "3 min read"
  },
  {
    id: "blog-2",
    title: "Indore's Summer Wedding Guide: The Art of Lightweight Royal Achkans",
    summary: "No need to sweat in heavy woolen suits! Learn how lightweight linen blazers and raw silk Indo-Western achkans keep you cool and regal.",
    content: `Indore weddings are famous for great food and unmatched style. But as the temperatures soar, wearing thick woolen suits can quickly become uncomfortable. The solution? Ultra-light organic fibers woven into heavy-look aesthetics.

    Our Indore showroom features an exquisite collection of Jute Silk Achkans and French Linen Blazers. They maintain a solid, premium structure while allowing absolute ventilation. Pair them with a comfortable stretch chino or thin linen trouser to breeze through late-night reception parties with unmatched comfort and style!`,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    category: "Wedding Special",
    date: "2026-07-16",
    author: "Indore Concierge",
    readTime: "5 min read"
  }
];
