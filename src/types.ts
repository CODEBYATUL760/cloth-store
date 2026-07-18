export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: "Men" | "Women" | "Kids" | "Footwear" | "Accessories";
  subCategory: "Casual Wear" | "Formal Wear" | "Sportswear" | "Winter Wear" | "Ethnic Wear" | "Watches" | "Bags" | "Boots" | "Sneakers";
  brand: string;
  price: number;
  mrp: number; // Maximum Retail Price (for discounts)
  discount: number; // discount percentage
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  description: string;
  features: string[];
  fabric: string;
  washCare: string;
  deliveryInfo: string;
  returnPolicy: string;
  rating: number;
  reviews: Review[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  minSpend: number;
  description: string;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  shippingAddress: Address;
  paymentMethod: string;
  status: "Placed" | "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  trackingHistory: { status: string; date: string; description: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[]; // product IDs
}
