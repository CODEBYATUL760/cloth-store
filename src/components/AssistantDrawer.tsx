import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, Sparkles, Shirt, ShoppingBag, Eye, HelpCircle } from "lucide-react";
import { CartItem, Product } from "../types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  wishlist: string[];
  currentProduct?: Product;
  onNavigateToProduct: (productId: string) => void;
}

export default function AssistantDrawer({
  isOpen,
  onClose,
  cart,
  wishlist,
  currentProduct,
  onNavigateToProduct
}: AssistantDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "नमस्ते! Welcome to **MBA Kapdewala**. I am your personal AI Kapda Guide (कपड़ा सहायक). I can help you find beautiful clothes, select the right sizes, view active discount offers, or suggest trending styles. How can I help you today?"
        }
      ]);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    if (!textToSend) setInput("");
    
    const updatedMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Create chat history formatted for the backend
      const chatHistory = updatedMessages.slice(1, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Construct rich user context
      const userContext = {
        currentViewingProduct: currentProduct ? {
          id: currentProduct.id,
          name: currentProduct.name,
          category: currentProduct.category,
          price: currentProduct.price,
          subCategory: currentProduct.subCategory
        } : null,
        cartItems: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor
        })),
        wishlistCount: wishlist.length
      };

      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatHistory: chatHistory,
          userContext: userContext
        })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to style intelligence.");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered a momentary pause in my style database. Please try again in a moment, or continue browsing our exquisite new arrivals."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Suggest a Formal Outfit", text: "I need a highly sophisticated outfit for an evening luxury gala. What can you recommend from the collection?" },
    { label: "Size Guide Help", text: "Can you help me understand your size dimensions? I usually wear a Medium in men's shirts." },
    { label: "Gift Suggestions", text: "I am looking for an elegant gift under $150. What would you suggest?" },
    { label: "Style with This Item", text: currentProduct ? `What would pair beautifully with the ${currentProduct.name} I am currently viewing?` : "Show me your most trending winter outerwear." }
  ];

  // Helper to detect if a product ID is mentioned in the text and render a link
  const renderMessageContent = (content: string) => {
    // Basic Markdown bolding and line breaks
    const paragraphs = content.split("\n");
    return paragraphs.map((para, i) => {
      // Replace **text** with bold
      let formattedText: ReactNode = para;
      
      // Look for bold patterns
      if (para.includes("**")) {
        const parts = para.split("**");
        formattedText = parts.map((part, idx) => {
          if (idx % 2 === 1) {
            return <strong key={idx} className="font-semibold text-amber-500">{part}</strong>;
          }
          return part;
        });
      }

      return (
        <p key={i} className="mb-2 leading-relaxed text-sm text-gray-300">
          {formattedText}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="assistant-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            id="assistant-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col z-50 shadow-2xl h-full"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-amber-500/10 text-amber-500">
                  <Bot size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-white tracking-wide text-sm flex items-center gap-1.5">
                    Vogue AI Companion <Sparkles size={14} className="text-amber-500" />
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">Style & Fitting Guide</p>
                </div>
              </div>
              <button
                id="close-assistant-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Context Widget if looking at a product */}
            {currentProduct && (
              <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Eye size={12} className="text-amber-500" /> Currently viewing:
                </span>
                <button
                  onClick={() => onNavigateToProduct(currentProduct.id)}
                  className="text-white hover:text-amber-500 truncate max-w-[200px] font-medium transition-colors"
                >
                  {currentProduct.name}
                </button>
              </div>
            )}

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 ${
                      msg.role === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-none"
                        : "bg-zinc-900 text-gray-200 border border-zinc-800/80 rounded-tl-none"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1 mb-1 text-[9px] uppercase tracking-widest text-amber-500 font-mono">
                        <Bot size={10} /> Style Consultant
                      </div>
                    )}
                    <div>{msg.role === "user" ? <p className="text-sm leading-relaxed">{msg.content}</p> : renderMessageContent(msg.content)}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 rounded-tl-none max-w-[85%]">
                    <div className="flex items-center gap-1 mb-2 text-[9px] uppercase tracking-widest text-amber-500 font-mono">
                      <Bot size={10} /> Synthesizing styling advice...
                    </div>
                    <div className="flex space-x-1.5 items-center py-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Suggetions */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 py-2 bg-zinc-900/30 border-t border-zinc-900">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
                  <HelpCircle size={10} /> Frequently Asked or Style Topics:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.text)}
                      className="text-[11px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-full border border-zinc-800 transition-all text-left truncate max-w-full"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for outfit pairings, size details, or coupon eligibility..."
                  disabled={isLoading}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <button
                  type="submit"
                  id="send-message-btn"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 p-1.5 rounded-full bg-amber-500 text-black disabled:bg-zinc-800 disabled:text-zinc-600 transition-all"
                >
                  <Send size={14} />
                </button>
              </form>
              <p className="text-[9px] text-center text-zinc-500 mt-2 font-mono">
                Powered by Gemini 3.5 Flash • Curated style intelligence
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
