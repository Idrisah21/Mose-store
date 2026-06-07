/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Trash2, ShieldCheck, Ticket, Sparkles, ChevronRight, ShoppingCart, Plus, Minus } from "lucide-react";
import { CartItem, Product } from "../types";
import { PRODUCTS } from "../data/products";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (productId: string, size: string, colorHex: string) => void;
  onUpdateQty: (productId: string, size: string, colorHex: string, delta: number) => void;
  currency: "TZS" | "USD";
  onCheckout: () => void;
  onAddQuick: (p: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function MiniCart({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQty,
  currency,
  onCheckout,
  onAddQuick
}: MiniCartProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal e.g. 0.1 for 10%
  const [promoSuccessMessage, setPromoSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Compute metrics
  const itemTotal = cart.reduce((sum, item) => {
    const p = currency === "TZS" ? item.product.priceTZS : item.product.priceUSD;
    return sum + p * item.quantity;
  }, 0);

  const discountAmount = itemTotal * promoDiscount;
  const finalTotal = itemTotal - discountAmount;

  // Free delivery logic: 200,000 TZS or $80 USD
  const freeShippingThreshold = currency === "TZS" ? 250000 : 99;
  const deliveryLeft = freeShippingThreshold - itemTotal;
  const progressPct = Math.min((itemTotal / freeShippingThreshold) * 100, 100);

  // Cross Sell items recommendations: Products that are accessories when clothing is added, or vice-versa
  const isClothingInCart = cart.some(i => i.product.category.includes("Wear"));
  const crossSellCandidates = PRODUCTS.filter(p => {
    // Recommend accessories/shoes if clothing in cart, or vice versa
    if (isClothingInCart) {
      return p.category === "Accessories" || p.category === "Shoes";
    }
    return p.category.includes("Wear");
  }).slice(0, 2);

  const formatPrice = (value: number) => {
    if (currency === "TZS") {
      return `${Math.round(value).toLocaleString()} TZS`;
    }
    return `$${Math.round(value)}`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === "MOSSE10" || normalized === "MOZE10" || normalized === "GENTLEMAN") {
      setPromoDiscount(0.1);
      setPromoSuccessMessage("MOSSE GENTLEMAN Elite 10% Applied!");
    } else {
      alert("Gentleman, this secret token is outdated or incorrect.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      {/* Background Closer */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Cart Slider Panel */}
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl relative animate-slideLeft">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest font-sans">
              Elegant Fitting Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Gamification */}
        <div className="bg-neutral-950/50 border-b border-neutral-800/60 p-4">
          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
            <span>Progressive Delivery Reward</span>
            {deliveryLeft > 0 ? (
              <span className="text-amber-500 font-bold">
                Add {formatPrice(deliveryLeft)} more for FREE Boda Delivery
              </span>
            ) : (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>FREE PREMIUM EXPEDITE ACQUIRED!</span>
              </span>
            )}
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                deliveryLeft <= 0 ? "bg-emerald-500" : "bg-amber-500"
              }`}
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Cart Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 bg-neutral-800 text-neutral-500 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Fitting Bag is Vacant
                </h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Browse our elite catalog to select royal suits, handcrafted boots, and accessories tailored for East African professionals.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Start Selecting Items
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => {
                const itemPrice = currency === "TZS" ? item.product.priceTZS : item.product.priceUSD;
                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                    className="flex gap-4 p-3 bg-neutral-950/40 border border-neutral-850 rounded-xl relative hover:border-neutral-800 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800/80">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-neutral-100 hover:text-white line-clamp-1 pr-6 font-sans">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemove(item.product.id, item.selectedSize, item.selectedColor.hex)}
                            className="text-neutral-500 hover:text-rose-400 p-0.5 ml-2 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mt-1 text-[10px] text-neutral-400 font-mono">
                          <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                          <span className="flex items-center gap-1">
                            Color: 
                            <span 
                              className="w-2 h-2 rounded-full inline-block border border-neutral-80/60" 
                              style={{ backgroundColor: item.selectedColor.hex }}
                            ></span>
                            <strong className="text-white">{item.selectedColor.name}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Prices */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Custom Qty Counter */}
                        <div className="flex items-center border border-neutral-800 bg-neutral-900 rounded-md py-0.5 px-1.5 scale-90 -ml-1">
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor.hex, -1)}
                            className="p-1 hover:text-white text-neutral-400 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.selectedSize, item.selectedColor.hex, 1)}
                            className="p-1 hover:text-white text-neutral-400 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price block */}
                        <span className="text-xs font-mono font-bold text-amber-500">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Frequently Bought Together section (CRO Upsell) */}
          {cart.length > 0 && crossSellCandidates.length > 0 && (
            <div className="pt-6 border-t border-neutral-850/80">
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Frequently Bought Together
              </h5>
              <div className="space-y-2.5">
                {crossSellCandidates.map((product) => {
                  const defaultSize = product.sizes[0];
                  const defaultColor = product.colors[0];
                  const pPrice = currency === "TZS" ? product.priceTZS : product.priceUSD;

                  return (
                    <div 
                      key={product.id}
                      className="p-2.5 bg-neutral-950/60 border border-neutral-850/80 rounded-xl flex items-center gap-3 hover:border-neutral-800 transition-all text-xs"
                    >
                      <div className="w-10 h-12 rounded bg-neutral-900 overflow-hidden shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h6 className="text-[11px] font-semibold text-neutral-200 truncate font-sans">{product.name}</h6>
                        <span className="text-[10px] font-mono text-amber-500 font-semibold">{formatPrice(pPrice)}</span>
                      </div>
                      <button
                        onClick={() => onAddQuick(product, defaultSize, defaultColor)}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 text-amber-400 hover:text-neutral-950 font-bold font-mono text-[9px] uppercase rounded transition-colors cursor-pointer shrink-0"
                      >
                        + Add Bag
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Area with Price and Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-950/70 space-y-4">
            
            {/* Promo code area */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. MOSSE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg py-1.5 px-3 text-[10px] font-mono tracking-widest focus:outline-none focus:border-amber-500 uppercase text-white"
              />
              <button 
                type="submit"
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold font-sans text-[10px] rounded-lg cursor-pointer transition-colors uppercase tracking-wider"
              >
                Apply
              </button>
            </form>
            {promoSuccessMessage && (
              <p className="text-[10px] text-emerald-400 font-mono pl-1">{promoSuccessMessage}</p>
            )}

            {/* Price breaks summary */}
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center text-neutral-400">
                <span>Subtotal Items</span>
                <span className="font-mono">{formatPrice(itemTotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Elite Member Discount (-10%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2">
                <span>Next-hour Boda Shipping</span>
                <span className="text-emerald-500 font-bold uppercase font-mono text-[10px]">FREE</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white pt-1">
                <span className="uppercase tracking-wider">Estimated Total</span>
                <span className="text-amber-500 font-mono text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Interactive Secure seals */}
            <div className="flex items-center justify-between text-[9px] text-neutral-400 pt-2 border-t border-neutral-800/70 font-sans">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Secure Payments On Delivery</span>
              </span>
              <span className="font-mono text-neutral-500 uppercase tracking-wider">7-Day Fit Guarantee</span>
            </div>

            {/* Main Action CTAs */}
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs tracking-widest uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-mono shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10"
            >
              <span>Begin Fitting Verification</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
