/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "MOSSE Elite Sartorial Royal Navy Suit",
    priceTZS: 395000,
    priceUSD: 152,
    category: "Formal Wear",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    ratingCount: 142,
    stock: 4, // low stock for urgency
    description: "Crafted for the modern African entrepreneur and urban professional. This double-vented, slim-fit suit features deep royal navy wool blend fabric, peak lapels, and exquisite hand-stitched detailing. Perfect for high-stakes meetings in Dar es Salaam, corporate summits in Nairobi, or elegant evening galas.",
    sizes: ["46R", "48R", "50R", "52R", "54R"],
    colors: [
      { name: "Royal Navy", hex: "#0b1b3d" },
      { name: "Charcoal Black", hex: "#1c1c1c" }
    ],
    details: [
      "Interlining: Premium breathable canvas for maximum drape",
      "Material: 85% Merino Wool, 15% Mulberry Silk",
      "Structure: Double vent back, half-canvas chest construction",
      "Fit: Laser-tailored slim modern silhouette",
      "Lining: Custom silk paisley jacquard lining"
    ],
    sku: "MZ-SL-SU-001",
    isBestSeller: true
  },
  {
    id: "prod-2",
    name: "Suede Chelsea Boots 'Oasis Gold'",
    priceTZS: 195000,
    priceUSD: 75,
    category: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    ratingCount: 89,
    stock: 7,
    description: "Indulge in premium Italian suede with these beautifully shaped Chelsea Boots. Featuring flexible moisture-wicking elastic goring, a rugged anti-slip crepe sole, and detailed double stitching. Handcrafted specifically to adapt to tropical weather while delivering unbeatable luxury aesthetic.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Oasis Tan", hex: "#ca9b63" },
      { name: "Midnight Black", hex: "#0F0F0F" }
    ],
    details: [
      "Material: 100% Genuine Italian Calf Suede Leather",
      "Sole: Natural crepe rubber for premium comfort & rebound",
      "Lining: Breathable soft-milled glove leather",
      "Pull Tabs: Custom heavy-duty nylon woven tabs",
      "Construction: Goodyear welted technique for ultimate durability"
    ],
    sku: "MZ-SH-CB-042",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "prod-3",
    name: "MOSSE 'The President' Chronograph Watch",
    priceTZS: 310000,
    priceUSD: 119,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    ratingCount: 56,
    stock: 3, // very low stock
    description: "An aspirational timepiece speaking pure authority. With a high-precision Japanese automatic movement, a 42mm surgical-grade brushed steel casing finished with luxurious 18k gold accents, and a sapphire crystal glass lens that resists all scratches. A crown jewel for your wrists.",
    sizes: ["One Size (Adjustable)"],
    colors: [
      { name: "Gold Accent Slate", hex: "#d4af37" },
      { name: "Sterling Steel Black", hex: "#a0a0a0" }
    ],
    details: [
      "Movement: Citizen Miyota Co. Automatic self-winding caliber",
      "Case: 42.5mm surgical-grade 316L Stainless Steel",
      "Glass: Curved Double-dome Anti-reflective Scratchproof Sapphire Crystal",
      "Water Resistance: 100m / 10 ATM (Perfect for aquatic leisure)",
      "Band: Genuine top-grain Saffiano alligator-embossed leather strap"
    ],
    sku: "MZ-AC-WA-108",
    isBestSeller: true
  },
  {
    id: "prod-4",
    name: "Luxury Suede Pilot Bomber Jacket",
    priceTZS: 260000,
    priceUSD: 100,
    category: "Casual Wear",
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    ratingCount: 112,
    stock: 5,
    description: "An iconic silhouette re-imagined with ultra-premium materials. This Suede Pilot Bomber delivers the ultimate fusion of military discipline and casual opulence. Features custom engraved heavyweight brass zippers, rib-knitted storm cuffs, and deep interior pocketing.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Earthy Taupe", hex: "#8c7255" },
      { name: "Espresso Brown", hex: "#4a3c31" }
    ],
    details: [
      "Shell: Grade-A split pigskin suede - heavily water repellent treated",
      "Hardware: Heavy-gauge solid metal luxury hardware in brushed gold",
      "Cuffs & Hem: Double-knit wool elastomer compound for non-stretch sag",
      "Pockets: 2 external button-flap cargo, 2 lined handwarmers, 2 internal zipped",
      "Care: Specialized leather micro-dry-clean only"
    ],
    sku: "MZ-CL-JK-088",
    isNewArrival: true
  },
  {
    id: "prod-5",
    name: "Gold-Trim Aviator 'Serengeti Elite' Sunglasses",
    priceTZS: 85000,
    priceUSD: 33,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    ratingCount: 74,
    stock: 12,
    description: "Deflect the bright East African sun with elite swagger. Configured with handcrafted surgical titanium frames, plated in luxurious double-deposit 18k yellow-gold elements, and fitted with premium category 3 polarized emerald-brown gradient lenses. Perfect for long drives or beachside lounges.",
    sizes: ["Universal Medium"],
    colors: [
      { name: "Lux Gold Frame", hex: "#d8be7b" },
      { name: "Gunmetal Silver Frame", hex: "#7d7d7d" }
    ],
    details: [
      "Lenses: High-Contrast Polarized CR-39 premium ophthalmic standard",
      "UV Guard: 100% UVA/UVB blockage with inner anti-reflective layering",
      "Frame: Japanese Grade-5 Beta-Titanium (Ultra lightweight, weightless)",
      "Temple Tips: Hypoallergenic organic cellulose acetate",
      "Accessories: Includes micro-fiber cleaning cloth and custom Mosse premium case"
    ],
    sku: "MZ-AC-SG-010"
  },
  {
    id: "prod-6",
    name: "Premium Heavyweight 'Mosse' Streetwear Hoodie",
    priceTZS: 110000,
    priceUSD: 42,
    category: "Casual Wear",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    ratingCount: 95,
    stock: 8,
    description: "The crown jewel of Tanzanian streetwear. Formulated with 450GSM organic loopback cotton fleece, double-lined seamless hood, and dropping shoulders for a robust, relaxed silhouette that doesn't lose structure over years of heavy wear. Handcrafted premium stitching.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Onyx Black", hex: "#111111" },
      { name: "Pristine Eggshell", hex: "#f4f1ea" }
    ],
    details: [
      "Fabric Weight: 450 GSM Heavyweight loopback diagonal weave",
      "Material: 100% GOTS Certified Organic Long-Staple Cotton",
      "Design Details: Drop shoulder pattern with double-needle ribbed side ribs",
      "Labels: Zero-scratch embroidered silk inner neck labeling",
      "Pre-shrunk: Preshrunk in manufacturing to maintain exact fit"
    ],
    sku: "MZ-CL-HD-054",
    isNewArrival: true
  },
  {
    id: "prod-7",
    name: "MOSSE Signature Side-Stripe Denim Shorts",
    priceTZS: 55000,
    priceUSD: 21,
    category: "Denim & Shorts",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    ratingCount: 184,
    stock: 5,
    description: "Sourced directly from our official Moses Fashion signature collection. High-quality comfort-stretch dark indigo denim shorts featuring the iconic lateral white piping/stripe detail, hanger-draped as displayed on our Instagram feed limit.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Indigo Selvedge Stripe", hex: "#1a263c" }
    ],
    details: [
      "Material: Heavyweight premium comfort stretch denim",
      "Detail: Handcrafted side stripe selvedge piping accent",
      "Hardware: Anti-rust vintage copper buttons & rivets",
      "Fit: Designed to drape beautifully on the thigh",
      "Origin: Curated and finished in Mwanza, Tanzania"
    ],
    sku: "MS-DE-ST-01",
    isBestSeller: true
  },
  {
    id: "prod-8",
    name: "MOSSE Distressed Ripped Denim Shorts",
    priceTZS: 48000,
    priceUSD: 18,
    category: "Denim & Shorts",
    images: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    ratingCount: 142,
    stock: 8,
    description: "Light wash denim shorts featuring meticulous distressed scraping and ripped details, designed for the ultimate streetwear look. Built extremely strong to retain fitting through years of daily wear.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Light Blue Wash", hex: "#a4c2f4" }
    ],
    details: [
      "Material: 100% thick structured long-staple cotton denim",
      "Finish: Hand-frayed hems and organic light stone washing",
      "Closure: Heavy duty secure metal zip fly with button lock",
      "Styling: Raw street style aesthetics, pairs perfectly with clean tees",
      "Origin: Finished under MOSES FASHION strict specifications"
    ],
    sku: "MS-DE-DI-02",
    isNewArrival: true
  },
  {
    id: "prod-9",
    name: "MOSSE Terracotta Rust-Brown Shorts",
    priceTZS: 45000,
    priceUSD: 17,
    category: "Denim & Shorts",
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    ratingCount: 96,
    stock: 4,
    description: "Add warmth to your wardrobe with our earthy rust-brown terracotta casual shorts. Moses Fashion signature tailored garmenting that delivers high visual contrast for dapper weekends.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Terracotta Rust", hex: "#9e472a" }
    ],
    details: [
      "Material: Heavy-weave cotton drill denim blend",
      "Colorway: Solid sulfur-dyed fade-resistant terracotta rust",
      "Features: Dual vertical waist hangers loops and neat double-back stitching",
      "Aesthetics: Inspired by contemporary boutique trends",
      "Care: Machine wash cold, colors do not run"
    ],
    sku: "MS-SH-RB-03",
    isBestSeller: true
  },
  {
    id: "prod-10",
    name: "MOSSE Sand Khaki Tailored Shorts",
    priceTZS: 45000,
    priceUSD: 17,
    category: "Denim & Shorts",
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.7,
    ratingCount: 88,
    stock: 0,
    description: "Clean khaki/sand colored tailored denim shorts designed for dual lifestyle wear. Extremely lightweight, breathable, and matching beautifully with slides, boots, or sneakers alike.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Desert Sand Khaki", hex: "#c6b399" }
    ],
    details: [
      "Material: Preshrunk lightweight mercerized cotton utility structure",
      "Design: Comfort waist band, 5-pocket alignment with reinforced coin compartment",
      "Features: Built broad to ease heavy activity under hot-day settings",
      "Fit: Relaxed standard drape"
    ],
    sku: "MS-SH-KS-04"
  }
];

export const CATEGORIES = [
  "All Boutique",
  "Denim & Shorts",
  "Formal Wear",
  "Casual Wear",
  "Shoes",
  "Accessories"
];
