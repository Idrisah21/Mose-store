/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrategySection } from "../types";

export const STRATEGY_SECTIONS: StrategySection[] = [
  {
    id: "site-architecture",
    title: "1. Complete Site Architecture",
    icon: "FolderTree",
    goal: "Ensure zero-friction navigation, robust SEO crawling, and lightning-fast path-to-purchase pathways across mobile and desktop interfaces.",
    overview: "Moze Store's information architecture is structured to mirror international premium giants like ASOS and Hugo Boss, optimized specifically for East African connection speeds and mobile screens.",
    details: [
      {
        title: "Global Hierarchy & User Journeys",
        description: "The layout maps a 3-click maximum principle where any browser can land, identify their target garment, specify sizes, and execute a WhatsApp or Mobile Money checkout inside 45 seconds.",
        bullets: [
          "🟢 LEVEL 1: Homepage (Brand Identity, Urgency Hero, Curated Entryways)",
          "🟢 LEVEL 2: Nested Collections / Category Catalogs (Formal, Casual, Footwear, Accessories, New Drops, BestSellers)",
          "🟢 LEVEL 3: Core PDPs (Product Description Pages - Heavy with UGC, interactive size fitment, quick variant toggles, checkout anchors)",
          "🟢 LEVEL 4: Frictionless Transaction Engines (Mini-Slide Cart, Double-Tap checkout, WhatsApp Auto-Draft engine, Selcom/M-Pesa integration gates)",
          "🟢 SUPPORT PATHS: Size guides, live delivery tracker (Voda/Airtel/Tigo notifications), reviews, returns hub, privacy policies"
        ]
      },
      {
        title: "Sitemap Blueprint & Navigation Map",
        description: "A crawlable directory skeleton ensures Google index bots parse indexable URLs seamlessly.",
        content: [
          "/ (Homepage - Optimized for localized keywords and high-end video loops)",
          "/shop (Dynamic catalog with multi-faceted filtering)",
          "/category/formal-wear (Targeting suits, blazer, double-breasted jackets)",
          "/category/casual-wear (Targeting Masaki hoodies, streetwear tees)",
          "/category/shoes (Targeting luxury Chelsea suede boots, executive leather Oxfords)",
          "/category/accessories (Targeting Serengeti sunglasses, Chronograph gold watches)",
          "/products/[product-slug] (Semantic URL containing SKU, category, and target Tanzanian keywords)",
          "/cart (Optimized slider panel + full screen fallback page)",
          "/checkout (Form-stripped layout with immediate Mobile Money/WhatsApp portals)",
          "/about-us (Branding page outlining material selection and craftsmanship)",
          "/contact (Click-to-chat WhatsApp direct lines, physical studio showroom details in Dar-Es-Salaam)",
          "/size-guide (Dedicated sizing metrics matching UK, EU, and US layouts for local clarity)",
          "/order-tracking (Interactive cargo updates with local courier APIs like Posta, DHL, and boda-boda networks)"
        ]
      }
    ]
  },
  {
    id: "homepage-structure",
    title: "2. High-Converting Homepage",
    icon: "Layout",
    goal: "Seduce high-value customers visually while immediately filtering them into conversion pathways through clear micro-segmentation.",
    overview: "Every scroll depth on the homepage is engineered with a cognitive micro-goal. We combine Hugo Boss cinematic aesthetics with ASOS's shopping urgency to drive impulse decisions.",
    details: [
      {
        title: "A. The Serengeti Luxury Hero Section",
        description: "Goal: Retain 98% of landing traffic, communicate immediate prestige, and answer 'Why Moze Store?' in 2.5 seconds.",
        bullets: [
          "Layout: Full-viewport mobile-first asset container featuring a high-definition cinematic loop of sophisticated Tanzanian models wearing Moze tailoring in Masaki or at Slipway.",
          "Headline: 'THE NEW EAST AFRICAN STANDARDS OF OPULENCE.' in elegant editorial typography.",
          "Sub-headline: 'Precision-tailored garments, handcrafted genuine shoes, and statement accessories for the modern dapper man. Immediate delivery in Dar-Es-Salaam.'",
          "Primary Call to Action (CTA): 'BROWSE NEW ARS [GOLD BACKGROUND]' - links to /category/new-arrivals with interactive press states.",
          "Secondary CTA: 'ORDER DIRECT VIA WHATSAPP [TRANSPARENT GOLD LINK]' - fires instant WhatsApp pre-filled greeting so shoppers can skip browsing.",
          "Trust Indicators: Small badges reading '⚡ NEXT-HOUR delivery inside Dar' and '📅 7-Day Hassle-free Exchange Guarantee'."
        ]
      },
      {
        title: "B. Featured Interactive Categories & Best Sellers",
        description: "Goal: Instantly segment warm traffic based on user wardrobe intentions to minimize bounce rates.",
        bullets: [
          "Layout: Sticky 2-column swipeable cards on mobile, expanding to a lush premium asymmetric grid on desktop. Large touch targets featuring category titles in sleek black-translucent overlay glassmorphism.",
          "CRO Strategy: Hover effects scale images gently. Grid prioritizes high-margin categories ('Formal Wear', 'Handcrafted Shoes') with direct 'Shop Category' buttons.",
          "Best Sellers Row: Displays the top 3 high-converting items with star ratings, localized prices (TZS), and a 'Quick-Add Bag' bubble that bypasses page-loads."
        ]
      },
      {
        title: "C. 'Why Choose Moze Store' Authority & Social Proof Grid",
        description: "Goal: Systematic neutralization of purchase defense mechanisms (sizing anxiety, fear of online scams, delivery lags).",
        bullets: [
          "Layout: Modern minimalist 3-piece layout styled in off-white/matte gold accents.",
          "Core Promises: 1. Absolute Fit Guarantee (Free exchange courier to your door if it doesn't fit standard size). 2. Cash On Delivery / Mobile Money Security (Pay only when you touch and verify the premium materials). 3. Handcrafted Sourcing (Custom tailored using luxury long-staple cottons and grade-A Italian leathers)."
        ]
      }
    ]
  },
  {
    id: "product-page",
    title: "3. Perfect Product Page (PDP)",
    icon: "ShoppingBag",
    goal: "Address garment anxiety, establish touch-like sensory visualization, and drive rapid variants select with near-zero friction.",
    overview: "A premium product page must emulate the in-store physical experience. We treat lack of touch as an optimization challenge, providing meticulous size advice and absolute secure checks.",
    details: [
      {
        title: "A. Cinematic Image Gallery & Textures Zoom",
        description: "How to handle sensory deprivation in digital apparel.",
        bullets: [
          "Multi-Angle Carousel: Minimally designed progress-dot carousel showing 1. Hero contextual shot on model. 2. Fabric extreme close-up (capturing wool weave or fine suede leather nap). 3. Reverse seam alignment showing stitch quality. 4. Styled flat-lay outfit matching idea.",
          "Interactive Loupe Zoom: Multi-finger stretch Zoom on mobile, cursor-hover loupe on desktop. Prevents quality doubt.",
          "Video In-Action: A 5-second mute loop button of the model walking, showcasing how the suit jacket flows when moving."
        ]
      },
      {
        title: "B. Sizing Intelligence & Variant Selector",
        description: "Sizing error is the #1 source of returns and customer dropout.",
        bullets: [
          "Double-Tier selector: Bullet buttons for sizes with clear 'Low Stock' amber badges next to scarce items (e.g., '48R - Only 2 Left!').",
          "East African Smart Size Guide: A beautifully crafted modal. Since some Tanzanian buyers are accustomed to UK sizes, some to EU, and some to US, we display a clear comparative matrix mapping chest, waist, and height. Features 'Moze Fit Recommendation Engine' based on height & weight."
        ]
      },
      {
        title: "C. Dual Checkout Path: The High-Converting WhatsApp Gate",
        description: "The crown jewel of CRO for Tanzanian mobile-centric commerce.",
        bullets: [
          "Path 1 - Instant WhatsApp order button: styled in WhatsApp green with a solid brand logo. Tapping this pre-compiles a deep-linked API text: 'Hello Moze Store, I would like to order the Elite Royal Navy Suit in Size 50R, Slate Navy, SKU: MZ-SL-SU-001. My delivery area is Masaki. Please guide me on payment.' This handles the 70% of Tanzanian users who prefer chatting directly with human shop managers over automated web portals.",
          "Path 2 - Standard Checkout: Sleek black button driving the user to their cart with sticky cart banners remaining active when scrolling."
        ]
      }
    ]
  },
  {
    id: "cart-optimization",
    title: "4. Shopping Cart Strategy",
    icon: "ShoppingCart",
    goal: "Increase Average Order Value (AOV) by 30%+ through contextually relevant upsells and visual progress progress-bars.",
    overview: "The cart is not a holding station; it is an active sales environment. We optimize for non-disruptive cart updates using a premium sliding overlay with integrated impulse buy blocks.",
    details: [
      {
        title: "The Progressive Reward Shipping Bar",
        description: "Using gamification to drive multi-item purchases.",
        bullets: [
          "A sleek gold progress bar reflecting exact TZS/USD calculations.",
          "Threshold 1: 'Add 65,000 TZS more for FREE boda-boda express delivery inside Dar!'",
          "Threshold 2: 'Success! You unlocked Free delivery + Premium Moze Wooden Coat Hanger bonus pack!'"
        ]
      },
      {
        title: "One-Click Contextual Upsells & Exit Intent Strategy",
        description: "High-margin small-footprint items are placed directly where wallets are open.",
        bullets: [
          "Smart Bundling ('Frequently Bought Together'): If a customer adds a suit, the cart immediately renders a single-tap 'Add Saffiano Leather Belt (+65k TZS) in matching Navy' or 'Elite Cufflinks (+35k TZS)'.",
          "Exit-Intent Drawer: If the user moves to close the tab on mobile, a gentle, high-end slide-up drawer provides a locked-in 10% coupon valid for 15 minutes, or a single tap 'Request Callback via WhatsApp' button to let our sales reps close the lead."
        ]
      }
    ]
  },
  {
    id: "checkout-optimization",
    title: "5. Frictionless Checkout Setup",
    icon: "CheckCircle",
    goal: "Eradicate form fatigue, secure localized mobile payment systems, and provide reliable, reassuring instant confirmation.",
    overview: "We strip traditional checkout down to 4 input fields (Name, Phone number, City, Delivery Address), bypassing complicated account creations completely.",
    details: [
      {
        title: "Mobile Money & Tanzanian Local Gateways Integration",
        description: "Capitalizing on localized consumer spending habits.",
        bullets: [
          "Vodacom M-Pesa Integration: Native prompt fields requiring zero screen exits.",
          "Tigo Pesa & Airtel Money: Plain-text dial-code instruction blocks along with automated push notifications.",
          "Secure Cash On Delivery Toggle: The gold standard of trust. Customers pay only once they inspect the leather grain or try on the blazer sleeve at their physical office/home."
        ]
      },
      {
        title: "Checkout Wireframe & UX Specs",
        description: "The ideal structural visual order during a checkout state.",
        bullets: [
          "Header: Super-stripped branding (logo only, zero heavy menus to distract or leak traffic).",
          "Left Column (Form): Ultra-clean minimal inputs. Uses floating labels. Includes immediate WhatsApp backup checkbox: 'Send my order updates to WhatsApp'.",
          "Right Column (Summary): Lock-icon frame outlining the cart items, showing price breaks, free delivery indicators, and a clean discount checkout field with prominent mobile trust secure badges (PesaPal, Mastercard, Visa secured)."
        ]
      }
    ]
  },
  {
    id: "seo-strategy",
    title: "6. SEO Strategy (Tanzania First)",
    icon: "Search",
    goal: "Dominate high-intent organic searches across the East African region, establishing massive permanent authority without recurring ad spend.",
    overview: "We design a localized SEO matrix addressing exact search syntax patterns popular in Dar es Salaam, Arusha, and Kampala.",
    details: [
      {
        title: "Target Keywords Map & Volume Focus",
        description: "Tanzanian consumers search with highly descriptive intent. We target specific commercial phrases.",
        table: {
          headers: ["Target Keyword", "Monthly Search Intent", "Recommended URL Path", "Core Meta Title Design"],
          rows: [
            ["Men's fashion Tanzania", "High - Commercial", "/shop", "Premium Men's Fashion Tanzania | Moze Store | Luxury Clothing"],
            ["Men's shoes Tanzania", "High - High Intent", "/category/shoes", "Handcrafted Men's Shoes Tanzania | Genuine Suede Chelsea Boots"],
            ["Boutique Tanzania Dar Es Salaam", "Medium - Prestigious", "/about-us", "Boutique Tanzania | Moze Store Luxury Menswear Masaki Showroom"],
            ["Luxury men's clothing Tanzania", "Medium - High AOV", "/category/formal-wear", "Luxury Men's Suits & Formal Clothing Tanzania | Moze Sartorial"]
          ]
        }
      },
      {
        title: "Structural Metadata & Schema Architectures",
        description: "Perfect schema formats to drive attractive rich snippet visual elements on Google search results pages.",
        bullets: [
          "Product Schema (JSON-LD): Injects exact price currency (TZS), in-stock availability status, product rating aggregate average, and shipping costs directly to Google bots.",
          "Organization Schema: Marks our flagship physical showroom in Masaki, Dar es Salaam with geographic coordinates, telephone contact numbers, and official business handles.",
          "BreadcrumbList Schema: Standardizes Google's search trail (Home > Shop > Shoes > Chelsea Boots) to reduce user bounce and improve authority ratings."
        ]
      }
    ]
  },
  {
    id: "sales-psychology",
    title: "7. Sales Psychology Playbook",
    icon: "BrainCircuit",
    goal: "Deploy Robert Cialdini’s core cognitive influence pillars subtly and elegantly to motivate conversion without appearing aggressive or cheap.",
    overview: "High-end luxury relies on prestige and selection. We never use cheap, flashing countdown clocks. Instead, we use elegant, honest triggers that reinforce premium standing.",
    details: [
      {
        title: "A. Scarcity & Exclusivity (The 'Masaki Vault')",
        description: "Fostering premium desirability.",
        bullets: [
          "Implementation: For best sellers, a small classic gold typeface line: 'Limited Boutique Drop: Only 12 suits tailored in this fabric roll. Once sold out, this style exits catalog.'",
          "Result: Drives immediate purchases because of exclusivity, mimicking custom tailor shop limits."
        ]
      },
      {
        title: "B. Social Proof & Authority (UGC & Curation)",
        description: "Providing authentic peer reassurance.",
        bullets: [
          "Implementation: Integrating a 'Worn by Gentlemen in Dar' dynamic gallery. Shows curated Instagram pictures of known local figures, models, and real wedding clients with tags pointing to specific product links.",
          "Authority Signaling: Highlight grade of leather ('Italian Grade-A Calf Suede') and fabric material ('Selected Australian Merino Wool') with small seal badges."
        ]
      }
    ]
  },
  {
    id: "trust-building",
    title: "8. Trust Building System",
    icon: "ShieldAlert",
    goal: "Destroy all buyer skepticism surrounding e-commerce legitimacy, product quality, and secure logistics networks.",
    overview: "Tanzanian e-commerce thrives on trust. Social platforms are riddled with low-quality copies; we position Moze Store as an established premium institution with complete transparency.",
    details: [
      {
        title: "The Quadruple Bulletproof Reassurance Suite",
        description: "A permanent visual footer block displayed underneath every CTA button.",
        bullets: [
          "🛡️ 100% Genuine Materials: 'Every garment is backed by a material source certificate. We use real suede, genuine top-grain calfskin, and premium organic cotton.'",
          "🤝 Payment on Delivery: 'Dar-Es-Salaam clients enjoy full Touch-&-Try privileges. Inspect the stitching and fitment before handing over any cash or mobile money.'",
          "🔄 Elite Exchange Policy: 'If the size doesn't sit flawlessly, we deploy our custom courier within 24 hours to swap your garment for the correct fit at total zero cost.'",
          "📍 Physical Flagship Showroom: 'We are a fully registered legal firm with a physical boutique lounge in Masaki, open for fittings, coffee, and collections 7 days a week.'"
        ]
      }
    ]
  },
  {
    id: "whatsapp-sales-funnel",
    title: "9. WhatsApp Conversational Funnel",
    icon: "MessageSquareText",
    goal: "Bypass standard web abandonment pipelines by meeting East African customers directly on their primary conversational platform.",
    overview: "We treat WhatsApp not merely as customer support, but as our primary sales engine, lead collector, and conversational closing tool.",
    details: [
      {
        title: "Automated Conversational Scripts & Interactive Flow",
        description: "Pre-written response scripts mapping common client entry states.",
        bullets: [
          "ENTRY POINT: Shopper taps 'Order on WhatsApp' on the Royal Navy Suit (Size 48).",
          "🤖 Auto-Reply Script: 'Shikamoo, Gentleman! Thank you for choosing MOZE STORE. Your inquiry for other Elite Royal Navy Suit (Size 48R) is received by our Masaki Concierge. A dedicated stylist will verify your fitment options and address availability right now. While we prepare, could you share your delivery city? (Dar / Arusha / Dodoma / Other)'",
          "🤝 Stylist Closure: Stylist steps in, reviews sizing based on height/weight, shares a quick video of the real suit in-hand, offers coordinate delivery timeline, and drops the direct M-Pesa business Paybill number."
        ]
      },
      {
        title: "Cart Recovery on WhatsApp",
        description: "Recovering cold shopping carts using highly personalized manual reach outs.",
        bullets: [
          "Timeline: 2 Hours Post-Abandonment (if phone number is inputted at checkout step).",
          "Script draft: 'Habari yetu, [Name]! This is Moze Store Team Masaki. We noticed you left a pair of our handcrafted Oasis Suede Chelsea Boots in your cart. We only have 3 pairs left in your size. Would you like our in-town boda courier to bring them to your office today for a quick fitting trial? No obligation to buy! Let us know if we should secure the pair for you.'"
        ]
      }
    ]
  },
  {
    id: "email-marketing-funnel",
    title: "10. Email Marketing Funnel",
    icon: "Mail",
    goal: "Build an automated asset engine that continuously nurtures, educates, and commands high-value repeat purchases from professional audiences.",
    overview: "While mobile money and WhatsApp close the immediate sales, a structured email funnel builds permanent aspirational brand relationship with premium professionals.",
    details: [
      {
        title: "The Welcome Series: Genesis of Moze Store",
        description: "Delivering a luxurious brand handshake and a 10% Welcome gift code.",
        bullets: [
          "📧 EMAIL 1: Subject: 'Welcome to the inner circle / The Moze Philosophy'. Body: Introduces our design studio, commitment to luxury tailoring, and local development. Includes custom exclusive 10% coupon code.",
          "📧 EMAIL 2 (48 Hours Later): Subject: 'The Blueprint of a Perfect Fit'. Body: Practical stylistic tips on how a suit shoulder should line up, how length of trousers sets confidence, and size-matching criteria.",
          "📧 EMAIL 3 (96 Hours Later): Subject: 'Masaki Showroom Tour / Come meet our tailors'. Body: Visual preview of the flagship boutique lounge, personalizing client fittings."
        ]
      },
      {
        title: "Cart Recovery and VIP Pipelines",
        description: "Retaining high-intent buyers and driving lifelong loyalty segments.",
        bullets: [
          "📧 Welcome VIP Loyalty: Sent to clients who cross a threshold of 1,000,000 TZS spend annually. Subject line: 'Exclusive Status Unlocked / Welcome to the Moze Club'. Benefits: Lifetime free boda expedited shipping + first priority access to limited custom drops before they go public on Instagram."
        ]
      }
    ]
  },
  {
    id: "ai-features",
    title: "11. Modern AI E-Commerce Features",
    icon: "Sparkles",
    goal: "Increase boutique personalization, eliminate online sizing doubt, and augment search relevancy using Gemini-backed intelligence models.",
    overview: "We propose simple, realistic, high-impact AI capabilities that directly drive average order size and confidence.",
    details: [
      {
        title: "The Gemini AI Stylist",
        description: "A virtual personal assistant recommending bespoke garment pairings.",
        bullets: [
          "Implementation: A conversational stylist overlay on PDPs. Shopper asks: 'I have a wedding next month in Arusha, the theme is rustic elegant. Which Moze jacket fits?'",
          "AI Response Logic: Reads the product catalog database, references weather patterns, and suggests: 'We highly recommend the Luxury Suede Pilot Jacket in Earthy Taupe paired with cream chino trousers and our Oasis Suede Chelsea Boots. It brings out rich texture while remaining breezy for Arusha sunset.'"
        ]
      },
      {
        title: "Smart Sizing & Vision Search",
        description: "Intelligent engines analyzing image inputs and fitments.",
        bullets: [
          "AI Size Estimator: Safe, non-invasive form asking: 1. Height. 2. Weight. 3. Preferred fit style (Skinny, Slim, Comfortable). Generates an automated '92% accurate size 50R prediction' recommendation, drastically sinking sizing errors.",
          "Visual Matching Engine: Submitting a picture of a celebrity style on WhatsApp/Web and letting the AI match similar pieces from Moze Store's collection."
        ]
      }
    ]
  },
  {
    id: "analytics-setup",
    title: "12. Analytics Integration",
    icon: "LineChart",
    goal: "Achieve complete spatial funnel visibility tracking where users fall off so data can continually drive layout iterations.",
    overview: "We transition from guessing to knowing by mapping customized Google Analytics 4 (GA4) events and setup profiles.",
    details: [
      {
        title: "Required GA4 E-Commerce Events List",
        description: "The complete analytics payload map to observe customer journeys.",
        table: {
          headers: ["Event Name", "Trigger Action", "Required Metadata Parameters", "CRO Insight Generated"],
          rows: [
            ["view_item", "Product Detail Page loaded", "item_name, item_id, price, currency (TZS)", "Measures initial product interest and traffic volume"],
            ["select_size", "User selects physical size", "item_id, size_value, stock_status", "Identifies size-scarcity drops & user sizing distribution"],
            ["add_to_cart", "Taps standard add-to-bag button", "item_name, quantity, cart_total, currency", "Measures core product appeal and initial purchase intent"],
            ["click_whatsapp_order", "Taps WhatsApp checkout / Inquiry", "item_id, name, size_chosen", "Tracks the conversational closing effectiveness ratio"],
            ["begin_checkout", "Initiates standard check process", "payment_method_chosen, cart_count", "Measures cart abandonment points"],
            ["purchase", "Successful transaction completion", "transaction_id, revenue, shipping_cost", "Computes actual ROAS and conversion values"]
          ]
        }
      }
    ]
  },
  {
    id: "performance-optimization",
    title: "13. Performance Engineering",
    icon: "Cpu",
    goal: "Ensure immediate, jitter-free loads on 3G/4G networks across East Africa, maintaining a Lighthouse performance tier of 90+.",
    overview: "Every 150 milliseconds of additional latency destroys 7.2% of e-commerce checkout velocities. We design for absolute speed.",
    details: [
      {
        title: "Web Performance Optimizations Matrix",
        description: "Specific protocols to achieve speed goals.",
        bullets: [
          "AVIF/WebP Image Conversion: Automatically serve modern formats compressing raw high-resolution photography without losing garment threading visual crispness.",
          "Responsive Image Srcset: Deliver a 400px wide image for mobile displays, avoiding wasting cellular bandwidth with full 2000px desktop files.",
          "Code Splitting & Progressive Hydration: Prevent massive JavaScript bundle sizes by lazy-loading our strategy dashboard and checkout forms only when requested by the user."
        ]
      }
    ]
  },
  {
    id: "cro-plan",
    title: "14. CRO Roadmap & Testing Protocol",
    icon: "GitBranch",
    goal: "Run structured post-launch testing iterations to compound conversion rates year-over-year.",
    overview: "A website is a living lab. We formulate specific sequential testing blocks targeting different phases of the purchase funnel.",
    details: [
      {
        title: "Target Experiment Blocks Schema",
        description: "Structured tests to validate conversion hypotheses.",
        table: {
          headers: ["Area Tested", "Hypothesis", "Variant A Structure", "Variant B Structure (Challenger)"],
          rows: [
            ["WhatsApp Button", "A visual pulse on the button boosts taps", "Static green WhatsApp order asset", "Pulsing green icon + mini 'Chat with Masaki Stylist' bubble"],
            ["Sizing Selection", "Pre-selecting predicted size prevents dropout", "Blank sizing squares (User must click)", "Automatically highlight most common size (48R/42)"],
            ["Trust Badges", "Emphasizing Cash-on-delivery drives orders", "Generic payment logos (Visa/MC)", "'Cash/M-Pesa on Delivery Accepted' prominent badge"]
          ]
        }
      }
    ]
  },
  {
    id: "scaling-roadmap",
    title: "15. Future Scaling Roadmap",
    icon: "Rocket",
    goal: "Transition from an elite boutique storefront into a regional powerhouse commanding the East African fashion market.",
    overview: "We layout a 24-month roadmap with progressive milestones managing operations, logistics, design hubs, and global exports.",
    details: [
      {
        title: "Phase 1: Local Launch & Market Fit (Months 1–6)",
        description: "Fusing a physical boutique experience with digital convenience in Dar es Salaam.",
        bullets: [
          "Objective: Secure baseline of 200 monthly orders, validate product-fit, establish premium delivery network with local scooter/boda couriers.",
          "Logistics: Guarantee next-hour delivery in Masaki, Oysterbay, and Upanga. Establish standard next-day deliveries for Arusha, Dodoma, and Mwanza via bus terminal freight.",
          "Marketing: Instagram micro-influencer gifting (authentic reviews), localized SEO indexing."
        ]
      },
      {
        title: "Phase 2: Growth & East Africa Expansion (Months 7–12)",
        description: "Entering neighboring capital cities and scaling supply chain logistics.",
        bullets: [
          "Objective: Secure 800+ monthly orders, open digital pipelines targeting Nairobi (Kenya), Kampala (Uganda), and Kigali (Rwanda).",
          "Infrastructure: Establish localized fulfillment hubs in Nairobi. Integrate automated tax and customs clearing rates.",
          "Tech: Integrate localized payment systems across East Africa (Safaricom M-Pesa in Kenya, MTN Mobile Money in Uganda/Rwanda)."
        ]
      },
      {
        title: "Phase 3: Omnichannel Global Scale (Months 13–24)",
        description: "Positioning Moze Store as the definitive global ambassador of premium African styling.",
        bullets: [
          "Objective: Establish full international air-freight shipping, design dedicated custom luxury lines, and open physical popups in London, Paris, and New York.",
          "Tech: Adaptive multi-currency pricing localization (automatically shows Euros in France, Pounds in UK with smart import duties calculations), Gemini-powered visual AI stylist fully operational."
        ]
      }
    ]
  }
];
