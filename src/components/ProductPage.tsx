/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Ruler, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Clock, 
  ChevronDown, 
  Info,
  CheckCircle,
  Truck,
  RotateCcw,
  X,
  Share2,
  Copy,
  Mail,
  Bell
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";
import { TRANSLATIONS, Language } from "../utils/translations";

interface ProductPageProps {
  product: Product;
  currency: "TZS" | "USD";
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
  onBack: () => void;
  onOpenCheckoutDirectly: (p: Product, size: string, color: { name: string; hex: string }) => void;
  language: Language;
  affiliateCode: string;
  onSetAffiliateCode: (code: string) => void;
  onRegisterNotifyMe: (email: string, size: string, color: string) => void;
}

export default function ProductPage({
  product,
  currency,
  onAddToCart,
  onBack,
  onOpenCheckoutDirectly,
  language,
  affiliateCode,
  onSetAffiliateCode,
  onRegisterNotifyMe
}: ProductPageProps) {
  const t = TRANSLATIONS[language];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [successNotif, setSuccessNotif] = useState(false);
  const [customAffCodeInput, setCustomAffCodeInput] = useState(affiliateCode || "");
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [referralSuccessMsg, setReferralSuccessMsg] = useState("");
  const [sizingTab, setSizingTab] = useState<"tops" | "bottoms" | "shoes">("tops");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySuccessMsg, setNotifySuccessMsg] = useState("");
  const [notifyError, setNotifyError] = useState("");

  const formatPrice = (value: number) => {
    if (currency === "TZS") {
      return `${value.toLocaleString()} TZS`;
    }
    return `$${value}`;
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToBag = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setSuccessNotif(true);
    setTimeout(() => setSuccessNotif(false), 2000);
  };

  const handleNotifyMeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifyError("");
    setNotifySuccessMsg("");

    if (!notifyEmail) {
      setNotifyError(language === "SW" ? "Tafadhali weka barua pepe sahihi." : "Please enter a valid email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(notifyEmail)) {
      setNotifyError(
        language === "SW" 
          ? "Mfumo wa barua pepe si sahihi (e.g. jina@domain.com)" 
          : "Format error: Please use a valid email (e.g., name@domain.com)."
      );
      return;
    }

    onRegisterNotifyMe(notifyEmail, selectedSize, selectedColor.name);

    setNotifySuccessMsg(
      language === "SW" 
        ? `✓ Umesajiliwa kikamilifu! Tutakujulisha mara tu ${product.name} (Size: ${selectedSize}, Color: ${selectedColor.name}) inapopatikana.` 
        : `✓ Spot Secured! We have registered your alert for ${product.name} (Size: ${selectedSize}, Color: ${selectedColor.name}).`
    );
    setNotifyEmail("");
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setNotifySuccessMsg("");
    }, 5500);
  };

  const handleBuyOnWhatsapp = () => {
    const pValue = currency === "TZS" ? product.priceTZS : product.priceUSD;
    const priceStr = formatPrice(pValue);
    const refSuffix = affiliateCode ? `%0A*🛍️ Referral Affiliate Code:* ${affiliateCode} (Qualified for Complimentary Pocket Square)` : "";
    const template = `👑 *HELLO MOSSE STORE* 👑%0A-------------------------%0A*Inquiry SKU:* ${product.sku}%0A*Product Name:* ${product.name}%0A*Selected Size:* ${selectedSize}%0A*Selected Color:* ${selectedColor.name}%0A*Indicated Price:* ${priceStr}${refSuffix}%0A-------------------------%0AHi, I am browsing your online catalog and love this item. Is it available for delivery? Please confirm fitment sizing so I can finalize payment.`;
    
    // Redirect direct to API
    window.open(`https://api.whatsapp.com/send?phone=255767542687&text=${template}`, "_blank");
  };

  // Mock Reviews based on Product Category
  const getProductReviews = () => {
    return [
      {
        id: "r-1",
        author: "Fadhili Aron",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
        rating: 5,
        title: "Bora sana / Perfect Fit!",
        text: "Kwenye denim na suruali nina picky sana kwasababu nina body kubwa, lakini jeans hizi zimekaa vizuri mno kiunoni bila kubana kama nimedizainiwa mimi. Delivery took less than 24 hours to Arusha. Mosse ni international standards kabisa!",
        date: "2026-06-03",
        verified: true,
        replied: "Shukrani sana Kaka! Sisi Mosse tunahakikisha kila nguo na size inakaa vyema na dapper fitment. Karibu tena!"
      },
      {
        id: "r-2",
        author: "John Kamau",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
        rating: 5,
        title: "Uncompromising Suede Sourcing",
        text: "Ordered these Chelsea boots to Nairobi. Was skeptical of sizing but used their height prediction engine. It fits flawlessly. Premium suede texture that repels light drizzle nicely. Highly optimized buy!",
        date: "2026-05-28",
        verified: true
      },
      {
        id: "r-3",
        author: "Almasi M.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
        rating: 4,
        title: "Very fast shipping to Mwanza",
        text: "Niliipata kupitia bus courier ndani ya siku moja. Nilipenda jinsi ilivyofungwa kwenye box lile la mbao. Luxury leather detail is beautiful. Will buy the blue suit next week.",
        date: "2026-05-15",
        verified: true,
        replied: "Habari Almasi! Furaha yetu ni kuona mzigo unasafiri salama hadi mkoani. Tunao hifadhia suit yako!"
      }
    ];
  };

  return (
    <div className="space-y-12 animate-fadeIn" id="product-root">
      
      {/* Return Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-all text-xs font-sans font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.returnCatalog}</span>
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Visual Galleries (Lanes 5) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Display Image with Loupe Zoom */}
          <div 
            className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative cursor-zoom-in"
            onMouseMove={handleZoomMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img 
              src={product.images[activeImageIdx]} 
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-100 ${
                isZoomed ? "scale-220 origin-center" : "scale-100"
              }`}
              style={{
                transformOrigin: isZoomed ? `${mousePos.x}% ${mousePos.y}%` : "center center"
              }}
              referrerPolicy="no-referrer"
            />

            {/* Quick Helper tag */}
            <span className="absolute bottom-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-mono tracking-widest text-neutral-300 uppercase">
              {isZoomed ? "Move cursor to Inspect Fiber Texture" : "Hover to Zoom Close-Up"}
            </span>

            {/* Sizing Indicator Badge */}
            {product.stock <= 5 && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-rose-500 text-white text-[10px] uppercase font-mono tracking-widest rounded-full font-extrabold animate-pulse border border-rose-400/20">
                ⚠️ Urgent: Only {product.stock} Left in Dar
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 aspect-square rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  activeImageIdx === idx 
                    ? "border-amber-500 scale-95 ring-2 ring-amber-500/10" 
                    : "border-neutral-800 opacity-60 hover:opacity-100"
                }`}
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information Desk (Lanes 7) */}
        <div className="lg:col-span-6 space-y-6 lg:py-2">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                {product.category}
              </span>
              <span className="text-xs text-neutral-500 font-mono">SKU ID: {product.sku}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-neutral-300 font-medium">{product.rating}</span>
              <span className="text-neutral-500 text-xs">•</span>
              <span className="text-xs text-neutral-400 font-mono underline">{product.ratingCount} Verified Gentlemen Reviews</span>
            </div>
          </div>

          {/* Pricing Desk */}
          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">{language === "SW" ? "Kiasi Halisi Kimelipiwa kodi" : "Localized Fair Price"}</p>
              <p className="text-2xl font-extrabold text-amber-500 font-mono mt-0.5">
                {formatPrice(currency === "TZS" ? product.priceTZS : product.priceUSD)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono">
                {language === "SW" ? "✓ Malipo Baada ya Uhakiki" : "✓ Cash on Delivery Accepted"}
              </span>
              <p className="text-[9px] text-neutral-400 mt-1.5 font-sans">{language === "SW" ? "Usafirishaji ukijumuisha forodha nchini" : "Including duty clearing inside Tanzania"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">{language === "SW" ? "Maelezo Maridadi" : "Sartorial Purpose"}</h4>
            <p className="text-neutral-300 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Variant Selector Colors */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">{t.selectColor}</h4>
            <div className="flex gap-3">
              {product.colors.map((col) => {
                const isSelected = selectedColor.hex === col.hex;
                return (
                  <button
                    key={col.hex}
                    onClick={() => setSelectedColor(col)}
                    className={`flex items-center gap-2 py-1 px-3 border rounded-lg transition-all cursor-pointer text-xs ${
                      isSelected 
                        ? "border-amber-500 bg-amber-500/5 text-white shadow-lg" 
                        : "border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full inline-block border border-black/40" 
                      style={{ backgroundColor: col.hex }}
                    ></span>
                    <span className="font-medium">{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Variant Selector Sizing with Size Guide Button */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                {t.selectSize}
              </h4>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-450 transition-colors font-semibold cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span className="underline">{language === "SW" ? "Mwongozo wa Vipimo" : "Interactive Sizing Guide"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-11 border text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                      isSelected 
                        ? "border-amber-500 bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10" 
                        : "border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 bg-neutral-950/25"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strategic Trust Badges (CRO Requirement) */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-850">
            <div className="flex flex-col items-center text-center p-2.5 bg-neutral-950/50 rounded-xl border border-neutral-850">
              <Truck className="w-4 h-4 text-amber-500 mb-1" />
              <span className="text-[10px] font-bold text-neutral-200 uppercase font-sans">Next-Hour</span>
              <span className="text-[9px] text-neutral-400 mt-0.5">Dar-Es-Salaam Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-2.5 bg-neutral-950/50 rounded-xl border border-neutral-850">
              <RotateCcw className="w-4 h-4 text-amber-500 mb-1" />
              <span className="text-[10px] font-bold text-neutral-200 uppercase">7-Day Swap</span>
              <span className="text-[9px] text-neutral-400 mt-0.5">Full Sizing Exchange</span>
            </div>
            <div className="flex flex-col items-center text-center p-2.5 bg-neutral-950/50 rounded-xl border border-neutral-850">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
              <span className="text-[10px] font-bold text-neutral-200 uppercase">COD Option</span>
              <span className="text-[9px] text-neutral-400 mt-0.5">Touch & Try Guarantee</span>
            </div>
          </div>

          {/* Dual Placement Action CTAs */}
          <div className="pt-4 space-y-3">
            {product.stock <= 0 ? (
              <div className="space-y-4">
                {/* Out of Stock Status Banner */}
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-xl flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold uppercase tracking-wider font-mono">
                      {language === "SW" ? "HAIPATIKANI KWA SASA / OUT OF STOCK" : "🔴 OUT OF STOCK / SOLD OUT"}
                    </p>
                    <p className="text-neutral-400 mt-0.5 leading-relaxed">
                      {language === "SW" 
                        ? `Jeans hizi (Size: ${selectedSize}) hazipo kwa sasa katika duka letu.`
                        : `This product size is currently fully sold out. Drop your email below to be notified first!`}
                    </p>
                  </div>
                </div>

                {/* Notify Me Registration Box */}
                <div className="bg-neutral-950 border border-amber-500/15 p-4 md:p-5 rounded-xl space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <h5 className="text-xs font-mono font-black text-amber-500 uppercase tracking-widest">
                      {language === "SW" ? "Nijulishe Bidhaa Hii Ikirejea" : "BACK-IN-STOCK WAITING QUEUE"}
                    </h5>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {language === "SW"
                      ? "Ingiza email yako hapa chini ili uwe wa kwanza kabisa kufahamishwa mara tu mzigo utakapoingia!"
                      : "Provide your email address below. We'll send you an instant notification with VIP early-access booking slots as soon as we drop the restock."}
                  </p>

                  <form onSubmit={handleNotifyMeSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        value={notifyEmail}
                        onChange={(e) => {
                          setNotifyEmail(e.target.value);
                          setNotifyError("");
                        }}
                        placeholder={language === "SW" ? "Andika barua pepe yako hapa..." : "Enter your email address..."}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 placeholder-neutral-500 text-xs rounded-lg outline-none transition-colors"
                      />
                    </div>

                    {notifyError && (
                      <p className="text-[10px] text-rose-500 font-mono flex items-center gap-1.5 animate-fadeIn">
                        ⚠️ <span>{notifyError}</span>
                      </p>
                    )}

                    {notifySuccessMsg && (
                      <div className="p-3 bg-neutral-900 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs leading-relaxed font-mono flex items-start gap-2.5 animate-fadeIn">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{notifySuccessMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs tracking-widest uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Bell className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === "SW" ? "Nijulishe" : "Notify Me When Available"}</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Standard Add Bag */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToBag}
                    className="flex-1 py-4 bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs tracking-widest uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>{language === "SW" ? "Weka Kwenye Bag" : "Add Sizing to Cart"}</span>
                  </button>
                  
                  {/* Checkout Directly Shortcut */}
                  <button
                    onClick={() => onOpenCheckoutDirectly(product, selectedSize, selectedColor)}
                    className="flex-1 py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs tracking-widest uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg font-mono shadow-amber-500/10"
                  >
                    <span>{language === "SW" ? "Nenda Kwenye Lipa" : "Instant Checkout"}</span>
                  </button>
                </div>

                {/* Direct WhatsApp Quick-Inquiry (CRO conversion trigger) */}
                <button
                  onClick={handleBuyOnWhatsapp}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg font-mono shadow-emerald-900/10"
                >
                  <MessageSquare className="fill-current w-4 h-4" />
                  <span>{language === "SW" ? "Hakiki Sizing via WhatsApp" : "Request Sizing Verification via WhatsApp"}</span>
                </button>

                {successNotif && (
                  <div className="p-3 bg-neutral-950 border border-amber-500/30 text-amber-500 rounded-lg text-xs leading-relaxed font-mono flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Success: {product.name} (Size {selectedSize}) loaded in your Fitting Bag!</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Garment details dropdown */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/30">
            <div className="p-4 border-b border-neutral-800 bg-neutral-950/60 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Material Composition & Care Guidelines
              </span>
            </div>
            <div className="p-4 space-y-2">
              {product.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                  <span className="text-amber-500 font-mono mt-0.5">•</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mosse Gold Partner Refer-and-Earn Program Section */}
          <div className="border border-amber-500/20 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950/25 rounded-xl p-4 md:p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-450 rounded-xl border border-amber-500/15">
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest leading-tight">
                  {language === "SW" ? "Sajili / Pata Pesa za Komisheni" : "Partner Refer-and-Earn Program"}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  {language === "SW" ? "Tengenezewa komishini kwa kuleta wateja" : "Convince others & earn cash commissions on sale clearance"}
                </p>
              </div>
            </div>

            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>
                {language === "SW" 
                  ? "Gentleman, washirikishe wenzako kiungo maalum cha bidhaa hii. Pindi mteja mwingine atakaponunua kupitia kiungo chako, taarifa maalum zilizo na jina lako zitatumwa kiotomatiki kwenye WhatsApp ili kulipwa komisheni yako haraka kufuatia agizo kukamilika!"
                  : "Convince fellow gentlemen of Mosse standards! Share your custom referral link for this product. Once they successfully complete checkout, a customized referral link mapping your handle name compiles directly to the owner's WhatsApp so we can transfer your cash commission!"
                }
              </p>
              
              <div className="flex gap-2 text-[10px] font-semibold text-amber-500 bg-amber-550/10 p-2 rounded-lg border border-amber-500/15">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {language === "SW" ? "Ziada: 10% ya Thamani ya nguo kulipwa kupitia Mobile Money!" : "Sartorial Bounty: 10% of Order Value credited directly upon order confirmation!"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-neutral-400">
                <label>
                  {language === "SW" ? "Ingiza Jina/ID Yako ya Usharika:" : "Your Referral Code / Handle Name:"}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const randomSuffix = Math.floor(100 + Math.random() * 900);
                    const suggested = `MosseGent_${randomSuffix}`;
                    setCustomAffCodeInput(suggested);
                    // Automatically click Lock Code
                    onSetAffiliateCode(suggested);
                    setReferralSuccessMsg(language === "SW" ? "Kodi ya usharika imehifadhiwa kikamilifu!" : "Referral code saved successfully!");
                    setTimeout(() => setReferralSuccessMsg(""), 2500);
                  }}
                  className="text-amber-500 hover:text-amber-400 transition-colors uppercase font-bold cursor-pointer"
                >
                  {language === "SW" ? "Suggest Handle ✦" : "Suggest Handle ✦"}
                </button>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="e.g. Aron255"
                  value={customAffCodeInput}
                  onChange={(e) => {
                    const cleanValue = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "");
                    setCustomAffCodeInput(cleanValue);
                  }}
                  className="flex-1 bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-3.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-100 font-mono tracking-wide"
                />
                
                <button
                  type="button"
                  onClick={() => {
                    if (!customAffCodeInput.trim()) {
                      alert(language === "SW" ? "Tafadhali weka jina lako la ushirika kwanza!" : "Please provide your referral handle first!");
                      return;
                    }
                    onSetAffiliateCode(customAffCodeInput.trim());
                    setReferralSuccessMsg(language === "SW" ? "Kodi imezalishwa na kuhifadhiwa kikamilifu!" : "Ref Link generated and locked successfully!");
                    setTimeout(() => setReferralSuccessMsg(""), 2500);
                  }}
                  className="px-4 py-2.5 bg-amber-500 text-neutral-950 hover:bg-amber-450 text-[10px] uppercase font-mono font-black rounded-lg transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === "SW" ? "Tengeneza Kiungo" : "Generate Link"}</span>
                </button>
              </div>

              {referralSuccessMsg && (
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 animate-pulse">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{referralSuccessMsg}</span>
                </p>
              )}
            </div>

            {/* Generated referral link component */}
            {customAffCodeInput.trim() && (
              <div className="border border-neutral-850 bg-neutral-950 p-4 rounded-xl space-y-4 animate-fadeIn">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Active Tracking Mechanism:</span>
                    {affiliateCode === customAffCodeInput.trim() ? (
                      <span className="text-[8px] bg-emerald-550/10 text-emerald-400 font-mono tracking-wider font-extrabold px-1.5 py-0.5 border border-emerald-500/15 rounded uppercase">
                        ✓ Active & Tracking Live
                      </span>
                    ) : (
                      <span className="text-[8px] bg-rose-500/10 text-rose-450 font-mono tracking-wider px-1.5 py-0.5 rounded uppercase">
                        Waiting for lock activation
                      </span>
                    )}
                  </div>
                  
                  <div className="p-2.5 bg-neutral-900 border border-neutral-850 rounded-lg text-xs font-mono text-amber-500 break-all select-all flex items-center justify-between gap-2">
                    <span className="truncate">{window.location.origin}/?ref={encodeURIComponent(customAffCodeInput.trim())}</span>
                    <span className="text-[8px] bg-neutral-950 px-1 py-0.5 rounded border border-neutral-800 shrink-0 text-neutral-400">PROMO</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const link = `${window.location.origin}/?ref=${encodeURIComponent(customAffCodeInput.trim())}`;
                      navigator.clipboard.writeText(link);
                      setCopiedReferral(true);
                      setTimeout(() => setCopiedReferral(false), 2000);
                    }}
                    className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono font-bold uppercase rounded-md border border-neutral-800 flex items-center justify-center gap-1.5 text-neutral-200 cursor-pointer transition-all"
                  >
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span>{copiedReferral ? (language === "SW" ? "Imenakiliwa!" : "Copied!") : (language === "SW" ? "Copy Affiliate Link" : "Copy Affiliate Link")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const link = `${window.location.origin}/?ref=${encodeURIComponent(customAffCodeInput.trim())}`;
                      const shareText = language === "SW"
                        ? `Mambo kaka, nimevutiwa na nguo hizi kali kutoka Mosse Store Mwanza Tanzania. Ukizitaka, agiza kupitia kiungo changu ili upate zawadi ya bure ya pocket square kukuongezea muonekano maridadi kabisa: ${link}`
                        : `Hey gentleman! Discovered this premium clothing catalog at Mosse Store Mwanza. Tap my referral link to look through their dapper fits and place your order (comes with a complimentary pocket square package): ${link}`;
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
                    }}
                    className="flex-1 py-2 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-[10px] font-mono font-bold uppercase rounded-md border border-emerald-500/25 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 shrink-0 text-emerald-450" />
                    <span>{language === "SW" ? "WhatsApp Share" : "WhatsApp Share"}</span>
                  </button>
                </div>

                {/* Simulated Real-Time Commission tracker map to help users understand tracking */}
                <div className="pt-3 border-t border-neutral-900 space-y-2.5">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                    {language === "SW" ? "Mchakato wa kufuatilia komisheni yako:" : "Compensation Pipeline & Commission Tracking:"}
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[9px] font-mono">
                    <div className="p-2 bg-neutral-900 border border-neutral-900 rounded-lg text-center space-y-1">
                      <div className="text-amber-500 font-bold uppercase">Step 1</div>
                      <div className="text-[8px] text-neutral-400 leading-tight">Create handle & Copy your link</div>
                      <div className="text-[8px] text-emerald-400 font-extrabold flex justify-center items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        READY
                      </div>
                    </div>

                    <div className="p-2 bg-neutral-900 border border-neutral-900 rounded-lg text-center space-y-1">
                      <div className="text-amber-500 font-bold uppercase">Step 2</div>
                      <div className="text-[8px] text-neutral-400 leading-tight">Customer taps link & updates cart</div>
                      <div className="text-[8px] text-neutral-500 font-extrabold mt-1">PENDING BUY</div>
                    </div>

                    <div className="p-2 bg-neutral-900 border border-neutral-900 rounded-lg text-center space-y-1">
                      <div className="text-amber-500 font-bold uppercase">Step 3</div>
                      <div className="text-[8px] text-neutral-400 leading-tight">Direct WhatsApp order to WhatsApp Hub</div>
                      <div className="text-[8px] text-neutral-500 font-extrabold mt-1">MAPPED LIVE</div>
                    </div>

                    <div className="p-2 bg-neutral-900 border border-neutral-900 rounded-lg text-center space-y-1">
                      <div className="text-amber-500 font-bold uppercase">Step 4</div>
                      <div className="text-[8px] text-neutral-400 leading-tight">Receive 10% Cash payout on pay settlement</div>
                      <div className="text-[8px] text-amber-500 font-extrabold mt-1">TSh / USD SENT</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Desk Grid */}
      <div className="border-t border-neutral-800/80 pt-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">
              Verified Shopper Experience Panel
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Reflecting authentic accounts from our physical fitting loops inside Masaki Lounge & mkoani.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">Authentic Client Ratio:</span>
            <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded">
              98.4% Exceptional
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getProductReviews().map((review) => (
            <div 
              key={review.id}
              className="p-5 bg-neutral-950/40 border border-neutral-850 rounded-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                {/* Header author info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{review.author}</h5>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] text-neutral-400 font-mono">{review.date}</span>
                      {review.verified && (
                        <span className="text-[8px] font-mono font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-1 border border-emerald-500/20 rounded">
                          ✓ Verified Gentleman Buy
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>

                <div className="space-y-1">
                  <h6 className="text-xs font-bold text-neutral-100">{review.title}</h6>
                  <p className="text-neutral-300 text-xs leading-relaxed italic">{review.text}</p>
                </div>
              </div>

              {/* Replied text by Mosse Concierge */}
              {review.replied && (
                <div className="bg-neutral-950/80 p-3 rounded-lg border border-neutral-800/80 text-[10px] space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    <span className="font-bold text-amber-500 uppercase font-mono tracking-wider">Mosse Concierge Reply:</span>
                  </div>
                  <p className="text-neutral-400 leading-normal font-sans italic">{review.replied}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sizing Guide modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-55 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full p-5 md:p-6 space-y-5 animate-scaleUp">
            <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-500" />
                <h4 className="text-md font-bold text-white uppercase tracking-wider font-sans">
                  Sartorial Comparative Fit Matrix & Tailoring Guide
                </h4>
              </div>
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 bg-neutral-850 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-neutral-400 text-xs">
              Gentlemen across East Africa customize their wardrobes dynamically. Toggle below to compare precise tailoring measurements (chest, shoulders, sleeves, waist, inseam) mapped to standard catalog sizing.
            </p>

            {/* TAB SELECTOR FOR SIZE GUIDE */}
            <div className="flex border border-neutral-800 bg-neutral-950 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setSizingTab("tops")}
                className={`flex-1 py-2 text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg transition-all ${
                  sizingTab === "tops" 
                    ? "bg-amber-500 text-neutral-950" 
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Tops & Blazers (S - XXL)
              </button>
              <button
                type="button"
                onClick={() => setSizingTab("bottoms")}
                className={`flex-1 py-2 text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg transition-all ${
                  sizingTab === "bottoms" 
                    ? "bg-amber-500 text-neutral-950" 
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Denim & Trouser Sizes (28 - 40)
              </button>
              <button
                type="button"
                onClick={() => setSizingTab("shoes")}
                className={`flex-1 py-2 text-[10px] font-mono tracking-wider font-bold uppercase rounded-lg transition-all ${
                  sizingTab === "shoes" 
                    ? "bg-amber-500 text-neutral-950" 
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Footwear Standards (40 - 45)
              </button>
            </div>

            {/* SIZING DETAILS CONDITIONAL PANELS */}
            {sizingTab === "tops" && (
              <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-neutral-950 border-b border-neutral-850 text-neutral-400 font-bold">
                      <th className="py-2.5 px-3">Mosse Size</th>
                      <th className="py-2.5 px-3">Shoulders (bega)</th>
                      <th className="py-2.5 px-3">Chest (kifua)</th>
                      <th className="py-2.5 px-3">Sleeve (mikono)</th>
                      <th className="py-2.5 px-3">EU/UK equivalents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850 text-neutral-300">
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">S (46R)</td>
                      <td className="py-2.5 px-3">17.3" (44 cm)</td>
                      <td className="py-2.5 px-3">38.0" (96 cm)</td>
                      <td className="py-2.5 px-3">24.0" (61 cm)</td>
                      <td className="py-2.5 px-3">UK 36R (EU 46)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">M (48R)</td>
                      <td className="py-2.5 px-3">18.1" (46 cm)</td>
                      <td className="py-2.5 px-3">40.0" (101.5 cm)</td>
                      <td className="py-2.5 px-3">24.6" (62.5 cm)</td>
                      <td className="py-2.5 px-3">UK 38R (EU 48)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">L (50R)</td>
                      <td className="py-2.5 px-3">18.9" (48 cm)</td>
                      <td className="py-2.5 px-3">42.0" (107 cm)</td>
                      <td className="py-2.5 px-3">25.2" (64 cm)</td>
                      <td className="py-2.5 px-3">UK 40R (EU 50)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">XL (52R)</td>
                      <td className="py-2.5 px-3">19.7" (50 cm)</td>
                      <td className="py-2.5 px-3">44.5" (113 cm)</td>
                      <td className="py-2.5 px-3">25.8" (65.5 cm)</td>
                      <td className="py-2.5 px-3">UK 42R (EU 52)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">XXL (54R)</td>
                      <td className="py-2.5 px-3">20.5" (52 cm)</td>
                      <td className="py-2.5 px-3">47.0" (119 cm)</td>
                      <td className="py-2.5 px-3">26.4" (67 cm)</td>
                      <td className="py-2.5 px-3">UK 44R (EU 54)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {sizingTab === "bottoms" && (
              <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-neutral-950 border-b border-neutral-850 text-neutral-400 font-bold">
                      <th className="py-2.5 px-3">Jeans/Short Size</th>
                      <th className="py-2.5 px-3">Waist (kiuno)</th>
                      <th className="py-2.5 px-3">Hip (nyonga)</th>
                      <th className="py-2.5 px-3 font-sans">Inseam / Length</th>
                      <th className="py-2.5 px-3 font-sans">Thigh Width</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850 text-neutral-300">
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">28 - 30</td>
                      <td className="py-2.5 px-3">31.5" (80 cm)</td>
                      <td className="py-2.5 px-3">38.6" (98 cm)</td>
                      <td className="py-2.5 px-3">31.9" (81 cm)</td>
                      <td className="py-2.5 px-3">22.8" (58 cm)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">32</td>
                      <td className="py-2.5 px-3">33.5" (85 cm)</td>
                      <td className="py-2.5 px-3">40.6" (103 cm)</td>
                      <td className="py-2.5 px-3">31.9" (81 cm)</td>
                      <td className="py-2.5 px-3">24.0" (61 cm)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">34</td>
                      <td className="py-2.5 px-3">35.4" (90 cm)</td>
                      <td className="py-2.5 px-3">42.5" (108 cm)</td>
                      <td className="py-2.5 px-3">32.3" (82 cm)</td>
                      <td className="py-2.5 px-3">25.2" (64 cm)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">36</td>
                      <td className="py-2.5 px-3">37.4" (95 cm)</td>
                      <td className="py-2.5 px-3">44.5" (113 cm)</td>
                      <td className="py-2.5 px-3">32.3" (82 cm)</td>
                      <td className="py-2.5 px-3">26.4" (67 cm)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">40</td>
                      <td className="py-2.5 px-3">41.3" (105 cm)</td>
                      <td className="py-2.5 px-3">48.4" (123 cm)</td>
                      <td className="py-2.5 px-3">32.7" (83 cm)</td>
                      <td className="py-2.5 px-3">28.7" (73 cm)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {sizingTab === "shoes" && (
              <div className="overflow-x-auto border border-neutral-800 rounded-xl">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-neutral-950 border-b border-neutral-850 text-neutral-400 font-bold">
                      <th className="py-2.5 px-3">EU Shoe Size</th>
                      <th className="py-2.5 px-3">UK equivalent</th>
                      <th className="py-2.5 px-3">US equivalent</th>
                      <th className="py-2.5 px-3 font-sans">Insole Length</th>
                      <th className="py-2.5 px-3 font-sans">Comfort Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850 text-neutral-300">
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">40</td>
                      <td className="py-2.5 px-3">6.5</td>
                      <td className="py-2.5 px-3">7.5</td>
                      <td className="py-2.5 px-3">10.0" (25.4 cm)</td>
                      <td className="py-2.5 px-3">Dressed Fit</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">41</td>
                      <td className="py-2.5 px-3">7.0</td>
                      <td className="py-2.5 px-3">8.0</td>
                      <td className="py-2.5 px-3">10.2" (26.0 cm)</td>
                      <td className="py-2.5 px-3">Generous Suede Fit</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">42</td>
                      <td className="py-2.5 px-3">8.0</td>
                      <td className="py-2.5 px-3">9.0</td>
                      <td className="py-2.5 px-3">10.5" (26.7 cm)</td>
                      <td className="py-2.5 px-3">Prestige Classic</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">43</td>
                      <td className="py-2.5 px-3">9.0</td>
                      <td className="py-2.5 px-3">10.0</td>
                      <td className="py-2.5 px-3">10.7" (27.3 cm)</td>
                      <td className="py-2.5 px-3">Roomy Toe Box</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">44</td>
                      <td className="py-2.5 px-3">10.0</td>
                      <td className="py-2.5 px-3">11.0</td>
                      <td className="py-2.5 px-3">11.0" (28.0 cm)</td>
                      <td className="py-2.5 px-3">Solid Stride Cushion</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-extrabold text-amber-500">45</td>
                      <td className="py-2.5 px-3">11.0</td>
                      <td className="py-2.5 px-3">12.0</td>
                      <td className="py-2.5 px-3">11.3" (28.6 cm)</td>
                      <td className="py-2.5 px-3">Wide Gentleman Fit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-start gap-2.5 text-[10px] text-neutral-400">
              <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Perfect Fit Safeguard Policy:</strong> If the sizing ordered isn't immaculately snug and styling correct, notify your dedicated Masaki concierges. We dispatch free size swappers right to your door inside 24 hours in Dar, or via next bus courier to all Tanzanian regions.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
