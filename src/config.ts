// Customizable Configuration for MBA Kapdewala / Indore & Bhopal Clothing Showrooms

export const STORE_CONFIG = {
  storeName: "MBA Kapdewala",
  tagline: "The Premium Men's Wardrobe",
  taglineHindi: "Modern Premium Menswear Showroom",
  logoText: "MBA KAPDEWALA",
  phoneNumber: "+91 98260 98260", // Fictional premium Bhopal / Indore contact
  whatsappNumber: "919826098260", // Format: CountryCode + Number without '+' or '00'
  emailAddress: "contact@mbakapdewala.com",
  brandColorTheme: "amber", // Tailwind color family used: amber/orange/zinc
  
  // Locations of modern physical Indian showrooms
  showrooms: [
    {
      city: "Bhopal",
      address: "Zone-II, M.P. Nagar, Near Jyoti Talkies, Bhopal, MP - 462011",
      timing: "10:30 AM - 9:30 PM (All Days Open)",
      mapEmbedLink: "https://www.google.com/maps"
    },
    {
      city: "Indore",
      address: "MG Road, Opposite Treasure Island Mall, Indore, MP - 452001",
      timing: "10:30 AM - 9:30 PM (All Days Open)",
      mapEmbedLink: "https://www.google.com/maps"
    }
  ],
  
  // Custom discounts or coupon values
  welcomeCouponCode: "WELCOME500",
  welcomeCouponValue: 500,
  freeShippingMinSpend: 1499,
  flatShippingCharge: 99
};
