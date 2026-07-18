import { Product, Review } from "../types";

// Premium Unsplash fashion images, optimized and categorized
const IMAGES = {
  Men: {
    casual: [
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=600"
    ],
    formal: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600"
    ],
    winter: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600"
    ],
    ethnic: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600"
    ],
    sport: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600"
    ]
  },
  Women: {
    casual: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600"
    ],
    formal: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600"
    ],
    winter: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600"
    ],
    ethnic: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1583391265517-35bbadd01209?auto=format&fit=crop&q=80&w=600"
    ],
    sport: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=600"
    ]
  },
  Kids: {
    casual: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600"
    ]
  },
  Footwear: {
    boots: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600"
    ],
    sneakers: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600"
    ]
  },
  Accessories: {
    bags: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600"
    ],
    watches: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600"
    ]
  }
};

const BASE_REVIEWS: Review[] = [
  { id: "r-1", userName: "Marcus Vance", rating: 5, date: "2026-05-14", comment: "Outstanding premium fit. The fabric feels exactly like high-end Italian cashmere.", verified: true },
  { id: "r-2", userName: "Sophia Sterling", rating: 4, date: "2026-06-02", comment: "Truly luxurious feel. The cuts are sharp and flattering. Sizing runs slightly large, check size guide.", verified: true },
  { id: "r-3", userName: "Elena Rostova", rating: 5, date: "2026-06-25", comment: "An absolute masterpiece. Fast delivery and the gold accented packaging represents standard high fashion.", verified: true },
  { id: "r-4", userName: "James C.", rating: 5, date: "2026-07-01", comment: "Comfortable and beautiful. Will purchase again.", verified: true }
];

// Curated list of distinct high-fashion concepts to generate 150 items
const productBases = [
  // MEN
  { name: "Premium Velvet Tuxedo", basePrice: 249, category: "Men", subCategory: "Formal Wear" as const, images: IMAGES.Men.formal, fabric: "Velvet Silk Blend", washCare: "Dry Clean Only", features: ["Satin peak lapels", "Single button fastening", "Double vented back", "Internal pocket lining"] },
  { name: "Classic Merino Wool Sweater", basePrice: 129, category: "Men", subCategory: "Winter Wear" as const, images: IMAGES.Men.winter, fabric: "100% Merino Wool", washCare: "Hand Wash Cold", features: ["Ribbed crew neckline", "Moisture wicking fibers", "Extremely breathable warmth"] },
  { name: "Sartorial Silk Blend Shirt", basePrice: 95, category: "Men", subCategory: "Formal Wear" as const, images: IMAGES.Men.formal, fabric: "60% Mulberry Silk, 40% Fine Cotton", washCare: "Gentle Hand Wash or Dry Clean", features: ["Spread collar", "Mother of Pearl buttons", "Mitred French cuffs", "Tailored premium fit"] },
  { name: "Urban Comfort Chino Pants", basePrice: 85, category: "Men", subCategory: "Casual Wear" as const, images: IMAGES.Men.casual, fabric: "Stretch Cotton Twill", washCare: "Machine Wash Warm", features: ["Slim straight leg profile", "Four-pocket styling", "Premium YKK zip fly", "Super soft combed cotton"] },
  { name: "Active Tech Elite Joggers", basePrice: 79, category: "Men", subCategory: "Sportswear" as const, images: IMAGES.Men.sport, fabric: "Recycled Polyester Spandex", washCare: "Machine Wash Cold", features: ["Moisture-wicking panels", "Hidden secure zip pockets", "Adjustable drawcord waist", "Lightweight four-way stretch"] },
  { name: "Heritage Linen Leisure Blazer", basePrice: 175, category: "Men", subCategory: "Casual Wear" as const, images: IMAGES.Men.casual, fabric: "100% Organic Irish Linen", washCare: "Dry Clean Preferred", features: ["Unstructured shoulders", "Patch pockets", "Double vented back", "Contrast interior stitching"] },
  { name: "Royal Sherwani Kurta Set", basePrice: 220, category: "Men", subCategory: "Ethnic Wear" as const, images: IMAGES.Men.ethnic, fabric: "Banarasi Art Silk", washCare: "Dry Clean Only", features: ["Mandarin neck collar", "Handcrafted thread embroidery", "Includes matching churidar pants", "Side slits for ease of movement"] },

  // WOMEN
  { name: "Silk Satin Slip Gown", basePrice: 189, category: "Women", subCategory: "Formal Wear" as const, images: IMAGES.Women.formal, fabric: "100% Mulberry Silk", washCare: "Dry Clean Only", features: ["Cowled fluid neckline", "Adjustable crossback thin straps", "Elegant side slit accent", "Beautiful floor-sweeping drape"] },
  { name: "Cashmere Trench Coat", basePrice: 349, category: "Women", subCategory: "Winter Wear" as const, images: IMAGES.Women.winter, fabric: "85% Cashmere, 15% Virgin Wool", washCare: "Dry Clean Only", features: ["Double-breasted front profile", "Removable tie-waist sash", "Signature buttoned epaulets", "Rich satin lining"] },
  { name: "Signature Linen Day Dress", basePrice: 110, category: "Women", subCategory: "Casual Wear" as const, images: IMAGES.Women.casual, fabric: "100% French Linen", washCare: "Machine Wash Cold, Hang Dry", features: ["A-line tiered flowy skirt", "Elasticated square neck", "Functional deep side pockets", "Breathable natural fabric"] },
  { name: "Vegan Leather Biker Jacket", basePrice: 165, category: "Women", subCategory: "Casual Wear" as const, images: IMAGES.Women.casual, fabric: "Heavyweight Vegan PU Leather", washCare: "Wipe Clean with Damp Cloth", features: ["Asymmetrical front zip", "Silver-toned heavy hardware", "Zippered sleeve cuffs", "Removable buckled waist belt"] },
  { name: "Zen Seamless Yoga Set", basePrice: 89, category: "Women", subCategory: "Sportswear" as const, images: IMAGES.Women.sport, fabric: "Nylon Lycra Knit", washCare: "Machine Wash Cold", features: ["High-rise compression leggings", "Matching scoop sports bra", "Squat-proof thick construction", "Anti-odor treatment"] },
  { name: "Anarkali Embroidered Kurti Set", basePrice: 195, category: "Women", subCategory: "Ethnic Wear" as const, images: IMAGES.Women.ethnic, fabric: "Georgette with Cotton Lining", washCare: "Dry Clean Recommended", features: ["Heavy zari work detailing", "Flared cascading style", "Includes designer floral dupatta", "Concealed back zipper"] },
  { name: "Luxe Structured Silk Jumpsuit", basePrice: 179, category: "Women", subCategory: "Formal Wear" as const, images: IMAGES.Women.formal, fabric: "Dupioni Silk Blend", washCare: "Dry Clean Only", features: ["Wide-leg dramatic silhouette", "Off-the-shoulder elegant drape", "Bespoke self-tie waistband", "Fully lined bodice"] },

  // KIDS
  { name: "Kids Organic Cotton Overalls", basePrice: 45, category: "Kids", subCategory: "Casual Wear" as const, images: IMAGES.Kids.casual, fabric: "100% Organic Combed Cotton", washCare: "Machine Wash Warm", features: ["Easy button snap closures", "Double knee reinforcements", "Adorable chest kangaroo pocket"] },
  { name: "Kids Woolen Hooded Cardigan", basePrice: 55, category: "Kids", subCategory: "Winter Wear" as const, images: IMAGES.Kids.casual, fabric: "Hypoallergenic Merino Yarn", washCare: "Hand Wash Cold", features: ["Cute bear-ear hood trim", "Wooden toggle buttons", "Thick ribbed insulating knit"] },
  { name: "Kids Active Play Joggers", basePrice: 35, category: "Kids", subCategory: "Sportswear" as const, images: IMAGES.Kids.casual, fabric: "Cotton Poly Fleece", washCare: "Machine Wash Cold", features: ["Stretchy rib knit waistband", "Deep side pockets for toys", "Fade-resistant color dyes"] },

  // FOOTWEAR
  { name: "Monolith Leather Chelsea Boots", basePrice: 180, category: "Footwear", subCategory: "Boots" as const, images: IMAGES.Footwear.boots, fabric: "Full Grain Box Calf Leather", washCare: "Buff with Premium Leather Polish", features: ["Elasticated side gussets", "Heavy duty lugged rubber sole", "Signature grosgrain pull tabs", "Soft calfskin leather insole"] },
  { name: "Classic Minimalist Sneakers", basePrice: 135, category: "Footwear", subCategory: "Sneakers" as const, images: IMAGES.Footwear.sneakers, fabric: "Nappa Leather", washCare: "Wipe with Sneaker Cleanser", features: ["Monochromatic stitching", "Margom durable rubber sole", "Ultra-comfy memory foam pad", "Premium cotton wax laces"] },
  { name: "Luxe Metallic Evening Heels", basePrice: 160, category: "Footwear", subCategory: "Boots" as const, images: IMAGES.Footwear.boots, fabric: "Satin with Crystal Accent", washCare: "Spot Clean only", features: ["Stiletto high heel silhouette", "Adjustable buckled ankle strap", "Cushioned orthopedic arch"] },

  // ACCESSORIES
  { name: "Vogue Chronograph Watch", basePrice: 299, category: "Accessories", subCategory: "Watches" as const, images: IMAGES.Accessories.watches, fabric: "316L Stainless Steel", washCare: "Wipe Clean with Soft Cloth", features: ["Japanese Quartz Movement", "Scratch-resistant Sapphire crystal", "Water resistant up to 50 meters", "Genuine calfskin wristband"] },
  { name: "Italian Saffiano Leather Tote", basePrice: 195, category: "Accessories", subCategory: "Bags" as const, images: IMAGES.Accessories.bags, fabric: "Genuine Saffiano Leather", washCare: "Apply Leather Guard Cream", features: ["Gold-plated metal feet protection", "Zippered secure central divider", "Premium branded dust cover", "Elegant structured minimalist shape"] },
  { name: "Bespoke Polarized Sunglasses", basePrice: 85, category: "Accessories", subCategory: "Watches" as const, images: IMAGES.Accessories.watches, fabric: "Handmade Acetate / Metal", washCare: "Clean with Microfiber Pouch", features: ["100% UVA/UVB complete blocking", "Heavy duty metal hinges", "Signature gold logo detailing"] }
];

// Brand list for variety
const BRANDS = ["MBA Kapdewala", "Kapda Premium", "Swadeshi Wear", "Daily Comfort", "Apna Style", "Utsav Wear"];

// Size matrices
const SIZES = {
  Men: ["S", "M", "L", "XL", "XXL"],
  Women: ["XS", "S", "M", "L", "XL"],
  Kids: ["2Y", "4Y", "6Y", "8Y", "10Y"],
  Footwear: ["38", "39", "40", "41", "42", "43", "44"],
  Accessories: ["One Size"]
};

// Colors list
const COLORS = [
  "Midnight Black", "Charcoal Gray", "Espresso Brown", "Champagne Gold",
  "Mulberry Burgundy", "Navy Blue", "Olive Drab", "Forest Green", "Pearl White",
  "Rose Gold", "Sage Green", "Camel Beige", "Oatmeal Melange", "Amber Bronze"
];

// Generate exactly 150 unique, highly polished products
export function generateProducts(): Product[] {
  const list: Product[] = [];
  const itemsNeeded = 150;

  // Let's create an expansion loop
  for (let i = 0; i < itemsNeeded; i++) {
    const base = productBases[i % productBases.length];
    const index = Math.floor(i / productBases.length); // how many times we've cycled
    
    const brand = BRANDS[i % BRANDS.length];
    
    // Add variations to the names so they feel distinct
    let name = base.name;
    let category = base.category as "Men" | "Women" | "Kids" | "Footwear" | "Accessories";
    let subCategory = base.subCategory;
    let fabric = base.fabric;
    let features = [...base.features];
    let images = base.images;

    let basePriceUSD = base.basePrice;
    if (index > 0) {
      const adjectives = ["Imperial", "Signature", "Urban Premium", "Minimalist", "Bespoke", "Luxe", "Sartorial", "Contemporary", "Metropolitan", "Timeless", "Avant-Garde", "Studio"];
      const adj = adjectives[(index + i) % adjectives.length];
      name = `${adj} ${base.name}`;
      basePriceUSD = Math.round(base.basePrice * (0.85 + (i % 25) * 0.02)); // varied prices
    }

    // Scale to Indian Rupees (approx 15x for highly friendly Indian clothing prices)
    const rawPriceINR = basePriceUSD * 15;
    // Round to nearest 50 or 100, then subtract 1 to get standard charm pricing (e.g. ₹999, ₹1299, ₹1499)
    let price = Math.max(199, Math.round(rawPriceINR / 100) * 100 - 1);

    // Determine MRP (Higher than price for dynamic discounts)
    // Discount percentage ranges between 10% to 40% for many items
    const givesDiscount = i % 3 !== 0; // 2 out of 3 items have discounts
    const discount = givesDiscount ? (10 + (i % 7) * 5) : 0;
    
    let mrp = price;
    if (discount > 0) {
      const rawMrp = Math.round((price * 100) / (100 - discount));
      mrp = Math.round(rawMrp / 100) * 100 - 1;
    }
    if (mrp <= price) {
      mrp = price + 200; // default margin
    }

    // Pick 2-3 random colors
    const startColor = i % COLORS.length;
    const itemColors = [
      COLORS[startColor],
      COLORS[(startColor + 2) % COLORS.length],
    ];
    if (i % 2 === 0) {
      itemColors.push(COLORS[(startColor + 5) % COLORS.length]);
    }

    // Sizes
    const itemSizes = SIZES[category];

    // SKUs
    const sku = `MK-${category.substring(0, 1).toUpperCase()}-${subCategory.substring(0, 2).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;

    // Select images. If base doesn't have images, fallback safely
    const baseImages = images || IMAGES.Men.casual;
    const finalImages = [
      baseImages[i % baseImages.length],
      baseImages[(i + 1) % baseImages.length],
      baseImages[(i + 2) % baseImages.length]
    ].filter(Boolean);

    // Stock
    const stock = (i % 11 === 0) ? 0 : (10 + (i % 45)); // some out of stock for realistic admin tracking

    // Rating
    const rating = parseFloat((4.2 + (i % 9) * 0.1).toFixed(1));

    // Reviews list - generate custom dates and names
    const reviews: Review[] = BASE_REVIEWS.map((rev, revIdx) => ({
      ...rev,
      id: `rev-${i}-${revIdx}`,
      rating: Math.min(5, Math.max(3, rev.rating + (i % 2 === 0 ? 0 : -1))) // slight variations
    }));

    // Generate tags for deep search capability
    const tags = [
      category.toLowerCase(),
      subCategory.toLowerCase(),
      brand.toLowerCase(),
      "mba",
      "kapdewala"
    ];
    if (discount > 0) tags.push("sale", "discount", "offer");
    if (price > 2000) tags.push("premium", "luxury");
    if (price < 1000) tags.push("budget", "essentials");
    if (subCategory.includes("Winter")) tags.push("warm", "cozy", "winter");
    if (subCategory.includes("Formal")) tags.push("office", "suits", "event");
    if (subCategory.includes("Casual")) tags.push("comfy", "everyday");

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
      description: `Elevate your daily look with the ${name} by ${brand}. Crafted from the finest ${fabric}, this high-quality outfit features a comfortable fit and beautiful detailing designed to make you look elegant and premium.`,
      features,
      fabric,
      washCare: base.washCare,
      deliveryInfo: "Complimentary express shipping across India. Delivers within 2-4 business days. Safe, contactless delivery in premium eco-friendly MBA Kapdewala boxes.",
      returnPolicy: "We offer an easy 30-day return or exchange policy. Return any unused item in its original packaging with tags intact. Complimentary home pickup is available.",
      rating,
      reviews,
      tags
    });
  }

  return list;
}

export const PRODUCTS_DATABASE = generateProducts();

// Coupon presets
export const COUPONS: { [key: string]: { code: string; discountType: "percentage" | "fixed"; value: number; minSpend: number; description: string } } = {
  MBA10: { code: "MBA10", discountType: "percentage", value: 10, minSpend: 999, description: "Enjoy 10% off on orders above ₹999." },
  WELCOME200: { code: "WELCOME200", discountType: "fixed", value: 200, minSpend: 1499, description: "₹200 off on your first purchase above ₹1,499." },
  MBASUPER: { code: "MBASUPER", discountType: "percentage", value: 20, minSpend: 2999, description: "Exclusive 20% off on orders above ₹2,999." }
};

// Blog presets
export const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "The Renaissance of Minimalism: Quiet Luxury Explained",
    summary: "Discover why the elite are transitioning away from heavy logos and embracing beautiful tailored fabrics and silent tones.",
    content: `In the fast-evolving world of haute couture, loud branding has officially stepped aside for something far more sophisticated: 'Quiet Luxury'. Often referred to as stealth wealth, this design aesthetic prioritizes impeccable craftsmanship, ultra-premium fabrics, and understated neutral tones.

    At MBA Kapdewala, we've carefully structured our latest collections to embody this ethos. From our classic 100% Merino Wool sweaters to double-breasted Cashmere Trench coats, each garment represents an investment in timeless quality rather than transient branding hype.

    Here are three simple ways to transition your wardrobe into Quiet Luxury:
    1. Invest in Tailoring: A perfect fitting jacket or tuxedo instantly commands attention.
    2. Focus on Materiality: Prefer mulberry silk, cashmere, and high-quality full grain box calf leather.
    3. Monochromatic Styling: Dress in unified shades of charcoal, camel, beige, and matte black to create a highly streamlined, taller, and incredibly polished appearance.`,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    category: "Style Guide",
    date: "2026-07-10",
    author: "Alessia Moretti",
    readTime: "4 min read"
  },
  {
    id: "blog-2",
    title: "Fall-Winter Outerwear: How to Layer with Precision",
    summary: "A practical masterclass on styling trench coats, heavy velvet blazers, and knitwear during colder seasons.",
    content: `Layering is the ultimate creative playground for fashion enthusiasts. Colder weather shouldn't mean compromising on silhouette or styling. The secret lies in balancing fabric weight, textures, and length.

    A luxury outfit should tell a story. Start with an ultra-soft base layer, like our Sartorial Silk Blend shirt or a fine-gauge knit. Add a textured middle layer—such as a leisure linen blazer or deep cashmere sweater. Finally, crown the ensemble with a heavy-weight structural outer layer like our Cashmere Trench Coat.

    Pro Styling Tip: Ensure your hemlines align beautifully, and experiment with popping collars or turning cuffs to reveal contrasting luxury silk linings!`,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
    category: "Trend Alert",
    date: "2026-07-15",
    author: "Dominic Thorne",
    readTime: "5 min read"
  }
];
