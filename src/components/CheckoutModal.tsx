/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Lock, CheckCircle, MessageSquare, PhoneCall, AlertCircle, Sparkle } from "lucide-react";
import { CartItem } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  clearCart: () => void;
  currency: "TZS" | "USD";
  onSubmitOrder: (orderId: string, details: any) => void;
  affiliateCode?: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  clearCart,
  currency,
  onSubmitOrder,
  affiliateCode
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Mwanza",
    area: "Malimbe",
    customArea: "",
    address: "",
    paymentMethod: "whatsapp" // 'whatsapp' | 'mobile_money' | 'cod' | 'card'
  });

  const [paymentNetwork, setPaymentNetwork] = useState("mpesa"); // 'mpesa' | 'tigopesa' | 'airtelmoney'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [whatsappString, setWhatsappString] = useState("");

  if (!isOpen) return null;

  const orderTotal = cart.reduce((sum, item) => {
    const p = currency === "TZS" ? item.product.priceTZS : item.product.priceUSD;
    return sum + p * item.quantity;
  }, 0);

  const formatPrice = (value: number) => {
    if (currency === "TZS") {
      return `${value.toLocaleString()} TZS`;
    }
    return `$${value}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const compileWhatsappMessage = (orderId: string) => {
    const itemsList = cart.map(item => 
      `• ${item.product.name}%0A  Category: ${item.product.category}%0A  Size: ${item.selectedSize} | Color: ${item.selectedColor.name}%0A  Price: ${formatPrice(currency === "TZS" ? item.product.priceTZS : item.product.priceUSD)} x ${item.quantity}`
    ).join("%0A%0A");

    const totalText = formatPrice(orderTotal);
    const destination = formData.city === "Mwanza" ? `${formData.area}, Mwanza` : formData.city;
    const clientPhone = formData.phone;

    const refSection = affiliateCode 
      ? `%0A*🎁 REFERRAL AFFILIATE CODE:* ${affiliateCode}%0A*💰 Compensation pending dispatch:* 10% Cash Commission%0A  _Note: Complimentary styling pocket square package added to order._%0A`
      : "";

    const template = `👑 *NEW MOSSE STORE ORDER* 👑%0A-------------------------%0A*Order Reference:* ${orderId}%0A*Client Name:* ${formData.name}%0A*Contact Phone:* ${clientPhone}%0A*Delivery Destination:* ${destination}%0A*Street Address:* ${formData.address}%0A${refSection}%0A*🛍️ ITEMS ORDERED:*%0A${itemsList}%0A%0A-------------------------%0A*Total Order Value:* ${totalText}%0A*Preferred Payment:* ${formData.paymentMethod.toUpperCase()}%0A-------------------------%0AHabari Mosse Store Mwanza! I have confirmed my fashion checkout selection above. Please initiate fitting verification and delivery scheduling right away.`;

    return `https://api.whatsapp.com/send?phone=255767542687&text=${template}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Gentleman, please provide both your Name and Contact Phone number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable CRM receipt
    setTimeout(() => {
      const orderId = `MZ-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(orderId);
      
      const waUrl = compileWhatsappMessage(orderId);
      setWhatsappString(waUrl);
      setIsSubmitting(false);
      setOrderSuccess(true);
      
      onSubmitOrder(orderId, {
        ...formData,
        total: orderTotal,
        itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
        date: new Date().toLocaleDateString()
      });
    }, 1500);
  };

  const handleFinishCheckout = () => {
    clearCart();
    onClose();
    setOrderSuccess(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="border-b border-neutral-800 p-5 flex items-center justify-between bg-neutral-950/40">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-500/10 text-amber-500 rounded">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-md font-bold text-white tracking-wide uppercase font-sans">
                Secure Portal Checkout
              </h3>
              <p className="text-[11px] text-neutral-400">Zero Friction • Complete Safeguards</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {orderSuccess ? (
          <div className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Order Structured Successfully!</h4>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
              Your Reference Token is <span className="text-amber-500 font-mono font-bold">{generatedOrderId}</span>. 
              We have captured your fashion sizing preferences and initialized our fulfillment line.
            </p>

            <div className="max-w-md mx-auto bg-neutral-950/70 p-5 border border-neutral-800 rounded-xl text-left mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-mono text-sm mt-0.5">01.</span>
                <div>
                  <h5 className="text-xs font-bold text-neutral-200 uppercase">Immediate Next Action:</h5>
                  <p className="text-xs text-neutral-400 mt-1">
                    To instantly lock in your order with instant dispatcher dispatching, tap the WhatsApp Dispatcher line below.
                  </p>
                </div>
              </div>

              {formData.paymentMethod === "mobile_money" && (
                <div className="flex items-start gap-3 border-t border-neutral-800 pt-3">
                  <span className="text-amber-500 font-mono text-sm mt-0.5">02.</span>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200 uppercase">Mobile Money Payment Protocol:</h5>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Dial <span className="text-amber-400 font-mono">*150*00#</span> (M-Pesa) or <span className="text-amber-400 font-mono">*150*01#</span> (Tigo Pesa). Send funds to MOSSE STORE / MOSES FASHION line <span className="text-amber-400 font-mono">0767542687</span>. Enter exact total <span className="text-amber-400 font-semibold">{formatPrice(orderTotal)}</span>. Your stylist will verify and confirm immediate dispatch.
                    </p>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "cod" && (
                <div className="flex items-start gap-3 border-t border-neutral-800 pt-3">
                  <span className="text-amber-500 font-mono text-sm mt-0.5">02.</span>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200 uppercase font-sans">Payment On Delivery Assured:</h5>
                    <p className="text-xs text-neutral-400 mt-1">
                      Our dispatch driver will deliver to your exact location in <span className="text-white">{formData.area}, {formData.city}</span>. Sisi hutuma mikoani kwa mabasi na utapewa risiti pamoja na namba ya dereva wa basi mara moja ili kuchukua mzigo wako.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <a
                href={whatsappString}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer tracking-wider uppercase font-mono shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit to WhatsApp</span>
              </a>
              <button
                onClick={handleFinishCheckout}
                className="w-full sm:w-auto flex-1 px-5 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs rounded-lg transition-colors cursor-pointer tracking-wider uppercase"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-6">
            
            {/* Split layout: Inputs and Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Side fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  1. Delivery Details
                </h4>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Fadhili Aron"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-amber-500 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                    WhatsApp or TZS Phone Number*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +255 767 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                      Destination City
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Mwanza">Mwanza</option>
                      <option value="Dar es Salaam">Dar es Salaam</option>
                      <option value="Arusha">Arusha</option>
                      <option value="Dodoma">Dodoma</option>
                      <option value="Zanzibar">Zanzibar</option>
                      <option value="Kigoma">Kigoma</option>
                      <option value="Mbeya">Mbeya</option>
                      <option value="Morogoro">Morogoro</option>
                      <option value="Tanga">Tanga</option>
                      <option value="Nairobi (Kenya)">Nairobi (Kenya)</option>
                    </select>
                  </div>

                  {formData.city === "Mwanza" ? (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                        Area Zone (Mwanza)
                      </label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Malimbe">Malimbe (SAUT)</option>
                        <option value="Nyegezi">Nyegezi</option>
                        <option value="Rock City">Rock City / Town</option>
                        <option value="Kirumba">Kirumba</option>
                        <option value="Buzuruga">Buzuruga</option>
                        <option value="Capri Point">Capri Point</option>
                        <option value="Ilemela">Ilemela</option>
                      </select>
                    </div>
                  ) : formData.city === "Dar es Salaam" ? (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                        Area Zone (Dar)
                      </label>
                      <select
                        name="area"
                        value={formData.area === "Malimbe" ? "Masaki" : formData.area}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-2 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Masaki">Masaki</option>
                        <option value="Oysterbay">Oysterbay</option>
                        <option value="Mikocheni">Mikocheni</option>
                        <option value="Kariakoo">Kariakoo Bazaar</option>
                        <option value="Upanga">Upanga</option>
                        <option value="Mlimani">Mlimani City</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                        District Area
                      </label>
                      <input
                        type="text"
                        name="customArea"
                        placeholder="e.g. Sakina / Shekilango"
                        value={formData.customArea}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-amber-500 transition-all text-neutral-200"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
                    Detailed Delivery Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Haile Selassie Road, Plot 52-B, Room 4"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-amber-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Right Side fields */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  2. Payment Mechanism
                </h4>

                <div className="space-y-2.5">
                  {/* WhatsApp Ordering (CRO Preferred) */}
                  <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "whatsapp" 
                      ? "border-emerald-500/80 bg-emerald-500/5 shadow-md shadow-emerald-950/20" 
                      : "border-neutral-850 bg-neutral-950/50 hover:border-neutral-800"
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="whatsapp"
                        checked={formData.paymentMethod === "whatsapp"}
                        onChange={handleInputChange}
                        className="accent-emerald-550"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                            Direct WhatsApp Order
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono tracking-widest uppercase rounded border border-emerald-500/10">
                            Preferred
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-1 font-sans">
                          Auto-compile items & clear instantly with our boutique rep.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Mobile Money Integration */}
                  <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "mobile_money" 
                      ? "border-amber-550 bg-amber-500/5" 
                      : "border-neutral-850 bg-neutral-950/50 hover:border-neutral-800"
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile_money"
                        checked={formData.paymentMethod === "mobile_money"}
                        onChange={handleInputChange}
                        className="accent-amber-500"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                          East Africa Mobile Money
                        </span>
                        <p className="text-[10px] text-neutral-400 mt-1">
                          Lipa-Namba via Vodacom M-Pesa, Tigo-Pesa, or Airtel-Money.
                        </p>
                      </div>
                    </div>
                  </label>

                  {formData.paymentMethod === "mobile_money" && (
                    <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl space-y-2 animate-fadeIn">
                      <div className="flex gap-2">
                        {["mpesa", "tigopesa", "airtel"].map((net) => (
                          <button
                            key={net}
                            type="button"
                            onClick={() => setPaymentNetwork(net)}
                            className={`flex-1 py-1.5 text-[10px] font-mono rounded tracking-wider uppercase border text-center transition-all ${
                              paymentNetwork === net 
                                ? "bg-amber-500/20 border-amber-500 text-amber-400 font-bold" 
                                : "bg-neutral-900 border-neutral-800 text-neutral-400"
                            }`}
                          >
                            {net === "mpesa" ? "M-Pesa" : net === "tigopesa" ? "Tigo-Pesa" : "Airtel Money"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cash On Delivery */}
                  {formData.city === "Dar es Salaam" && (
                    <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === "cod" 
                        ? "border-amber-550 bg-amber-500/5" 
                        : "border-neutral-850 bg-neutral-950/50 hover:border-neutral-800"
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          className="accent-amber-550"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                            Touch-&-Try on Delivery
                          </span>
                          <p className="text-[10px] text-neutral-400 mt-1">
                            Pay securely on delivery after verification (Dar area only).
                          </p>
                        </div>
                      </div>
                    </label>
                  )}

                  {/* Credit/Debit Card Secure */}
                  <label className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === "card" 
                      ? "border-amber-550 bg-amber-500/5" 
                      : "border-neutral-850 bg-neutral-950/50 hover:border-neutral-800"
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="accent-amber-550"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                          Credit / Debit Card
                        </span>
                        <p className="text-[10px] text-neutral-400 mt-1">
                          Visa, Mastercard, or UnionPay secured internationally.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom summary and Action button */}
            <div className="border-t border-neutral-850/80 pt-5 mt-4 space-y-4">
              <div className="bg-neutral-950/70 p-4 border border-neutral-850 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs font-medium text-neutral-400">
                  <span>Selected Garments Subtotal</span>
                  <span className="font-mono">{formatPrice(orderTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium text-neutral-400">
                  <span>Expedite Delivery (Boda/Freight)</span>
                  <span className="text-emerald-500 font-bold uppercase text-[10px] font-mono">FREE</span>
                </div>

                {/* Affiliate Commission Breakdown (Keeping store owner informed of reward obligations) */}
                {affiliateCode && (
                  <div className="border border-dashed border-amber-500/20 bg-amber-500/[0.02] rounded-lg p-2.5 space-y-1.5 animate-fadeIn">
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider font-bold">
                      <span className="text-amber-500 flex items-center gap-1">
                        <Sparkle className="w-3 h-3 text-amber-500" />
                        Affiliate Referral Applied:
                      </span>
                      <span className="text-white bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/15">
                        {affiliateCode}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span>Store Owner Reward Obligation (10%):</span>
                      <span className="text-amber-400 font-bold">
                        {formatPrice(Math.round(orderTotal * 0.1))}
                      </span>
                    </div>

                    <div className="text-[9px] text-neutral-400 leading-normal">
                      Commission balance is queued automatically for payout to <strong className="text-white">@{affiliateCode}</strong> on WhatsApp after sale delivery. Mteja anapata kitambaa cha pocket square cha ziada kwa agizo hili!
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-bold text-white pt-2 border-t border-neutral-850/60">
                  <span className="uppercase tracking-wider">Total Charge</span>
                  <span className="text-amber-500 font-mono text-base">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {/* Guarantees info block */}
              <div className="flex items-start gap-2 text-[10px] text-neutral-400 leading-relaxed p-2 bg-neutral-950/30 rounded border border-neutral-850/20">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  By tapping the button below, you lock in fitting guarantees, sizing exchange privileges at zero cost, and 7-day hassle-free returns support. 
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs tracking-widest uppercase rounded-lg transition-colors cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 font-mono shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Structuring Sizing Assets...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>CONFIRM & PLACE ORDER — {formatPrice(orderTotal)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
