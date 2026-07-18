import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set.");
}

// Store basic catalog summaries for Gemini context to keep token usage clean and recommendations real
const miniCatalog = [
  { id: "m-1", name: "Premium Velvet Tuxedo", category: "Men", subCategory: "Formal Wear", price: 249, rating: 4.9, colors: ["Black", "Midnight Blue"], sizes: ["S", "M", "L", "XL"] },
  { id: "m-2", name: "Classic Merino Wool Sweater", category: "Men", subCategory: "Winter Wear", price: 129, rating: 4.8, colors: ["Charcoal", "Camel", "Olive"], sizes: ["S", "M", "L", "XL"] },
  { id: "m-3", name: "Sartorial Silk Blend Shirt", category: "Men", subCategory: "Formal Wear", price: 95, rating: 4.7, colors: ["Champagne", "Pearl White", "Obsidian"], sizes: ["M", "L", "XL"] },
  { id: "m-4", name: "Urban Comfort Chino Pants", category: "Men", subCategory: "Casual Wear", price: 85, rating: 4.6, colors: ["Khaki", "Navy", "Black"], sizes: ["30", "32", "34", "36"] },
  { id: "w-1", name: "Silk Satin Slip Gown", category: "Women", subCategory: "Formal Wear", price: 189, rating: 4.9, colors: ["Gold Accent", "Emerald", "Ruby Red"], sizes: ["XS", "S", "M", "L"] },
  { id: "w-2", name: "Cashmere Trench Coat", category: "Women", subCategory: "Winter Wear", price: 349, rating: 5.0, colors: ["Beige Camel", "Slate Gray"], sizes: ["S", "M", "L"] },
  { id: "w-3", name: "Signature Linen Day Dress", category: "Women", subCategory: "Casual Wear", price: 110, rating: 4.7, colors: ["Off-White", "Sage Green", "Amber"], sizes: ["XS", "S", "M", "L", "XL"] },
  { id: "w-4", name: "Vegan Leather Biker Jacket", category: "Women", subCategory: "Casual Wear", price: 165, rating: 4.8, colors: ["Matte Black", "Espresso Brown"], sizes: ["S", "M", "L"] },
  { id: "a-1", name: "Vogue Chronograph Watch", category: "Accessories", subCategory: "Watches", price: 299, rating: 4.9, colors: ["Rose Gold", "Silver/Black"], sizes: ["OS"] },
  { id: "a-2", name: "Italian Saffiano Leather Tote", category: "Accessories", subCategory: "Bags", price: 195, rating: 4.8, colors: ["Ebony Black", "Tan Camel"], sizes: ["OS"] },
  { id: "f-1", name: "Monolith Leather Chelsea Boots", category: "Footwear", subCategory: "Boots", price: 180, rating: 4.7, colors: ["Polished Black", "Suede Brown"], sizes: ["40", "41", "42", "43", "44"] },
  { id: "k-1", name: "Kids organic Cotton Overalls", category: "Kids", subCategory: "Casual Wear", price: 45, rating: 4.8, colors: ["Denim Blue", "Soft Mustard"], sizes: ["2Y", "4Y", "6Y", "8Y"] }
];

// Assistant API endpoint
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, chatHistory, userContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!ai) {
      return res.json({
        text: "I would love to help you find the perfect outfit! However, my AI brain is currently waiting for the GEMINI_API_KEY environment variable to be configured in the Secrets panel. For now, I can tell you that Urban Vogue represents the pinnacle of premium streetwear and formal fashion, featuring Merino sweaters, velvet tuxedos, and Italian leather accessories!"
      });
    }

    const systemInstruction = `You are "Vogue AI", the highly polished, extremely helpful and professional luxury shopping assistant for "Urban Vogue".
You speak with elegant tone, using warm, premium vocabulary. You specialize in fashion advice, product recommendation, size suggestions, gift ideas, and styling.

Here is a curated snapshot of our actual premium product catalog:
${JSON.stringify(miniCatalog, null, 2)}

Instructions:
1. Always reference our products or styles (like Velvet Tuxedo, Cashmere Coat, Vogue Chronograph, Monolith Boots) when recommending.
2. If the user asks for sizes, help them with our guide: XS (Bust: 32", Waist: 24"), S (Bust: 34", Waist: 26"), M (Bust: 36", Waist: 28"), L (Bust: 38", Waist: 30"), XL (Bust: 40", Waist: 32"). For Men's shirts/jackets: S (Chest: 38"), M (Chest: 40"), L (Chest: 42"), XL (Chest: 44").
3. Keep answers elegant, helpful, relatively concise (2-3 paragraphs max), and well-formatted with markdown lists or bold text.
4. If they have items in their cart or are browsing specific categories (passed in userContext), tailor your answers to that context.
User Context: ${JSON.stringify(userContext || {})}`;

    // Prepare chat context including history
    const contents: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((turn: any) => {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.content }],
        });
      });
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I am here to guide you through Urban Vogue's exclusive collections. How may I elevate your style today?";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in AI assistant endpoint:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating style recommendations." });
  }
});

// Configure Vite or serve static production build
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Urban Vogue server running on http://localhost:${PORT}`);
  });
}

setupServer();
