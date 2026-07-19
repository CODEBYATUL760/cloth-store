/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Gender, ColorVariant, SizeInfo, ProductReview } from '../types';

// Let's define the color swatches with names and hex codes
const COLOR_POOL: ColorVariant[] = [
  { name: 'Pitch Black', hex: '#0F0F11' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Navy Blue', hex: '#1D2A44' },
  { name: 'Slate Grey', hex: '#5A626A' },
  { name: 'Olive Green', hex: '#4B5320' },
  { name: 'Crimson Red', hex: '#990000' },
  { name: 'Deep Maroon', hex: '#500A15' },
  { name: 'Beige', hex: '#E1D9C1' },
  { name: 'Cream Off-White', hex: '#FFFDD0' },
  { name: 'Camel Brown', hex: '#C19A6B' },
  { name: 'Mustard Yellow', hex: '#E1AD01' },
  { name: 'Dusty Pink', hex: '#DCAE96' },
  { name: 'Royal Purple', hex: '#4B0082' },
  { name: 'Teal Teal', hex: '#008080' },
  { name: 'Sage Green', hex: '#9CAF88' },
];

// Unsplash high quality fashion photography pools
const WOMEN_ETHNIC_IMAGES = [
  'photo-1610030469983-98e550d6193c', // Saree elegant
  'photo-1610030469668-93535c17b6b3', // Lehenga traditional
  'photo-1583391733956-3750e0ff4e8b', // Elegant traditional dress
  'photo-1617627143750-d86bc21e42bb', // Pastel salwar suit
  'photo-1610030470224-34017a78377b', // Pink Kurti
  'photo-1608748010899-18f300247112', // Festive collection
  'photo-1605721911519-3dfeb3be25e7', // Ethnic fashion details
  'photo-1609357605129-26f69add5d6e', // Traditional Kurta set
  'photo-1611601679655-7c8bc197f0c6', // Festive Kurti
  'photo-1595777457583-95e059d581b8', // Designer gown
];

const WOMEN_WESTERN_IMAGES = [
  'photo-1515886657613-9f3515b0c78f', // Mustard outfit
  'photo-1539109136881-3be0616acf4b', // Streetwear jacket
  'photo-1509631179647-0177331693ae', // Floral print dress
  'photo-1494790108377-be9c29b29330', // Outdoor smiling model
  'photo-1524504388940-b1c1722653e1', // High waist jeans & crop top
  'photo-1485462537746-965f33f7f6a7', // Premium knitwear
  'photo-1518622358385-8ea7d0794bf6', // Urban outfit
  'photo-1554412933-514a83d2f3c8', // Summer top
  'photo-1618244972963-dbee1a7edc95', // Trendy shirt dress
  'photo-1609505848912-b7c3bc8b7db6', // Warm autumn sweater
];

const MEN_ETHNIC_IMAGES = [
  'photo-1617137968427-85924c800a22', // Royal Kurta sherwani
  'photo-1617137984095-74e4e5e3613f', // Solid silk Kurta Nehru jacket
  'photo-1624378439575-d8705ad7ae80', // Classic ethnic pose
  'photo-1605518216938-7c31b7b14ad0', // Elegant Nehru jacket outfit
  'photo-1607823014022-b9b5f5439ba5', // Linen Kurta
];

const MEN_WESTERN_IMAGES = [
  'photo-1507679799987-c73779587ccf', // Elegant blazer suit
  'photo-1593030761757-71fae45fa0e7', // Formal black suit
  'photo-1602810318383-e386cc2a3ccf', // Formal light blue shirt
  'photo-1618886614638-80e3c103d31a', // Casual linen shirt
  'photo-1519085360753-af0119f7cbe7', // Office professional blazer
  'photo-1505632951211-1f332f7cb35f', // Casual street style hoodies
  'photo-1620012253295-c05cb1e65866', // Minimalist t-shirt
  'photo-1503342217505-b0a15ec3261c', // Solid black tee
  'photo-1617137968427-85924c800a22', // Blazer jacket
  'photo-1556821840-3a63f95609a7', // Sweatshirt street style
];

const KIDS_IMAGES = [
  'photo-1519457431-44ccd64a579b', // Happy kid portrait
  'photo-1607990283143-e81e7a2c93ab', // Cute girl sweater
  'photo-1519238263530-99bdd11df2ea', // Kids outdoor play clothes
  'photo-1503919545889-aef636e10ad4', // Toddler denim jumpsuit
  'photo-1622273509395-5d911f9748b6', // Casual kids wear
];

const ACCESSORIES_IMAGES = [
  'photo-1584917865442-de89df76afd3', // Leather shoulder handbag
  'photo-1566150905458-1bf1fc15a7a5', // Premium beach leather bag
  'photo-1627124118400-0142b13c9785', // Slim minimalist wallet
  'photo-1572635196237-14b3f281503f', // Classic black sunglasses
  'photo-1611591437281-460bfbe1220a', // Jewelry bracelets and rings
  'photo-1622434641406-a158123450f9', // Luxury metallic watch
  'photo-1523293182086-7651a899d37f', // Sunglasses case
  'photo-1608043152269-423dbba4e7e1', // Elegant knitted scarf
];

const REVIEW_COMMENTS = [
  'Absolutely loved the fabric! Fits like a glove and feels very premium.',
  'Great value for money. The color is exactly as shown in the picture.',
  'Stitching is very clean and the fit is highly comfortable. Highly recommend!',
  'Perfect for formal wear. Looks elegant and classy. Delivery was very fast.',
  'Beautiful fabric texture, lightweight but keeps its form. Buying another color soon!',
  'Extremely comfortable for daily wear. Premium Indian craftsmanship at its best.',
  'Matches the festive mood perfectly. Got so many compliments on my outfit!',
  'Quality is top-notch. The material is breathable and holds up well after several washes.',
];

const NAMES_POOL = [
  'Aarav Sharma', 'Ananya Patel', 'Rohan Verma', 'Priya Iyer', 'Kabir Malhotra',
  'Diya Nair', 'Amit Gupta', 'Neha Singh', 'Vikram Joshi', 'Sneha Rao',
  'Arjun Mehta', 'Meera Deshmukh', 'Yash Bansal', 'Riya Sen', 'Rahul Kulkarni'
];

// Helper to generate reviews
function generateReviews(productId: string, rating: number): ProductReview[] {
  const reviews: ProductReview[] = [];
  const numReviews = Math.floor(rating * 1.5) + 2; // ~4-8 reviews
  
  for (let i = 0; i < numReviews; i++) {
    const reviewerName = NAMES_POOL[(productId.charCodeAt(0) + i) % NAMES_POOL.length];
    const reviewRating = Math.max(1, Math.min(5, Math.round(rating + (Math.random() - 0.5) * 1.5)));
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60) - 5);
    
    reviews.push({
      id: `${productId}-rev-${i}`,
      userName: reviewerName,
      rating: reviewRating,
      date: date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      comment: REVIEW_COMMENTS[(productId.charCodeAt(0) + i * 3) % REVIEW_COMMENTS.length],
      verified: Math.random() > 0.1,
      likes: Math.floor(Math.random() * 40) + 1,
    });
  }
  return reviews;
}

// Programmatic Generator for 850 products
export function generateProducts(): Product[] {
  const list: Product[] = [];
  
  // Setup standard brand allocations
  const brandAllocations: Record<Gender, string[]> = {
    'Men': ['Allen Solly', 'Peter England', 'Louis Philippe', 'Van Heusen', "Levi's", 'Spykar', 'Mufti', 'Flying Machine', 'US Polo Assn.', 'Wrangler', 'Pepe Jeans', 'Roadster', 'Jack & Jones', 'Campus Sutra'],
    'Women': ['Biba', 'W', 'Aurelia', 'Global Desi', 'ONLY', 'Vero Moda', 'Roadster', 'Jack & Jones', 'Campus Sutra'],
    'Kids': ['Campus Sutra', 'US Polo Assn.', 'Roadster', 'Allen Solly', 'Peter England'],
    'Accessories': ['Louis Philippe', 'Van Heusen', "Levi's", 'Spykar', 'Biba', 'Roadster', 'Vero Moda']
  };

  const categoriesByGender: Record<Gender, string[]> = {
    'Men': [
      'T-Shirts', 'Polo T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Oversized T-Shirts', 
      'Printed T-Shirts', 'Solid T-Shirts', 'Jeans', 'Cargo Pants', 'Joggers', 
      'Trousers', 'Shorts', 'Blazers', 'Jackets', 'Sweatshirts', 'Hoodies', 
      'Kurta', 'Nehru Jacket', 'Ethnic Wear', 'Innerwear', 'Nightwear', 'Sportswear'
    ],
    'Women': [
      'Kurtis', 'Kurta Sets', 'Sarees', 'Lehengas', 'Salwar Suits', 'Tops', 
      'Crop Tops', 'T-Shirts', 'Shirts', 'Jeans', 'Palazzo', 'Leggings', 
      'Skirts', 'Dresses', 'Gowns', 'Jackets', 'Sweaters', 'Nightwear', 
      'Ethnic Wear', 'Sportswear'
    ],
    'Kids': [
      'Boys T-Shirts', 'Boys Jeans', 'Girls Frocks', 'Boys Party Wear', 
      'Girls Party Wear', 'Kids School Essentials', 'Kids Winter Wear', 'Baby Wear'
    ],
    'Accessories': [
      'Belts', 'Wallets', 'Caps', 'Socks', 'Scarves', 'Handbags', 'Backpacks', 'Sunglasses', 'Fashion Accessories'
    ]
  };

  const materialsPool = ['Cotton', 'Linen', 'Silk', 'Georgette', 'Denim', 'Polyester', 'Wool Blend', 'Viscose Rayon', 'Chiffon', 'Lycra'];
  const fitPool = ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Oversized Fit', 'Skinny Fit', 'Tailored Fit'];
  const patternsPool = ['Solid', 'Printed', 'Striped', 'Checkered', 'Embroidered', 'Self Design', 'Washed', 'Textured'];
  const sleevePool = ['Full Sleeves', 'Half Sleeves', 'Short Sleeves', 'Sleeveless', '3/4 Sleeves'];
  const neckPool = ['Crew Neck', 'Polo Collar', 'Mandarin Collar', 'V-Neck', 'Spread Collar', 'Hooded', 'Round Neck', 'Boat Neck'];
  const occasionPool = ['Casual Wear', 'Formal Wear', 'Festive Ethnic', 'Party Wear', 'Sportswear / Gym', 'Office / Workwear', 'Daily Wear'];

  let idCounter = 1;

  // Let's loop and generate a dense grid of products
  // Total target: ~820 products
  const genders: Gender[] = ['Men', 'Women', 'Kids', 'Accessories'];

  genders.forEach(gender => {
    const cats = categoriesByGender[gender];
    const brands = brandAllocations[gender];
    
    cats.forEach(cat => {
      // For each category, we want to generate a set of unique products
      // We will generate about 10-15 products per category to reach ~800 total (since we have 22 + 20 + 8 + 9 = 59 total categories)
      // 59 categories * 14 items/category = ~826 items
      const targetItemsCount = cat === 'Sarees' || cat === 'Kurtis' || cat === 'Kurtas' || cat === 'Casual Shirts' || cat === 'T-Shirts' ? 16 : 13;

      for (let i = 1; i <= targetItemsCount; i++) {
        const brand = brands[(i + cat.charCodeAt(0)) % brands.length];
        
        // Formulate name professionally
        let productName = '';
        const material = materialsPool[(i + brand.charCodeAt(0)) % materialsPool.length];
        const pattern = patternsPool[(i + cat.charCodeAt(0)) % patternsPool.length];
        const fit = fitPool[(i + brand.charCodeAt(1)) % fitPool.length];
        const sleeve = sleevePool[(i + cat.charCodeAt(cat.length-1)) % sleevePool.length];
        const neck = neckPool[(i + brand.charCodeAt(2)) % neckPool.length];
        const occasion = occasionPool[(i + cat.charCodeAt(1)) % occasionPool.length];

        if (gender === 'Men') {
          if (cat.includes('Shirt')) {
            productName = `${brand} Men's ${fit} ${pattern} ${material} ${cat}`;
          } else if (cat.includes('Kurta') || cat.includes('Ethnic')) {
            productName = `${brand} Traditional ${pattern} ${material} Men's ${cat}`;
          } else {
            productName = `${brand} Men's ${pattern} ${cat}`;
          }
        } else if (gender === 'Women') {
          if (cat === 'Sarees') {
            productName = `${brand} Elegant ${pattern} ${material} Saree with Blouse`;
          } else if (cat === 'Kurtis' || cat === 'Kurta Sets') {
            productName = `${brand} Women's Designer ${pattern} ${material} ${cat}`;
          } else {
            productName = `${brand} Women's ${pattern} ${material} ${cat}`;
          }
        } else if (gender === 'Kids') {
          productName = `${brand} Junior ${cat} for Boys & Girls`;
        } else {
          productName = `${brand} Premium ${cat}`;
        }

        const id = `IND-${10000 + idCounter}`;
        idCounter++;

        // Calculate Pricing
        const mrp = Math.round((799 + (i * 240) + (cat.charCodeAt(0) * 10)) / 50) * 50 - 1; // e.g., 1299, 1499
        let discount = 10 + (Math.round((i * 7) % 7) * 5) + (mrp > 3000 ? 15 : 0); // e.g. 10%, 25%, 45%
        if (discount > 75) discount = 65;
        const price = Math.round((mrp * (1 - discount / 100)) / 10) * 10 - 1;

        // Select Unsplash Images deterministically based on gender, category, and index
        const images: string[] = [];
        let imagePool = MEN_WESTERN_IMAGES;
        if (gender === 'Women') {
          imagePool = (cat === 'Sarees' || cat === 'Kurtis' || cat === 'Kurta Sets' || cat === 'Lehengas' || cat === 'Salwar Suits' || cat === 'Ethnic Wear') 
            ? WOMEN_ETHNIC_IMAGES 
            : WOMEN_WESTERN_IMAGES;
        } else if (gender === 'Men' && (cat === 'Kurta' || cat === 'Nehru Jacket' || cat === 'Ethnic Wear')) {
          imagePool = MEN_ETHNIC_IMAGES;
        } else if (gender === 'Kids') {
          imagePool = KIDS_IMAGES;
        } else if (gender === 'Accessories') {
          imagePool = ACCESSORIES_IMAGES;
        }

        // Get 4-5 unique image IDs from the pool
        const baseImgIdx = (i + cat.charCodeAt(0)) % imagePool.length;
        const offsetImgIdx1 = (baseImgIdx + 1) % imagePool.length;
        const offsetImgIdx2 = (baseImgIdx + 2) % imagePool.length;
        const offsetImgIdx3 = (baseImgIdx + 3) % imagePool.length;

        // Create realistic product views
        const baseImgId1 = imagePool[baseImgIdx];
        const baseImgId2 = imagePool[offsetImgIdx1];
        const baseImgId3 = imagePool[offsetImgIdx2];
        const baseImgId4 = imagePool[offsetImgIdx3];

        images.push(`https://images.unsplash.com/${baseImgId1}?auto=format&fit=crop&w=600&h=800&q=80`); // Front View
        images.push(`https://images.unsplash.com/${baseImgId1}?auto=format&fit=crop&w=600&h=800&q=80&crop=bottom`); // Back View / Secondary details
        images.push(`https://images.unsplash.com/${baseImgId2}?auto=format&fit=crop&w=600&h=800&q=80&crop=left`); // Side View
        images.push(`https://images.unsplash.com/${baseImgId3}?auto=format&fit=crop&w=600&h=800&q=80`); // Model wearing / Lifestyle
        images.push(`https://images.unsplash.com/${baseImgId4}?auto=format&fit=crop&w=600&h=800&q=90&crop=entropy`); // Close-up / Texture zoom

        // Pick 2-4 colors deterministically
        const colorsCount = 2 + (i % 3); // 2, 3, or 4 colors
        const colors: ColorVariant[] = [];
        for (let c = 0; c < colorsCount; c++) {
          colors.push(COLOR_POOL[(i * 3 + c * 2 + cat.charCodeAt(0)) % COLOR_POOL.length]);
        }

        // Setup sizes and inventory stock levels (real-time inventory!)
        const sizes: SizeInfo[] = [];
        const sizesList: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
        let totalStock = 0;
        sizesList.forEach((sz, idx) => {
          // kids and accessories usually don't have all sizes, but let's customize
          if (gender === 'Accessories') {
            if (idx === 2) { // Just one size for Accessories (standard 'Free Size' represented by M)
              const stock = Math.floor(Math.random() * 25) + 5;
              sizes.push({ size: 'M', stock });
              totalStock += stock;
            }
          } else {
            const stock = Math.floor(Math.random() * 18) + 1; // 1 to 18 items per size
            sizes.push({ size: sz, stock });
            totalStock += stock;
          }
        });

        const rating = Math.round((4.0 + (i % 11) * 0.1) * 10) / 10;
        const reviewCount = Math.floor(rating * i * 3) + 3;

        // Custom specifications based on category
        let fabric = 'Cotton Blend';
        if (cat === 'Sarees' || cat === 'Lehengas') fabric = material === 'Silk' ? 'Premium Banarasi Silk' : 'Poly Georgette';
        else if (cat.includes('Shirts')) fabric = material === 'Linen' ? 'Pure Luxury Linen' : '100% Breathable Cotton';
        else if (cat === 'Jeans') fabric = 'Heavyweight Stretchable Denim';
        else fabric = `${material} Weave`;

        // Assemble Tags
        const tags = ['New Arrival'];
        if (i % 4 === 0) tags.push('Best Seller');
        if (i % 5 === 0) tags.push('Trending');
        if (rating > 4.5) tags.push('Top Rated');
        if (discount > 40) tags.push('Festival Offer');
        if (cat === 'Sarees' || cat === 'Lehengas' || cat === 'Kurta' || cat === 'Nehru Jacket' || cat === 'Salwar Suits') {
          tags.push('Ethnic Collection');
        } else if (cat.includes('Formal') || cat === 'Trousers' || cat === 'Blazers') {
          tags.push('Office Collection');
        } else if (cat === 'Sportswear') {
          tags.push('Sportswear');
        } else {
          tags.push('Casual Collection');
        }

        if (i % 3 === 0) tags.push('Summer Collection');
        if (cat.includes('Jacket') || cat.includes('Sweater') || cat.includes('Hoodie')) {
          tags.push('Winter Collection');
        }

        const product: Product = {
          id,
          gender,
          category: cat,
          brand,
          name: productName,
          description: `Upgrade your daily style with this premium ${productName}. Carefully crafted in India using premium grade ${material} fabric, it combines rich textures, elegant drape, and unparalleled durability. Designed specifically for modern tastes while honoring traditional roots, this masterfully styled garment offers optimal comfort and breathable luxury for all-day wear. Perfectly suited for ${occasion.toLowerCase()}.`,
          mrp,
          price,
          discount,
          rating,
          reviewCount,
          reviews: generateReviews(id, rating),
          sku: `SKU-${gender.substring(0,2).toUpperCase()}-${cat.substring(0,3).toUpperCase()}-${id}`,
          availability: totalStock > 15 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock',
          totalStock,
          material,
          fabric,
          pattern,
          fit,
          sleeve: gender !== 'Accessories' ? sleeve : undefined,
          neck: gender !== 'Accessories' ? neck : undefined,
          occasion,
          washCare: i % 2 === 0 ? 'Machine Wash Cold, Gentle Cycle, Wash Dark Colors Separately' : 'Professional Dry Clean Recommended, Warm Iron if needed',
          countryOfOrigin: 'India',
          manufacturer: `${brand} Apparel India Private Limited, Sector 63, Noida, Uttar Pradesh, India`,
          returnPolicy: 'Easy 14-day hassle-free returns and exchanges in original packaging and tags intact.',
          deliveryInfo: 'Ships within 24-48 hours. Express delivery available across all major pincodes in India.',
          estimatedDeliveryDays: 2 + (i % 3),
          images,
          colors,
          sizes,
          tags
        };

        list.push(product);
      }
    });
  });

  return list;
}

// Instantiate database
export const PRODUCTS: Product[] = generateProducts();

// Search, filtering and helper functions
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getRelatedProducts(product: Product, limit: number = 8): Product[] {
  // Related by gender and category, or brand
  return PRODUCTS.filter(p => p.id !== product.id && p.gender === product.gender && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function getSimilarProducts(product: Product, limit: number = 8): Product[] {
  // Similar by category
  return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getTrendingProducts(limit: number = 12): Product[] {
  return PRODUCTS.filter(p => p.tags.includes('Trending')).slice(0, limit);
}

export function getNewArrivals(limit: number = 12): Product[] {
  return PRODUCTS.filter(p => p.tags.includes('New Arrival')).slice(0, limit);
}

export function getBestSellers(limit: number = 12): Product[] {
  return PRODUCTS.filter(p => p.tags.includes('Best Seller')).slice(0, limit);
}

export function getSeasonalCollection(season: 'Summer' | 'Winter' | 'Ethnic' | 'Office', limit: number = 12): Product[] {
  const tagName = `${season} Collection`;
  return PRODUCTS.filter(p => p.tags.includes(tagName)).slice(0, limit);
}

export function getBrandList(): string[] {
  const brands = new Set<string>();
  PRODUCTS.forEach(p => brands.add(p.brand));
  return Array.from(brands).sort();
}

export function getCategoryList(gender?: Gender): string[] {
  const categories = new Set<string>();
  PRODUCTS.forEach(p => {
    if (!gender || p.gender === gender) {
      categories.add(p.category);
    }
  });
  return Array.from(categories).sort();
}
