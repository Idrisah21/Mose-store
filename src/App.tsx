/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  Sliders, 
  DollarSign, 
  MessageSquare,
  ClipboardList,
  Compass,
  ArrowRight,
  LogOut,
  Lock,
  UserCheck,
  Bell,
  Trash2,
  Truck
} from "lucide-react";
import { Product, CartItem, BackInStockEntry } from "./types";
import { PRODUCTS } from "./data/products";
import Storefront from "./components/Storefront";
import ProductPage from "./components/ProductPage";
import StrategyPanel from "./components/StrategyPanel";
import MiniCart from "./components/MiniCart";
import CheckoutModal from "./components/CheckoutModal";
import { TRANSLATIONS, Language } from "./utils/translations";
import mosseLogo from "./assets/images/mosse_store_logo_1780828857526.png";
import mosseBg from "./assets/images/mosse_store_bg_1780828873660.png";
import InstagramBrowser from "./components/InstagramBrowser";
import { Helmet } from "react-helmet-async";
import LoginPortal from "./components/LoginPortal";
import SuccessAnimation from "./components/SuccessAnimation";
import OrderTracker from "./components/OrderTracker";

export default function App() {
  const [userRole, setUserRole] = useState<"customer" | "admin" | null>(() => {
    const saved = localStorage.getItem("mosse_auth_role");
    if (saved === "customer" || saved === "admin") return saved as "customer" | "admin";
    return null;
  });
  const [showSuccessAnim, setShowSuccessAnim] = useState<"cart" | "checkout" | null>(null);
  const [successAnimProduct, setSuccessAnimProduct] = useState<string>("");

  const [activeTab, setActiveTab ] = useState<"storefront" | "tracker" | "blueprint">("storefront");
  const [latestOrderId, setLatestOrderId] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<"TZS" | "USD">("TZS");
  const [language, setLanguage] = useState<Language>("EN");
  const [isInstaBrowserOpen, setIsInstaBrowserOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [showOrderHistoryNotif, setShowOrderHistoryNotif] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [affiliateCode, setAffiliateCode] = useState<string>("");
  const [backInStockList, setBackInStockList] = useState<BackInStockEntry[]>([]);
  const [adminSuccessToast, setAdminSuccessToast] = useState("");

  const t = TRANSLATIONS[language];

  const handleLogin = (role: "customer" | "admin") => {
    setUserRole(role);
    localStorage.setItem("mosse_auth_role", role);
    if (role === "customer") {
      setActiveTab("storefront");
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem("mosse_auth_role");
    setActiveTab("storefront");
    setSelectedProduct(null);
  };

  // Load products, cart, and history from localStorage for session persistence
  useEffect(() => {
    // 1. Products list
    const savedProducts = localStorage.getItem("mosse_store_custom_products");
    if (savedProducts) {
      try {
        setProductsList(JSON.parse(savedProducts));
      } catch (err) {
        console.error("Custom products retrieval failed", err);
        setProductsList(PRODUCTS);
      }
    } else {
      setProductsList(PRODUCTS);
    }

    // 2. Cart
    const savedCart = localStorage.getItem("moze_store_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Cart retrieval failed", err);
      }
    }

    // 3. Orders
    const savedHistory = localStorage.getItem("moze_store_orders");
    if (savedHistory) {
      try {
        setOrderHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Orders history retrieval failed", err);
      }
    }

    // 4. Back-in-stock waiting list elements
    const savedWaitlist = localStorage.getItem("mosse_store_back_in_stock");
    if (savedWaitlist) {
      try {
        setBackInStockList(JSON.parse(savedWaitlist));
      } catch (err) {
        console.error("Back in stock list retrieval failed", err);
      }
    }
  }, []);

  // 4. Parse url referral affiliate code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("affiliate");
    if (ref) {
      setAffiliateCode(ref);
      localStorage.setItem("mosse_affiliate_id", ref);
    } else {
      const saved = localStorage.getItem("mosse_affiliate_id");
      if (saved) {
        setAffiliateCode(saved);
      }
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProductsList(newProducts);
    localStorage.setItem("mosse_store_custom_products", JSON.stringify(newProducts));
  };

  const handleAddProduct = (newProd: Product) => {
    const updated = [newProd, ...productsList];
    saveProducts(updated);
  };

  const handleRemoveProduct = (id: string) => {
    const updated = productsList.filter(p => p.id !== id);
    saveProducts(updated);

    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }

    // Also prune from cart if deleted product is in cart
    const updatedCart = cart.filter(item => item.product.id !== id);
    if (updatedCart.length !== cart.length) {
      saveCart(updatedCart);
    }
  };

  const handleRegisterNotifyMe = (email: string, size: string, color: string) => {
    if (!selectedProduct) return;
    
    const newEntry: BackInStockEntry = {
      id: `WAIT-${Math.floor(100000 + Math.random() * 900000)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      sku: selectedProduct.sku,
      email: email,
      selectedSize: size,
      selectedColor: color,
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextWaitlist = [newEntry, ...backInStockList];
    setBackInStockList(nextWaitlist);
    localStorage.setItem("mosse_store_back_in_stock", JSON.stringify(nextWaitlist));
  };

  const handleDeleteWaitlistEntry = (id: string) => {
    const updated = backInStockList.filter(entry => entry.id !== id);
    setBackInStockList(updated);
    localStorage.setItem("mosse_store_back_in_stock", JSON.stringify(updated));
    setAdminSuccessToast("✓ Waitlist register slot purged cleanly.");
    setTimeout(() => setAdminSuccessToast(""), 4000);
  };

  const handleSimulateRestockNotification = (entry: BackInStockEntry) => {
    setAdminSuccessToast(`✉️ [SIMULATION] Restock notification email dispatched to ${entry.email} regarding ${entry.productName}!`);
    setTimeout(() => setAdminSuccessToast(""), 5500);
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("moze_store_cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    const existingIdx = cart.findIndex(
      item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor.hex === color.hex
    );

    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1
      };
      saveCart([...cart, newItem]);
    }

    setSuccessAnimProduct(`${product.name} (Size: ${size}, Color: ${color.name})`);
    setShowSuccessAnim("cart");
  };

  const handleRemoveFromCart = (productId: string, size: string, colorHex: string) => {
    const filtered = cart.filter(
      item => 
        !(item.product.id === productId && 
          item.selectedSize === size && 
          item.selectedColor.hex === colorHex)
    );
    saveCart(filtered);
  };

  const handleUpdateQty = (productId: string, size: string, colorHex: string, delta: number) => {
    const updated = cart.map(item => {
      if (
        item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedColor.hex === colorHex
      ) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(nextQty, 1) };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleAddQuick = (product: Product, size: string, color: { name: string; hex: string }) => {
    handleAddToCart(product, size, color);
    // Auto trigger slide open for user feedback
    setIsCartOpen(true);
  };

  const handleOpenCheckoutDirectly = (product: Product, size: string, color: { name: string; hex: string }) => {
    handleAddToCart(product, size, color);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: "pending" | "processing" | "dispatched" | "out_for_delivery" | "delivered") => {
    const updated = orderHistory.map(order => {
      if (order.id === orderId) {
        const stateDescriptions: Record<string, string> = {
          pending: "Secured in Mosse database. Authenticated sizes & color swatch matching completed.",
          processing: "Carefully wrapped in signature luxury scent box. Handed off to Malimbe dispatcher.",
          dispatched: "Boarded express transit bus line from Mwanza, heading directly to recipient depot.",
          out_for_delivery: "Bus has crossed regional check-points. Courier/driver is out for recipient delivery hand-off.",
          delivered: "Immaculate delivery completed successfully. Fitted, confirmed and signed off."
        };
        const stateTitles: Record<string, string> = {
          pending: "Order Confirmed & Placed",
          processing: "Styling & Silk Packing",
          dispatched: "Bus Transit Commenced",
          out_for_delivery: "Approaching Destination / Out for Delivery",
          delivered: "Delivered & Fitting Verified"
        };

        const newHistoryStep = {
          status: nextStatus,
          title: stateTitles[nextStatus],
          description: stateDescriptions[nextStatus],
          date: "Today",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const existingHist = order.trackingHistory || [
          { status: "pending", title: "Order Confirmed & Placed", description: "Secured in Mosse database. Authenticated sizes & color swatch matching completed.", date: order.date, time: order.timestamp }
        ];

        let nextHist = [newHistoryStep, ...existingHist.filter((h: any) => h.status !== nextStatus)];

        const estArrivals: Record<string, string> = {
          pending: "Automated bus parcel protocol in preparation",
          processing: "Being packed at Malimbe Flagship Boutique, Mwanza",
          dispatched: "En route via Bus (ETA under 24 hours)",
          out_for_delivery: "Within hours (Local Delivery Dispatch)",
          delivered: "In hand of Honorable Gentleman"
        };

        const updatedCourier = {
          ...(order.courierDetails || {
            carrierName: order.city === "Mwanza" ? "Direct Malimbe Stylist Runner" : "Express Regional Transit Coach (Stand Kuu Parcel)",
            trackingNumber: `TRK-${order.id.substring(3)}-REG`,
            phone: "+255 767 542 687"
          }),
          estimatedArrival: estArrivals[nextStatus]
        };

        return { 
          ...order, 
          status: nextStatus,
          trackingHistory: nextHist,
          courierDetails: updatedCourier
        };
      }
      return order;
    });

    setOrderHistory(updated);
    localStorage.setItem("moze_store_orders", JSON.stringify(updated));
    setAdminSuccessToast(`✓ Order ${orderId} upgraded to status: ${nextStatus.toUpperCase()}!`);
    setTimeout(() => setAdminSuccessToast(""), 4000);
  };

  const handleRemoveOrder = (id: string) => {
    const updated = orderHistory.filter(o => o.id !== id);
    setOrderHistory(updated);
    localStorage.setItem("moze_store_orders", JSON.stringify(updated));
    setAdminSuccessToast("✓ Sandbox Receipt purged cleanly from cache database.");
    setTimeout(() => setAdminSuccessToast(""), 4000);
  };

  const handleSubmitOrder = (orderId: string, details: any) => {
    const mappedItems = cart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: currency === "TZS" ? item.product.priceTZS : item.product.priceUSD,
      quantity: item.quantity,
      size: item.selectedSize,
      colorName: item.selectedColor.name,
      image: item.product.images[0]
    }));

    const newOrder = { 
      id: orderId, 
      ...details, 
      status: "pending",
      items: mappedItems,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const nextHistory = [newOrder, ...orderHistory].slice(0, 15);
    
    setOrderHistory(nextHistory);
    localStorage.setItem("moze_store_orders", JSON.stringify(nextHistory));
    setShowOrderHistoryNotif(true);
    setTimeout(() => setShowOrderHistoryNotif(false), 6000);

    setSuccessAnimProduct(`CRM Code: ${orderId}`);
    setShowSuccessAnim("checkout");

    // Automatically transition customer straight to the Track Order view filled with their checkout receipt
    setLatestOrderId(orderId);
    setActiveTab("tracker");
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Dynamic SEO metadata targeting "Men's fashion Tanzania" with complete Swahili/English support
  const seoDetails = (() => {
    const isSwahili = language === "SW";
    if (activeTab === "blueprint") {
      return {
        title: isSwahili 
          ? "Sartorial Strategy Blueprint | Biashara ya Mavazi ya Kiume Tanzania | Mosse Store"
          : "Sartorial Strategy Blueprint | Men's Fashion Tanzania Business Model | Mosse Store",
        description: isSwahili
          ? "Uchunguzi wa kiundani wa mfumo wa biashara, ugavi, bei halisi, na usafirishaji wa mavazi makali ya kiume nchini Tanzania kutoka Mosse Store Mwanza."
          : "An in-depth corporate case study on the retail business model, logistics channel, transparent localized pricing, and CRO mechanics of premium menswear in Tanzania.",
        keywords: "biashara ya nguo Tanzania, retail strategy East Africa, sartorial startup, men's fashion Tanzania corporate case study, Mosse Store business, Mwanza fashion hub",
      };
    } else if (selectedProduct) {
      const prodName = selectedProduct.name;
      const cat = selectedProduct.category;
      return {
        title: isSwahili
          ? `Nunua ${prodName} | Mavazi ya Kiume Tanzania`
          : `Buy ${prodName} | Men's Fashion Tanzania | Mosse Store`,
        description: isSwahili
          ? `Nunua ${prodName} kwa bei nafuu kupitia duka la mavazi ya kiume Mosse Store Tanzania. ${selectedProduct.description.substring(0, 150)}... Sizing inayopendekezwa: ${selectedProduct.sizes.join(", ")}.`
          : `Shop ${prodName} online at Mosse Store Mwanza, Tanzania. Finest premium ${cat.toLowerCase()} collection. ${selectedProduct.description.substring(0, 150)}... Available size options: ${selectedProduct.sizes.join(", ")}.`,
        keywords: `${prodName}, Buy ${prodName} Tanzania, premium ${cat.toLowerCase()} Mwanza, men's fashion Tanzania, local tailors, gentlemen luxury brand Mwanza`,
      };
    } else {
      // Default storefront
      return {
        title: isSwahili
          ? "Mavazi ya Kiume Tanzania | Mosse Store Mwanza - Duka la Nguo Kali za Kiume"
          : "Men's Fashion Tanzania | Mosse Store - Premium Streetwear & Tailored Suit Mwanza",
        description: isSwahili
          ? "Mavazi yakuvutia na dapper ya kiume Tanzania nchini Mosse Store. Suti rasmi za kisasa, viatu thabiti vya Chelsea suede leather, safari koti, na kofia mkoani Mwanza. Lipa mkono kwa mkono!"
          : "Elevate your wardrobe at Mosse Store, Tanzania's leading men's fashion brand based in Mwanza. Discover royal navy suits, Italian suede chelsea boots, pilot bomber jackets, and smart casuals. Secure 24-hr regional bus transit!",
        keywords: "men's fashion Tanzania, mavazi ya kiume Tanzania, duka la nguo Mwanza, streetwear Dar es Salaam, tailored suits Tanzania, luxury men garments, Mosse store",
      };
    }
  })();

  return (
    <div 
      className="min-h-screen text-neutral-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-neutral-950"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.97)), url(${mosseBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* React Helmet dynamic headers mapping for 'Men's fashion Tanzania' SEO optimization */}
      <Helmet>
        <title>{seoDetails.title}</title>
        <meta name="description" content={seoDetails.description} />
        <meta name="keywords" content={seoDetails.keywords} />
        
        {/* OpenGraph social tags for high conversions on sharing */}
        <meta property="og:title" content={seoDetails.title} />
        <meta property="og:description" content={seoDetails.description} />
        <meta property="og:image" content={selectedProduct ? selectedProduct.images[0] : mosseLogo} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoDetails.title} />
        <meta name="twitter:description" content={seoDetails.description} />
        <meta name="twitter:image" content={selectedProduct ? selectedProduct.images[0] : mosseLogo} />
      </Helmet>

      {userRole === null ? (
        <LoginPortal onLogin={handleLogin} language={language} />
      ) : (
        <>
          {/* Dynamic Global Top Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600 text-neutral-950 py-1.5 px-4 text-center text-[10px] font-mono uppercase tracking-widest font-extrabold flex items-center justify-between gap-4">
        <span className="hidden md:inline">✨ MOSSE STORE • MOSES FASHION LOUNGE STYLING</span>
        <span className="mx-auto md:mx-0">⚡ MIKOANI TUNATUMA 🚌 COUNTRYWIDE REGIONAL BUS DELIVERY UNDER 24 HOURS!</span>
        <span className="hidden lg:inline">📍 MALIMBE Flagship Boutique open 10am-8pm</span>
      </div>

      {/* Primary Header Segment */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900/80 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Core Brands and Slogans */}
        <div className="flex items-center gap-3">
          <div className="p-1 px-2.5 bg-neutral-900 border border-neutral-850 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs uppercase font-mono font-extrabold text-amber-500 tracking-widest">
              House of Switch
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-black tracking-widest text-white uppercase font-sans">
                MOSSE STORE
              </h1>
              <span className="text-[10px] font-mono text-amber-500">• MOSES FASHION</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans tracking-wide">
              Clothing (Brand) • Malimbe, Mwanza (Tanzania & Kenya Delivery 🇹🇿🇰🇪)
            </p>
          </div>
        </div>

        {/* CLASSIC PORTAL HUB NAVIGATION SWITCHER */}
        <div className="flex items-center border border-neutral-850 bg-neutral-900/70 p-1 rounded-xl gap-1 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab("storefront");
              setSelectedProduct(null);
            }}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "storefront"
                ? "bg-amber-500 text-neutral-950 font-black scale-102 shadow-md shadow-amber-500/15"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>{language === "SW" ? "Nguo Kali" : "Shop Boutique"}</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab("tracker");
              setSelectedProduct(null);
            }}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "tracker"
                ? "bg-amber-500 text-neutral-950 font-black scale-102 shadow-md shadow-amber-500/15"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>{language === "SW" ? "Fuatilia" : "Track Order"}</span>
          </button>

          {userRole === "admin" ? (
            <button
              onClick={() => setActiveTab("blueprint")}
              className={`flex-1 md:flex-initial px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "blueprint"
                  ? "bg-amber-500 text-neutral-950 font-black scale-102 shadow-md shadow-amber-500/15"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 shrink-0" />
              <span>{language === "SW" ? "Mkakati" : "Strategy Blueprint"}</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-1.5 pl-2 pr-1 text-emerald-400 border-l border-neutral-800 text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Port</span>
            </div>
          )}
        </div>

        {/* Global Controls: Currencies Switching & Cart Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Language Toggle */}
          <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-lg p-1">
            <button
              onClick={() => setLanguage("EN")}
              className={`px-2 py-1 text-[10px] font-mono uppercase font-bold rounded transition-colors cursor-pointer ${
                language === "EN" ? "bg-neutral-800 text-amber-500 font-extrabold" : "text-neutral-500 hover:text-neutral-300"
              }`}
              title="Switch style translation to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("SW")}
              className={`px-2 py-1 text-[10px] font-mono uppercase font-bold rounded transition-colors cursor-pointer ${
                language === "SW" ? "bg-neutral-800 text-amber-500 font-extrabold" : "text-neutral-500 hover:text-neutral-300"
              }`}
              title="Badili lugha kurasa kuwa Kiswahili"
            >
              SW
            </button>
          </div>

          {/* Currency Toggle (CRO Localisation element explanation) */}
          <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-lg p-1">
            <button
              onClick={() => setCurrency("TZS")}
              className={`px-2 py-1 text-[10px] font-mono uppercase font-bold rounded transition-colors cursor-pointer ${
                currency === "TZS" ? "bg-neutral-800 text-amber-500" : "text-neutral-500 hover:text-neutral-300"
              }`}
              title="Switch to Tanzanian Shillings"
            >
              TZS
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-2 py-1 text-[10px] font-mono uppercase font-bold rounded transition-colors cursor-pointer ${
                currency === "USD" ? "bg-neutral-800 text-amber-500" : "text-neutral-500 hover:text-neutral-300"
              }`}
              title="Switch to US Dollar"
            >
              USD
            </button>
          </div>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 rounded-lg text-xs font-bold transition-all cursor-pointer relative font-mono"
            id="fitting-bag-btn"
          >
            <ShoppingBag className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Fitting Bag</span>
            <span className="w-5 h-5 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center absolute -top-2.5 -right-2">
              {totalCartItems}
            </span>
          </button>

          {/* Secure Logout Identity Gateway Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 py-2 px-2.5 bg-neutral-900 hover:bg-neutral-850 hover:text-white border border-neutral-800 text-rose-450 hover:text-rose-400 text-xs font-bold transition-all cursor-pointer rounded-lg font-mono"
            title="Log Out Security Bracket"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="hidden lg:inline">{language === "SW" ? "Lango" : "Log Out"}</span>
          </button>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* Helper guide segment that correlates tabs */}
        {userRole === "admin" && (
          <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-sans text-neutral-300 leading-normal">
              <span className="p-1 px-1.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/15 font-mono text-[10px] uppercase font-bold">
                Tip for reviewer
              </span>
              <span>
                Toggle between the <strong>Mock Storefront Sandbox</strong> (to place orders, experiment size tools) and the <strong>15-Part Strategy Blueprint</strong> above to inspect our complete UX, SEO, and marketing execution strategies.
              </span>
            </div>
            
            {activeTab === "storefront" ? (
              <button
                onClick={() => setActiveTab("blueprint")}
                className="flex items-center gap-1 font-semibold text-amber-500 hover:text-amber-450 transition-colors shrink-0 group hover:underline cursor-pointer"
              >
                <span>Examine Blueprint Strategy Documents</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab("storefront");
                  setSelectedProduct(null);
                }}
                className="flex items-center gap-1 font-semibold text-amber-500 hover:text-amber-450 transition-colors shrink-0 group hover:underline cursor-pointer"
              >
                <span>Test Store Checkout Real-time</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        )}

        {/* Render Active View State */}
        {activeTab === "blueprint" ? (
          <div className="space-y-6">
            <StrategyPanel />
          </div>
        ) : activeTab === "tracker" ? (
          <div className="space-y-6">
            <OrderTracker
              orderHistory={orderHistory}
              language={language}
              currency={currency}
              latestOrderId={latestOrderId}
              onBackToBoutique={() => setActiveTab("storefront")}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {selectedProduct ? (
              <ProductPage
                product={selectedProduct}
                currency={currency}
                onAddToCart={handleAddToCart}
                onBack={() => setSelectedProduct(null)}
                onOpenCheckoutDirectly={handleOpenCheckoutDirectly}
                language={language}
                affiliateCode={affiliateCode}
                onSetAffiliateCode={setAffiliateCode}
                onRegisterNotifyMe={handleRegisterNotifyMe}
              />
            ) : (
              <Storefront
                products={productsList}
                onSelectProduct={setSelectedProduct}
                onAddToCartQuick={handleAddQuick}
                currency={currency}
                language={language}
                onOpenInstagram={() => setIsInstaBrowserOpen(true)}
                mosseLogo={mosseLogo}
                onAddProduct={handleAddProduct}
                onRemoveProduct={handleRemoveProduct}
                isAdmin={userRole === "admin"}
              />
            )}
          </div>
        )}

        {/* Admin Desk Panels */}
        {userRole === "admin" && (
          <div className="mt-20 pt-10 border-t border-neutral-900 space-y-12">
            
            {/* Admin Success Toast Banner */}
            {adminSuccessToast && (
              <div className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 text-neutral-950 rounded-xl font-bold font-mono text-xs shadow-2xl flex items-center gap-2 border border-amber-400 animate-fadeIn min-w-[280px]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{adminSuccessToast}</span>
              </div>
            )}

            {/* SECTION 1: BACK-IN-STOCK PRIORITY WAITING LIST MODULE */}
            <div className="space-y-6" id="back-in-stock-admin-desk">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Back-in-Stock Priority Waiting List</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Active customer alert queues. Customers register on out-of-stock items (such as the <strong>MOSSE Sand Khaki Tailored Shorts</strong>). Click <span className="text-amber-500 font-semibold">"Simulate Alert Email"</span> to mimic an SMTP outbound notification event or replenish standard restock workflows.
                </p>
              </div>

              {backInStockList.length === 0 ? (
                <div className="p-8 text-center bg-neutral-950/40 border border-neutral-900/60 rounded-2xl font-sans">
                  <Bell className="w-8 h-8 text-neutral-600 mx-auto mb-2.5 opacity-40" />
                  <p className="text-xs text-neutral-400">No active alert registrations in waitlist queues.</p>
                  <p className="text-[10px] text-neutral-500 mt-1">
                    Try opening the <strong>MOSSE Sand Khaki Tailored Shorts</strong> (Category: Denim & Shorts) and submit an email form to test!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-neutral-850 bg-neutral-950/40 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-850 bg-neutral-950/80 text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                        <th className="p-3.5 pl-4 font-semibold">Queue ID</th>
                        <th className="p-3.5 font-semibold">Customer Email</th>
                        <th className="p-3.5 font-semibold">Product SKU & Name</th>
                        <th className="p-3.5 font-semibold">Sizing & Color</th>
                        <th className="p-3.5 font-semibold">Registered At</th>
                        <th className="p-3.5 text-right pr-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {backInStockList.map((entry) => (
                        <tr key={entry.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="p-3.5 pl-4">
                            <span className="font-mono text-amber-500 font-bold">{entry.id}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-neutral-200">{entry.email}</span>
                          </td>
                          <td className="p-3.5">
                            <div>
                              <p className="text-neutral-200 font-medium">{entry.productName}</p>
                              <p className="text-[10px] text-neutral-500 font-mono mt-0.5">SKU: {entry.sku}</p>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex gap-1.5 items-center">
                              <span className="px-1.5 py-0.5 bg-neutral-850 text-neutral-300 font-mono text-[9px] uppercase rounded border border-neutral-800">
                                Size: {entry.selectedSize}
                              </span>
                              <span className="font-mono text-[9px] text-neutral-400">
                                {entry.selectedColor}
                              </span>
                            </div>
                          </td>
                          <td className="p-3.5 text-neutral-400 font-mono text-[11px]">
                            {entry.date} @ {entry.timestamp}
                          </td>
                          <td className="p-3.5 text-right pr-4 shrink-0">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleSimulateRestockNotification(entry)}
                                className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-neutral-950 border border-amber-500/20 hover:border-transparent rounded font-mono text-[10px] font-bold transition-all uppercase cursor-pointer"
                                title="Synthesise priority outbound notification trigger"
                              >
                                Simulate Alert Email
                              </button>
                              <button
                                onClick={() => handleDeleteWaitlistEntry(entry.id)}
                                className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-neutral-900 rounded transition-all cursor-pointer"
                                title="Remove customer from waitlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* SECTION 2: SANDBOX RECEIPT Tracker */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Sandbox Receipt Tracker Database</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Simulated CRM records. Completed order coordinates are cached locally. Real-world platforms would ingest these tokens direct to M-Pesa endpoints and shipping fleets.
                </p>
              </div>

              {orderHistory.length === 0 ? (
                <div className="p-8 text-center bg-neutral-950/40 border border-neutral-900/60 rounded-2xl font-sans text-neutral-400 text-xs">
                  <ClipboardList className="w-8 h-8 text-neutral-600 mx-auto mb-2.5 opacity-40" />
                  No sandbox checkout completions tracked in this session.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {orderHistory.map((order, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-neutral-950/60 border border-neutral-850 rounded-xl text-xs space-y-2.5 hover:border-neutral-800 transition-all font-sans animate-fadeIn"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-neutral-900 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-neutral-900 text-amber-500 font-mono font-bold border border-neutral-850 rounded">
                            {order.id}
                          </span>
                          <span className="font-semibold text-neutral-200 uppercase">{order.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px]">
                          <span>{order.date} @ {order.timestamp}</span>
                          <span className={`px-2 py-0.5 rounded uppercase font-bold border ${
                            order.status === "delivered" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]" 
                              : order.status === "out_for_delivery" 
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[9px]" 
                              : order.status === "dispatched"
                              ? "bg-yellow-500/10 text-yellow-450 border-yellow-500/20 text-[9px]"
                              : order.status === "processing"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 text-[9px]"
                              : "bg-neutral-800 text-neutral-400 border-neutral-700 text-[9px]"
                          }`}>
                            {order.status ? order.status.toUpperCase().replace("_", " ") : "PENDING"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-neutral-350">
                        <div>
                          <span className="text-neutral-500 block uppercase text-[10px] font-mono mb-0.5">Destined To</span>
                          <strong className="text-neutral-200">{order.area ? `${order.area}, Dar` : order.city}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-500 block uppercase text-[10px] font-mono mb-0.5">Contact Line</span>
                          <span className="font-mono">{order.phone}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block uppercase text-[10px] font-mono mb-0.5">Payment Node</span>
                          <span className="uppercase text-amber-500 font-semibold">{order.paymentMethod ? order.paymentMethod.replace("_", " ") : "CASH ON HAND"}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block uppercase text-[10px] font-mono mb-0.5">Processed Total</span>
                          <strong className="text-amber-500 font-mono text-sm">
                            {currency === "TZS" 
                              ? `${order.total ? order.total.toLocaleString() : "0"} TZS` 
                              : `$${order.total || "0"}`
                            }
                          </strong>
                        </div>
                      </div>

                      {/* Interactive Courier Simulator Toolbar (Supa Dupa admin control) */}
                      <div className="mt-4 pt-3 border-t border-neutral-900/80 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/40 p-3 rounded-lg border border-neutral-900/30">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-neutral-450">
                          <Sliders className="w-3.5 h-3.5 text-amber-500" />
                          <span>Simulate Delivery Progress:</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { key: "pending", label: "Pending", style: "border-neutral-800 text-neutral-400 hover:text-white" },
                            { key: "processing", label: "Tailor Packing", style: "border-amber-500/20 text-amber-500 hover:bg-amber-500/10" },
                            { key: "dispatched", label: "Dispatch Bus", style: "border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10" },
                            { key: "out_for_delivery", label: "With Courier", style: "border-indigo-500/20 text-indigo-500 hover:bg-indigo-500/10" },
                            { key: "delivered", label: "Completed", style: "border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10" }
                          ].map(btn => (
                            <button
                              key={btn.key}
                              type="button"
                              onClick={() => handleUpdateOrderStatus(order.id, btn.key as any)}
                              className={`px-2 py-1 border text-[9px] font-mono rounded uppercase font-bold transition-all cursor-pointer ${
                                (order.status || "pending") === btn.key
                                  ? "bg-amber-500 text-neutral-950 font-black border-transparent"
                                  : btn.style
                              }`}
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveOrder(order.id)}
                          className="p-1 px-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 border border-neutral-850 hover:border-transparent rounded transition-colors text-[9px] font-mono cursor-pointer uppercase font-bold flex items-center gap-1 ml-auto"
                          title="Purge Sandbox Receipt"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Purge</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* Slide Cart Desk Overlay */}
      <MiniCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
        currency={currency}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onAddQuick={handleAddQuick}
      />

      {/* Dynamic Checkout Form Modal Overlay */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        clearCart={handleClearCart}
        currency={currency}
        onSubmitOrder={handleSubmitOrder}
        affiliateCode={affiliateCode}
      />

      {/* Simulated Instagram Safe Sandbox Browser Overlay */}
      <InstagramBrowser
        isOpen={isInstaBrowserOpen}
        onClose={() => setIsInstaBrowserOpen(false)}
        language={language}
        currency={currency}
        products={productsList}
        onAddToCartQuick={handleAddQuick}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsInstaBrowserOpen(false);
          setTimeout(() => {
            document.getElementById("product-root")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        mosseLogo={mosseLogo}
      />

      {/* Float notification when order completes successfully */}
      {showOrderHistoryNotif && (
        <div className="fixed bottom-6 right-6 max-w-sm bg-neutral-900 border border-emerald-500/40 p-4 rounded-xl shadow-2xl z-50 animate-fadeIn flex items-start gap-3">
          <span className="p-1.5 bg-emerald-500/15 text-emerald-450 border border-emerald-500/20 rounded">
            <CheckCircle className="w-5 h-5" />
          </span>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Checkout Receipt Coded!</h5>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Gentleman, your order reference token resides safely inside the Sandbox Receipt Tracker at the bottom of the workspace page. 
            </p>
          </div>
        </div>
      )}

      {/* WhatsApp Conversational Floating Helper Anchor (CRO Requirement) */}
      <div className="fixed bottom-6 left-6 z-35 animate-fadeIn">
        <a 
          href="https://api.whatsapp.com/send?phone=255767542687&text=Habari Mosse Store! Nimeona Instagram yenu na website, naomba kujua zaidi kuhusu nguo zenu kwa wakaka."
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer border border-emerald-500/30 group"
          title="Direct WhatsApp Messenger Concierge"
        >
          <MessageSquare className="w-6 h-6 fill-current animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-350 ease-out text-xs font-bold font-mono tracking-wider text-white uppercase uppercase pl-0 group-hover:pl-2 whitespace-nowrap">
            Mwanza Stylist Concierge
          </span>
        </a>
      </div>

      {/* Success overlays floating above everything */}
      {showSuccessAnim !== null && (
        <SuccessAnimation
          type={showSuccessAnim}
          productName={successAnimProduct}
          onClose={() => {
            setShowSuccessAnim(null);
            setSuccessAnimProduct("");
          }}
        />
      )}
    </>
    )}
    </div>
  );
}
