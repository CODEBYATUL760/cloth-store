/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'Men' | 'Women' | 'Kids' | 'Accessories';

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface SizeInfo {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
  stock: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  photos?: string[];
  likes: number;
}

export interface Product {
  id: string;
  gender: Gender;
  category: string; // e.g. 'T-Shirts', 'Sarees', 'Kurtas', 'Frocks'
  brand: string; // e.g. 'Allen Solly', 'Biba', etc.
  name: string;
  description: string;
  mrp: number; // Max Retail Price
  price: number; // Selling Price
  discount: number; // Discount percentage
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  sku: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  totalStock: number;
  
  // Specifications
  material: string;
  fabric: string;
  pattern: string;
  fit: string;
  sleeve?: string;
  neck?: string;
  occasion: string;
  washCare: string;
  countryOfOrigin: string;
  manufacturer: string;
  returnPolicy: string;
  deliveryInfo: string;
  estimatedDeliveryDays: number;

  // Visuals
  images: string[]; // [Front, Back, Side, Model, Close-up, Zoom, Lifestyle]
  colors: ColorVariant[];
  sizes: SizeInfo[];
  
  // Attributes for Collections
  tags: string[]; // e.g. ['Best Seller', 'New Arrival', 'Trending', 'Summer', 'Ethnic']
}

export interface CartItem {
  product: Product;
  selectedColor: ColorVariant;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
  quantity: number;
}

export interface OrderDetails {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  deliveryInstructions?: string;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  paymentStatus: 'Pending' | 'Paid';
  subtotal: number;
  discountAmount: number;
  savings: number;
  tax: number;
  shipping: number;
  total: number;
  isGift: boolean;
  giftMessage?: string;
}

export interface ProductFilters {
  gender: Gender[];
  category: string[];
  brand: string[];
  color: string[];
  size: string[];
  priceRange: [number, number];
  material: string[];
  pattern: string[];
  sleeve: string[];
  fit: string[];
  occasion: string[];
  discount: number; // minimum discount %
  rating: number; // minimum rating
  availability: string[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'popularity' | 'rating' | 'best-selling';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'cart' | 'wishlist';
  title: string;
  message: string;
}

