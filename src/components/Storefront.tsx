/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare, 
  Clock, 
  RotateCcw, 
  Truck, 
  CheckCircle, 
  Instagram, 
  Mail, 
  Compass, 
  User, 
  MapPin, 
  PhoneCall, 
  Check,
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  Plus,
  Trash2
} from "lucide-react";
import { Product } from "../types";
import { CATEGORIES } from "../data/products";
import SocialFeed from "./SocialFeed";
import { TRANSLATIONS, Language } from "../utils/translations";

interface StorefrontProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCartQuick: (product: Product, size: string, color: { name: string; hex: string }) => void;
  currency: "TZS" | "USD";
  language: Language;
  onOpenInstagram: () => void;
  mosseLogo: string;
  onAddProduct: (newProd: Product) => void;
  onRemoveProduct: (id: string) => void;
  isAdmin?: boolean;
}

export default function Storefront({
  products,
  onSelectProduct,
  onAddToCartQuick,
  currency,
  language,
  onOpenInstagram,
  mosseLogo,
  onAddProduct,
  onRemoveProduct,
  isAdmin = false
}: StorefrontProps) {
  const t = TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState("All Boutique");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subsEmail, setSubsEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedSize, setSelectedSize] = useState("");

  // Catalog Creator Form State Variables
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdBrand, setNewProdBrand] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Casual Wear");
  const [newProdPriceTZS, setNewProdPriceTZS] = useState(65000);
  const [newProdPriceUSD, setNewProdPriceUSD] = useState(25);
  const [newProdDescription, setNewProdDescription] = useState("");
  const [newProdSizes, setNewProdSizes] = useState<string[]>([]);
  const [newProdCustomSizes, setNewProdCustomSizes] = useState("");
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdImagePreset, setNewProdImagePreset] = useState("blazer");
  const [newProdCustomImage, setNewProdCustomImage] = useState("");
  const [newProdColor, setNewProdColor] = useState("Sartorial Black");
  const [newProdHex, setNewProdHex] = useState("#000000");
  const [adminErrors, setAdminErrors] = useState("");

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminErrors("");

    // Determine final sizing array
    let finalSizes = [...newProdSizes];
    if (newProdCustomSizes.trim()) {
      const customArray = newProdCustomSizes
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);
      finalSizes = [...finalSizes, ...customArray];
    }

    // Deduplicate sizes
    finalSizes = Array.from(new Set(finalSizes));

    if (finalSizes.length === 0) {
      setAdminErrors("Gentleman, you must specify/select at least one size for your garment.");
      return;
    }

    // Photo defaults mapping
    let defaultImgs = [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800"
    ];
    if (newProdImagePreset === "boots") {
      defaultImgs = ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800"];
    } else if (newProdImagePreset === "shorts") {
      defaultImgs = ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800"];
    } else if (newProdImagePreset === "shirt") {
      defaultImgs = ["https://images.unsplash.com/photo-1620012253295-c05518e99309?auto=format&fit=crop&q=80&w=800"];
    } else if (newProdImagePreset === "watch") {
      defaultImgs = ["https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800"];
    } else if (newProdImagePreset === "bomber") {
      defaultImgs = ["https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800"];
    } else if (newProdImagePreset === "custom" && newProdCustomImage.trim()) {
      defaultImgs = [newProdCustomImage.trim()];
    }

    // Build the beautiful Product object structure
    const newSku = `MS-${newProdCategory.substring(0,2).toUpperCase()}-${newProdBrand.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      name: `${newProdName.trim()}`,
      brand: newProdBrand.trim(),
      priceTZS: newProdPriceTZS,
      priceUSD: newProdPriceUSD,
      category: newProdCategory,
      images: defaultImgs,
      rating: 5.0,
      ratingCount: 12,
      stock: newProdStock,
      description: newProdDescription.trim(),
      sizes: finalSizes,
      colors: [
        { name: newProdColor.trim() || 'Custom Hue', hex: newProdHex }
      ],
      details: [
        `Brand: ${newProdBrand.trim()}`,
        "Collection: House of Switch Customized Drop",
        `Primary Tint: ${newProdColor.trim()}`,
        "Delivery: Instant Regional Express under 24 hrs"
      ],
      sku: newSku,
      isNewArrival: true
    };

    onAddProduct(newProduct);

    // Reset fields for pristine workflow
    setNewProdName("");
    setNewProdCustomSizes("");
    setNewProdDescription("");
    setNewProdSizes([]);
    setNewProdBrand("");
    setIsAdminPanelOpen(false);
  };

  const formatPrice = (value: number) => {
    if (currency === "TZS") {
      return `${value.toLocaleString()} TZS`;
    }
    return `$${value}`;
  };

  const filteredProducts = (() => {
    // 1. Filter by category
    let result = activeCategory === "All Boutique"
      ? products
      : products.filter(p => p.category === activeCategory);

    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.details.some(d => d.toLowerCase().includes(q))
      );
    }

    // 3. Filter by size
    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    // 4. Sort
    return [...result].sort((a, b) => {
      if (sortOption === "price-low") {
        const aPrice = currency === "TZS" ? a.priceTZS : a.priceUSD;
        const bPrice = currency === "TZS" ? b.priceTZS : b.priceUSD;
        return aPrice - bPrice;
      }
      if (sortOption === "price-high") {
        const aPrice = currency === "TZS" ? a.priceTZS : a.priceUSD;
        const bPrice = currency === "TZS" ? b.priceTZS : b.priceUSD;
        return bPrice - aPrice;
      }
      if (sortOption === "rating") {
        return b.rating - a.rating;
      }
      if (sortOption === "bestseller") {
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
      return 0; // default (no sort)
    });
  })();

  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subsEmail.includes("@")) {
      alert("Gentleman, please input a valid email address.");
      return;
    }
    setEmailSubscribed(true);
    setSubsEmail("");
  };

  return (
    <div className="space-y-16 animate-fadeIn">
      
      {/* 1. Cinematic Luxury Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-black aspect-[16/9] md:aspect-[21/9] min-h-[400px] border border-neutral-800/80 shadow-2xl flex items-center p-6 md:p-12 lg:p-16">
        {/* BG Cinematic Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1800" 
            alt="Men's fashion luxury tailoring" 
            className="w-full h-full object-cover object-top opacity-40 brightness-75 transition-transform duration-1000 hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent"></div>
        </div>

        {/* Content Desk */}
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-amber-500/15 text-amber-500 border border-amber-500/20 rounded-md">
              {language === "SW" ? "Uzinduzi wa Duka la Mtandaoni" : "E-Commerce Flagship Launch"}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.deliveryLive}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] uppercase font-sans">
            {t.heroTitle} <br />
            <span className="text-amber-500">{t.heroTitleYellow}</span>
          </h1>

          <p className="text-neutral-300 text-xs md:text-sm leading-relaxed max-w-lg font-sans">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <a 
              href="#boutique-catalog" 
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] font-extrabold tracking-widest uppercase rounded-lg transition-colors cursor-pointer font-mono shadow-lg shadow-amber-500/15"
            >
              {t.examineCatalogue}
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=255767542687&text=Habari Mosse Store Mwanza! Nimeona catalogue yenu online na nilitaka kufanya manunuzi. Naomba msaada tafadhali."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-[10px] font-extrabold tracking-widest uppercase rounded-lg transition-colors cursor-pointer font-mono inline-flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === "SW" ? "Agiza Moja kwa Moja WhatsApp" : "Order via WhatsApp Direct"}</span>
            </a>
          </div>

          {/* Core Trust Indicators (CRO Conversion triggers) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-6 border-t border-neutral-850 max-w-lg">
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 uppercase font-mono">
              <Truck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.nextHourDelivery}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 uppercase font-mono">
              <RotateCcw className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.zeroFrictionSwaps}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 uppercase font-mono col-span-2 md:col-span-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.secureCheckout}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Segments Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-md font-mono tracking-widest text-neutral-400 uppercase font-bold">
              {language === "SW" ? "Chagua Aina ya Nguo" : "Shop Curated Niches"}
            </h2>
            <p className="text-xs text-neutral-500">
              {language === "SW" ? "Nguo zilizopangwa kwa makundi kukusaidia kufanya chaguzi maridadi." : "Filtered micro-segments to align with your styling goals."}
            </p>
          </div>
          <Compass className="w-5 h-5 text-neutral-600" />
        </div>

        {/* Categories selector button list */}
        <div className="flex flex-wrap gap-2.5 pb-2 border-b border-neutral-800/60">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const catalogEl = document.getElementById("boutique-catalog");
                catalogEl?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                activeCategory === cat 
                  ? "bg-amber-500/10 border-amber-500 text-amber-400" 
                  : "bg-neutral-950/20 border-neutral-850 text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Core Catalogue / Active Products list */}
      <section id="boutique-catalog" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{language === "SW" ? "Katalogi ya Bidhaa" : "Active Catalog drops"}</span>
              <span className="text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-normal">
                {filteredProducts.length} {language === "SW" ? "Zilizopo" : "drops"}
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              {language === "SW" 
                ? "Dhibiti machaguo kwa kutamfuta au kusafisha kwa vipimo ili uwe dapper." 
                : "Explore luxury streetwear. Real-time query matching makes finding your perfect fit immediate."}
            </p>
          </div>

          {/* Active Filters Clear Button if search/size isActive */}
          {(searchQuery || selectedSize || sortOption !== "default" || activeCategory !== "All Boutique") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSize("");
                setSortOption("default");
                setActiveCategory("All Boutique");
              }}
              className="text-xs font-mono font-bold text-amber-500 hover:text-amber-450 flex items-center gap-1.5 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === "SW" ? "Rudisha Chujio Zote" : "Reset All Filters"}</span>
            </button>
          )}
        </div>

        {/* Dynamic Navigation/Filter Dashboard Bar */}
        <div className="p-4 bg-neutral-950/80 border border-neutral-900 rounded-2xl gap-4 flex flex-col md:flex-row md:items-center justify-between">
          
          {/* SEARCH INTEGRATION */}
          <div className="w-full md:max-w-md relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "SW" ? "Tafuta neno mf. 'Jeans', 'Suede', 'Suit'..." : "Search luxury items by name, SKU, details..."}
              className="w-full bg-neutral-900/60 text-white text-xs border border-neutral-800 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-amber-500/50 focus:bg-neutral-950 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* SORT INTEGRATION */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
              {language === "SW" ? "Panga Kwa" : "Sort By"}:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-neutral-900/60 text-neutral-200 text-xs border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-500/50 cursor-pointer min-w-[170px] font-mono uppercase font-bold text-[10px] tracking-wider"
            >
              <option value="default" className="bg-neutral-950 text-white font-mono">{language === "SW" ? "Bora Zaidi" : "Recommended"}</option>
              <option value="price-low" className="bg-neutral-950 text-white font-mono">{language === "SW" ? "Bei: Chini hadi Juu" : "Price: Low to High"}</option>
              <option value="price-high" className="bg-neutral-950 text-white font-mono">{language === "SW" ? "Bei: Juu hadi Chini" : "Price: High to Low"}</option>
              <option value="rating" className="bg-neutral-950 text-white font-mono">{language === "SW" ? "Kadirio la Juu" : "Top Client Rated"}</option>
              <option value="bestseller" className="bg-neutral-950 text-white font-mono">{language === "SW" ? "Inayouzika Sana" : "Best Sellers First"}</option>
            </select>
          </div>
        </div>

        {/* ULTRA-DETAILED QUICK SIZING SELECTION BLOCK */}
        <div className="p-4 bg-neutral-950/40 border border-neutral-900/80 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{language === "SW" ? "Chuja kwa Kipimo (" + (selectedSize || "Nguo Vyote") + ")" : "Filter by Exact Size (" + (selectedSize || "Show All") + ")"}</span>
            </span>
            {selectedSize && (
              <button 
                onClick={() => setSelectedSize("")}
                className="text-[9px] font-mono uppercase bg-amber-500/10 hover:bg-amber-500/15 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 transition-colors"
              >
                {language === "SW" ? "Onyesha Vipimo Vyote" : "Show All Sizes"}
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {/* Tops */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[9px] font-mono text-neutral-500 uppercase w-16 text-left shrink-0">{language === "SW" ? "Shati/Koti" : "Tops/Coats"}:</span>
              <div className="flex flex-wrap gap-1">
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer font-bold ${selectedSize === size ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/15" : "bg-neutral-900/30 hover:bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Pants */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[9px] font-mono text-neutral-500 uppercase w-16 text-left shrink-0">{language === "SW" ? "Jeans/Kaptula" : "Denim/Pants"}:</span>
              <div className="flex flex-wrap gap-1">
                {["28", "30", "32", "34", "36"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer font-bold ${selectedSize === size ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/15" : "bg-neutral-900/30 hover:bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"}`}
                  >
                    W{size}
                  </button>
                ))}
              </div>
            </div>

            {/* Footwear */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[9px] font-mono text-neutral-500 uppercase w-16 text-left shrink-0">{language === "SW" ? "Viatu" : "Footwear"}:</span>
              <div className="flex flex-wrap gap-1">
                {["40", "41", "42", "43", "44", "45"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer font-bold ${selectedSize === size ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/15" : "bg-neutral-900/30 hover:bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"}`}
                  >
                    Size {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Suits */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[9px] font-mono text-neutral-500 uppercase w-16 text-left shrink-0">{language === "SW" ? "Suti" : "Suits"}:</span>
              <div className="flex flex-wrap gap-1">
                {["46R", "48R", "50R", "52R", "54R"].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-all cursor-pointer font-bold ${selectedSize === size ? "bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/15" : "bg-neutral-900/30 hover:bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOUTIQUE INVENTORY CONTROL DESK (Requested feature) */}
        {isAdmin && (
          <div className="bg-neutral-950/90 border border-neutral-900 rounded-2xl overflow-hidden p-4 md:p-6 space-y-4 shadow-lg shadow-amber-500/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1 px-1.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/15 font-mono text-[9px] uppercase font-bold tracking-widest leading-none">
                ADMIN CONSOLE
              </span>
              <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-neutral-200">
                {language === "SW" ? "Kidhibiti cha Katalogi (Ongeza / Punguza)" : "Boutique Inventory Control Desk"}
              </h3>
            </div>
            
            <button
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-[10px] text-amber-500 border border-neutral-800 rounded-lg font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAdminPanelOpen 
                ? (language === "SW" ? "Funga Jopo la Udhibiti" : "Hide Dashboard Form") 
                : (language === "SW" ? "Ongeza Mavazi Mapya" : "Add Custom Garments")}
              </span>
              <svg 
                className={`w-3 h-3 transition-transform ${isAdminPanelOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <p className="text-[11px] text-neutral-450 leading-relaxed font-sans max-w-2xl">
            {language === "SW" 
              ? "Ongeza nguo mpya zenye size, chapa (brand), na bei yako kwenye katalogi au ondoa nguo zozote moja kwa moja kwa kubonyeza kitufe cha 'X' kilicho juu ya kila picha." 
              : "Upgrade the boutique catalog dynamically! Create custom items with custom brands, size guides, and localized TZS/USD rates instantly. Press the red trash icon on any clothing card below to withdraw garments."}
          </p>

          {isAdminPanelOpen && (
            <form 
              onSubmit={handleCreateProduct}
              className="pt-4 border-t border-neutral-900/80 grid grid-cols-1 md:grid-cols-12 gap-5 text-xs text-neutral-300 font-sans"
            >
              {/* Product Name */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Garment/Product Name *</label>
                <input 
                  type="text" 
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g., MOSSE Premium Wool Suit"
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Brand */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Brand Label Name *</label>
                <input 
                  type="text" 
                  required
                  value={newProdBrand}
                  onChange={(e) => setNewProdBrand(e.target.value)}
                  placeholder="e.g., MOSSE Tanzania"
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Category */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Boutique Category *</label>
                <select 
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer font-sans"
                >
                  <option value="Casual Wear">Casual Wear</option>
                  <option value="Denim & Shorts">Denim & Shorts</option>
                  <option value="Formal Wear">Formal Wear</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Stock */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Stock Count *</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(parseInt(e.target.value) || 1)}
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              {/* Price TZS */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Price (TZS) *</label>
                <input 
                  type="number" 
                  required
                  min="1000"
                  value={newProdPriceTZS}
                  onChange={(e) => {
                    const tzsValue = parseInt(e.target.value) || 0;
                    setNewProdPriceTZS(tzsValue);
                    setNewProdPriceUSD(Math.round(tzsValue / 2600));
                  }}
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              {/* Price USD */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Price (USD) equivalent *</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={newProdPriceUSD}
                  onChange={(e) => setNewProdPriceUSD(parseInt(e.target.value) || 0)}
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                />
              </div>

              {/* Predefined Image Choices (Extremely helpful for quick test cycles) */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Choose Image Preset *</label>
                <select 
                  value={newProdImagePreset}
                  onChange={(e) => setNewProdImagePreset(e.target.value)}
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer font-sans"
                >
                  <option value="blazer">Elegant Luxury Blazer / Suit Jacket</option>
                  <option value="boots">Handcrafted Italian Suede Boots</option>
                  <option value="shorts">Classic Denim Cargo Shorts</option>
                  <option value="shirt">Smart Tailored Cotton Shirt</option>
                  <option value="watch">Premium Automatic Chrono Watch</option>
                  <option value="bomber">Casual Split Suede Bomber Jacket</option>
                  <option value="custom">-- Custom Outer URL Link below --</option>
                </select>
              </div>

              {/* Custom Image input URL */}
              <div className="md:col-span-3 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Or Custom Image URL</label>
                <input 
                  type="url" 
                  value={newProdCustomImage}
                  onChange={(e) => {
                    setNewProdCustomImage(e.target.value);
                    setNewProdImagePreset("custom");
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Sizes Selector */}
              <div className="md:col-span-6 space-y-2">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Select Available Sizes *</label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                  {["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "40", "41", "42", "43", "44", "45"].map(size => {
                    const isSelected = newProdSizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => {
                          if (isSelected) {
                            setNewProdSizes(newProdSizes.filter(s => s !== size));
                          } else {
                            setNewProdSizes([...newProdSizes, size]);
                          }
                        }}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded font-bold border transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-amber-500 border-amber-500 text-neutral-950" 
                            : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Sizes text field (comma separated) */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Or Custom Sizes (separated by comma)</label>
                <input 
                  type="text" 
                  value={newProdCustomSizes}
                  onChange={(e) => setNewProdCustomSizes(e.target.value)}
                  placeholder="e.g., 38R, 40R, CustomSize"
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Color Name */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Primary Color Name *</label>
                <input 
                  type="text" 
                  required
                  value={newProdColor}
                  onChange={(e) => setNewProdColor(e.target.value)}
                  placeholder="e.g., Tan Brown Suede"
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Hex code */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Hex Color Accent *</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={newProdHex}
                    onChange={(e) => setNewProdHex(e.target.value)}
                    className="w-10 h-9 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer"
                  />
                  <input 
                    type="text" 
                    required
                    value={newProdHex}
                    onChange={(e) => setNewProdHex(e.target.value)}
                    className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg px-2 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-6 space-y-1.5">
                <label className="block text-neutral-400 font-mono uppercase text-[9px] tracking-wider">Garment Description *</label>
                <textarea 
                  required
                  rows={2}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  placeholder="Crafted from premium fabrics styled with classic menswear aesthetics..."
                  className="w-full bg-neutral-900 text-white border border-neutral-800 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500/50 resize-y font-sans"
                />
              </div>

              {/* Submit button */}
              <div className="md:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-neutral-900/80">
                {adminErrors ? (
                  <p className="text-xs text-rose-500 font-mono">{adminErrors}</p>
                ) : (
                  <p className="text-[10px] text-neutral-500 font-mono">
                    * denotes required field. Item will instantly merge live in the active storefront database.
                  </p>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black uppercase text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-neutral-950 stroke-[3]" />
                  <span>Publish to Active Boutique</span>
                </button>
              </div>
            </form>
          )}
        </div>
        )}

        {/* EMPTY FILTER STATE */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-800 rounded-3xl space-y-5 bg-neutral-950/20 max-w-xl mx-auto shadow-inner">
            <div className="mx-auto w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 text-neutral-400">
              <Search className="w-5 h-5 text-neutral-500" />
            </div>
            <div className="space-y-1.5 px-4 font-sans">
              <h3 className="text-sm font-bold font-mono text-neutral-200 uppercase tracking-widest">
                {language === "SW" ? "Hakuna Mavazi Yaliyopatikana" : "No Sartorial Masterpieces Found"}
              </h3>
              <p className="text-xs text-neutral-450 leading-relaxed max-w-xs mx-auto">
                {language === "SW" 
                  ? "Hatukupata nguo kulingana na chujio zako. Jaribu kupunguza herufi au kufuta vipimo vilivyochaguliwa." 
                  : "We couldn't locate any catalog drops matching your selected filters. Try searching for other terms or relaxing your constraints."}
              </p>
            </div>
            
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSize("");
                setSortOption("default");
                setActiveCategory("All Boutique");
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] font-extrabold tracking-widest uppercase rounded-lg transition-colors font-mono cursor-pointer"
            >
              {language === "SW" ? "Futa Machaguo Yote" : "Reset All Active Filters"}
            </button>
          </div>
        ) : (
          /* Product Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const pPrice = currency === "TZS" ? p.priceTZS : p.priceUSD;
              return (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="group p-3 bg-neutral-950/40 border border-neutral-850 rounded-xl hover:border-amber-500/40 hover:bg-neutral-950/60 transition-all cursor-pointer flex flex-col justify-between"
                  id={`prod-card-${p.id}`}
                >
                  <div>
                    {/* Thumbnail display desk */}
                    <div className="aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden relative border border-neutral-800/80 mb-3.5">
                      <img 
                        src={p.images[0]} 
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />

                      {/* Dynamic Deletion Hook (Admin/Customer Pruning Option) */}
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveProduct(p.id);
                          }}
                          className="absolute top-2.5 left-2.5 p-2 bg-neutral-950/90 hover:bg-rose-950/95 text-neutral-400 hover:text-rose-450 border border-neutral-800 hover:border-rose-800/40 rounded-xl transition-all shadow-xl z-20 cursor-pointer"
                          title={language === "SW" ? "Ondoa bidhaa hii" : "Remove this product from catalog"}
                        >
                          <Trash2 className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      )}

                      {/* Sizing pill */}
                      <div className="absolute bottom-3 left-3 flex gap-1 z-10">
                        {p.isBestSeller && (
                          <span className="px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase bg-amber-500 text-neutral-950 font-bold rounded shadow">
                            Best Seller
                          </span>
                        )}
                        {p.stock <= 4 && (
                          <span className="px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase bg-rose-600 text-white font-extrabold rounded animate-pulse shadow">
                            Low Stock ({p.stock})
                          </span>
                        )}
                      </div>

                      {/* Sizing Match Overlay Feedback Badge */}
                      {selectedSize && p.sizes.includes(selectedSize) && (
                        <div className="absolute top-2 right-2 px-2.5 py-1 bg-emerald-500/90 text-neutral-950 text-[9px] font-mono font-black uppercase rounded-md tracking-wider flex items-center gap-0.5 shadow-lg border border-emerald-400/20 z-10 animate-bounce">
                          <Check className="w-2.5 h-2.5 stroke-[4]" />
                          <span>Fits {selectedSize}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono tracking-wide uppercase text-neutral-450 mt-1">
                      <span>{p.category}</span>
                      {p.brand && (
                        <span className="text-[9px] font-mono tracking-widest text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded font-extrabold uppercase border border-amber-500/15">
                          {p.brand}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wide line-clamp-1 mt-1.5 font-sans group-hover:text-amber-400 transition-colors">
                      {p.name}
                    </h3>

                    {/* Sizings tag list preview */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.sizes.map(size => {
                        const isFiltered = selectedSize === size;
                        return (
                          <span 
                            key={size}
                            className={`text-[8px] font-mono px-1.5 py-0.2 rounded border font-bold uppercase ${isFiltered ? "bg-amber-500 border-amber-500 text-neutral-950" : "bg-neutral-900 border-neutral-850 text-neutral-400"}`}
                          >
                            {size}
                          </span>
                        );
                      })}
                    </div>

                    {/* Rating summary */}
                    <div className="flex items-center gap-1.5 mt-2.5 pt-1.5 border-t border-neutral-900/60">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span className="text-[10px] text-neutral-300 font-mono">{p.rating} ({p.ratingCount} {language === "SW" ? "waungwana" : "gentlemen"})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-850/60">
                    <span className="text-xs font-mono font-bold text-amber-500">{formatPrice(pPrice)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // preserve click triggers for main select
                        onAddToCartQuick(p, p.sizes[0], p.colors[0]);
                      }}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-amber-500 border border-neutral-800 hover:border-amber-500 text-neutral-300 hover:text-neutral-950 font-bold font-mono text-[9px] uppercase rounded-lg transition-colors cursor-pointer"
                      id={`quick-add-${p.id}`}
                    >
                      + Tailored Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. 'Why Choose Mosse Store' Authority Block */}
      <section className="bg-neutral-950/70 p-6 md:p-8 border border-neutral-850 rounded-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <h2 className="text-md font-mono tracking-widest text-amber-500 uppercase font-bold">
            The Mosse Security Standard
          </h2>
          <p className="text-sm font-bold text-white">Engineering absolute purchase security across East Africa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 border-r border-neutral-850/60 last:border-0 pr-0 md:pr-4">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg inline-block">
              <Truck className="w-5 h-5 animate-pulse" />
            </span>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">
              Mikoani Tunatuma (Tanzania & Kenya)
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              Sisi hutuma mikoani kote kwa mabasi ya uhakika (Regional Express Buses) nchini kote (Tanzania & Kenya). Mzigo wako utaufikia kwa usalama ndani ya masaa 24! Mwanza wateja wanaweza kuchukua ofisini kwetu Malimbe au kupelekewa na boda.
            </p>
          </div>

          <div className="space-y-2 border-r border-neutral-850/60 last:border-0 pr-0 md:pr-4">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg inline-block">
              <RotateCcw className="w-5 h-5" />
            </span>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Zero-friction Sizes Swaps
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Una wasiwasi kuhusu vipimo au size ya kiatu? Ondoa shaka. Mosse inatoa sera ya siku 7 ya kubadilisha size. Tunatumia courier kurejesha au kubadilisha bidhaa yako ili uwe dapper.
            </p>
          </div>

          <div className="space-y-2">
            <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg inline-block">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </span>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              COD / Mobile Money Handshake
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Never risk your savings. Transact safely via Cash on Delivery or send Lipa-Namba M-Pesa payments only after you run your sensory physical assessments of our fibers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Styled Modern Instagram Feed for Trust building */}
      <section className="space-y-4">
        <SocialFeed 
          currency={currency} 
          language={language}
          onAddToCartQuick={onAddToCartQuick} 
          onSelectProduct={onSelectProduct} 
          onOpenInstagram={onOpenInstagram}
          mosseLogo={mosseLogo}
        />
      </section>

      {/* 6. Dynamic Premium Newsletter subscription */}
      <section className="bg-gradient-to-br from-neutral-900 to-neutral-950/80 border border-neutral-800 p-6 md:p-10 rounded-2xl text-center space-y-6 relative overflow-hidden">
        
        {/* Subtle decorative gold light */}
        <div className="absolute right-0 top-0 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-md mx-auto space-y-3 relative z-10">
          <span className="p-2.5 bg-amber-500/15 border border-amber-500/25 text-amber-500 rounded-full inline-block">
            <Mail className="w-5 h-5 text-amber-500" />
          </span>
          <h3 className="text-md md:text-lg font-bold text-white uppercase tracking-wider font-sans">
            Acquire Exclusive MOSSE Drops
          </h3>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
            Subscribe to lock in pre-release catalogs before they scale to social media, exclusive fitting codes, and dapper style blueprints.
          </p>

          {emailSubscribed ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-lg text-xs leading-relaxed inline-flex items-center gap-2 animate-scaleUp">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Congratulations Gentleman! Your 10% welcome token <strong>GENTLEMAN</strong> is live. Use it at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Gentleman's Personal Email..."
                value={subsEmail}
                onChange={(e) => setSubsEmail(e.target.value)}
                className="flex-1 bg-neutral-950 text-white text-xs border border-neutral-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] font-extrabold tracking-widest uppercase rounded-lg transition-colors cursor-pointer font-mono"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-neutral-850 pt-10 text-neutral-400 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 Brand definition */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
              <span className="text-sm font-extrabold text-white uppercase tracking-widest font-sans">
                MOSSE STORE
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
              MOSSE STORE (Moses Fashion) is Tanzania's ultimate destination of denim streetwear, designer pants, and dapper wear. Our physical studio sits in Mwanza with premium shipping countrywide.
            </p>
            <div className="flex gap-3 text-neutral-500 text-xs font-mono">
              <span>TZ/EA Flagship</span>
              <span>•</span>
              <span>Boutique v1.0</span>
            </div>
          </div>

          {/* Col 2 Catalog references */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] font-sans">
              Boutique Indexes
            </h4>
            <div className="space-y-2 flex flex-col">
              <a href="#boutique-catalog" className="hover:text-amber-500 transition-colors">Sartorial Royal Navy Suit</a>
              <a href="#boutique-catalog" className="hover:text-amber-500 transition-colors">Suede Chelsea Boots Oasis</a>
              <a href="#boutique-catalog" className="hover:text-amber-500 transition-colors">President Chronograph Quartz</a>
              <a href="#boutique-catalog" className="hover:text-amber-500 transition-colors">Suede Pilot Bomber Jacket</a>
            </div>
          </div>

          {/* Col 3 Legal safeguards */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              Customer Protection
            </h4>
            <div className="space-y-2 flex flex-col">
              <span className="text-neutral-400 cursor-not-allowed">7-Day Swap Logistics</span>
              <span className="text-neutral-400 cursor-not-allowed">Direct Boda Track-&-Trace</span>
              <span className="text-neutral-400 cursor-not-allowed">Terms of Dignity</span>
              <span className="text-neutral-400 cursor-not-allowed">Privacy Safeguards</span>
            </div>
          </div>

          {/* Col 4 Direct physical showroom info */}
          <div className="space-y-3 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              Physical Studio
            </h4>
            <div className="space-y-2 text-neutral-300 font-sans">
              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Malimbe Area, Mwanza, Tanzania (Near St. Augustine University - SAUT)</span>
              </div>
              <div className="flex items-center gap-2 text-xs pt-1">
                <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                <a 
                  href="https://api.whatsapp.com/send?phone=255767542687" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-500 underline text-emerald-400"
                >
                  +255 767 542 687 (Call & WhatsApp)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-850 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 pb-2 font-mono">
          <span>© 2026 Mosse Store. Built under Moses Fashion with premium craft.</span>
          <span>Mwanza Studio • Tanzania Registry No. 553-A88</span>
        </div>
      </footer>
    </div>
  );
}
