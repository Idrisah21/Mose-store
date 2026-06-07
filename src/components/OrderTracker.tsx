/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Sparkles, 
  Phone, 
  ChevronRight, 
  Box, 
  AlertCircle, 
  ArrowLeft,
  Calendar,
  Layers,
  CreditCard,
  User,
  ExternalLink,
  QrCode,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { Language } from "../utils/translations";

interface OrderTrackerProps {
  orderHistory: any[];
  language: Language;
  currency: "TZS" | "USD";
  onBackToBoutique?: () => void;
  latestOrderId?: string;
}

// Default pre-packaged Live Transit scenarios to populate the dashboard right away with data:
const PRESETS: Record<string, any> = {
  "MZ-849204": {
    id: "MZ-849204",
    name: "Aron Sospeter",
    phone: "0765990234",
    city: "Dar es Salaam",
    area: "Sinza",
    address: "Shekilango Road, Block 5, Near Big Bites",
    paymentMethod: "mobile_money",
    total: 285000,
    itemsCount: 2,
    date: new Date().toLocaleDateString(),
    timestamp: "10:15 AM",
    status: "out_for_delivery",
    items: [
      { id: "p1", name: "MOSSE Premium Italian Suede Slipper", price: 155000, size: "42", colorName: "Sartorial Brown", quantity: 1 },
      { id: "p2", name: "MOSSE Luxury Suede Chelsea Boots", price: 130000, size: "43", colorName: "Italian Camel", quantity: 1 }
    ],
    courierDetails: {
      carrierName: "Shabiby Express (Dar VIP Coach Line)",
      trackingNumber: "SHB-VIP-9844",
      phone: "0754 892 489",
      estimatedArrival: "Within 4 Hours (Dar Hub Depot)"
    },
    trackingHistory: [
      { status: "pending", title: "Order Confirmed & Placed", description: "Secured in Mosse database. Authenticated sizes & color swatch matching completed.", date: "Today", time: "10:15 AM" },
      { status: "processing", title: "Styling & Silk Packing", description: "Carefully wrapped in signature luxury scent box. Handed off to Malimbe dispatcher.", date: "Today", time: "11:30 AM" },
      { status: "dispatched", title: "Bus Transit Commenced", description: "Boarded express transit bus line from Mwanza, heading directly to recipient depot in Dar.", date: "Today", time: "01:15 PM" },
      { status: "out_for_delivery", title: "Approaching Destination / Out For Delivery", description: "Bus has crossed regional check-points. Shabiby driver will alert client upon offloading.", date: "Today", time: "03:40 PM" }
    ]
  },
  "MZ-193024": {
    id: "MZ-193024",
    name: "Jonathan Mwita",
    phone: "0713490890",
    city: "Arusha",
    area: "Njiro",
    address: "Njiro Bypass, Plot 49, Arusha",
    paymentMethod: "cod",
    total: 450000,
    itemsCount: 1,
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    timestamp: "08:30 AM",
    status: "delivered",
    items: [
      { id: "p3", name: "MOSSE Royal Navy Tailored Suit", price: 450000, size: "52", colorName: "Royal Navy Blue", quantity: 1 }
    ],
    courierDetails: {
      carrierName: "Hood Express Passenger Fleet",
      trackingNumber: "TZ-HOD-2301",
      phone: "0672 389 123",
      estimatedArrival: "Delivered & Signed by Gentleman Recipient"
    },
    trackingHistory: [
      { status: "pending", title: "Order Placed", description: "Customer reservation accepted for custom tailoring and fitting.", date: "Yesterday", time: "08:30 AM" },
      { status: "processing", title: "Malimbe Boutique Customizing", description: "Pristine double-checking of shoulder seams and custom satin inner lining.", date: "Yesterday", time: "09:45 AM" },
      { status: "dispatched", title: "Dispatched to Regional Bus Terminal", description: "Depurture from Mwanza on priority dispatch line Arusha express coach.", date: "Yesterday", time: "12:00 PM" },
      { status: "out_for_delivery", title: "Out for Delivery / Collection Alert", description: "Basi imefika stendi kuu. Bus driver contacted recipient to perform verification.", date: "Yesterday", time: "05:15 PM" },
      { status: "delivered", title: "Delivered & Fitting Verified", description: "Order hand-delivered in immaculate shape. Gentleman logged 100% style satisfactory.", date: "Yesterday", time: "06:00 PM" }
    ]
  },
  "MZ-521942": {
    id: "MZ-521942",
    name: "Kelvin Mulanga",
    phone: "0745229103",
    city: "Mwanza",
    area: "Malimbe",
    address: "SAUT Campus Block B, Room 12",
    paymentMethod: "cod",
    total: 65000,
    itemsCount: 1,
    date: new Date().toLocaleDateString(),
    timestamp: "09:12 AM",
    status: "processing",
    items: [
      { id: "p4", name: "MOSSE Sand Khaki Tailored Shorts", price: 65000, size: "32", colorName: "Sand Khaki", quantity: 1 }
    ],
    courierDetails: {
      carrierName: "Local Boda Courier (Malimbe Direct Express)",
      trackingNumber: "BODA-MWZ-592",
      phone: "0767 544 599",
      estimatedArrival: "Within 1 Hour (Direct Delivery)"
    },
    trackingHistory: [
      { status: "pending", title: "Elegance Order Received", description: "Order queued up in Mwanza regional hub.", date: "Today", time: "09:12 AM" },
      { status: "processing", title: "Boutique Quality Control Checking", description: "Double checking garment stitches. Preparing complementary signature pocket square.", date: "Today", time: "10:15 AM" }
    ]
  }
};

const ALL_STATUSES = [
  { key: "pending", label: "Pending Verification", labelSW: "Inahakikiwa", icon: Layers, color: "from-neutral-500 to-neutral-400" },
  { key: "processing", label: "Styling & Packaging", labelSW: "Inashonwa & Kufungwa", icon: Box, color: "from-amber-600 to-amber-500" },
  { key: "dispatched", label: "Dispatched in Transit", labelSW: "Imesafirishwa Njiani", icon: Truck, color: "from-yellow-500 to-yellow-600" },
  { key: "out_for_delivery", label: "Out for Delivery", labelSW: "Ipo Karibu Nawe", icon: Truck, color: "from-indigo-500 to-indigo-600" },
  { key: "delivered", label: "Delivered & Checked", labelSW: "Imepokelewa na Mteja", icon: CheckCircle2, color: "from-emerald-500 to-emerald-600" }
];

export default function OrderTracker({
  orderHistory,
  language,
  currency,
  onBackToBoutique,
  latestOrderId
}: OrderTrackerProps) {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const tSW = language === "SW";

  useEffect(() => {
    // If a latest order ID exists, prioritize and fill it
    const activeId = latestOrderId || "MZ-849204";
    setOrderIdInput(activeId);

    const targetId = activeId.toUpperCase();
    if (PRESETS[targetId]) {
      setActiveOrder(PRESETS[targetId]);
    } else {
      const matchedHistory = orderHistory.find(
        o => o.id.toUpperCase() === targetId || o.id.toUpperCase().replace("MZ-", "").replace("WAIT-", "") === targetId.replace("MZ-", "").replace("WAIT-", "")
      );
      if (matchedHistory) {
        const status = matchedHistory.status || "pending";
        const constructedOrder = {
          id: matchedHistory.id,
          name: matchedHistory.name,
          phone: matchedHistory.phone,
          city: matchedHistory.city,
          area: matchedHistory.area,
          address: matchedHistory.address || (matchedHistory.city === "Mwanza" ? `${matchedHistory.area}, Mwanza` : matchedHistory.city),
          paymentMethod: matchedHistory.paymentMethod,
          total: matchedHistory.total,
          itemsCount: matchedHistory.itemsCount || 1,
          date: matchedHistory.date || new Date().toLocaleDateString(),
          timestamp: matchedHistory.timestamp || "Just Now",
          status: status,
          items: matchedHistory.items || [
            { id: "p-custom", name: "Mosse Sartorial Gentleman Pick", price: matchedHistory.total, size: matchedHistory.size || "M", colorName: "Standard Shade", quantity: matchedHistory.itemsCount || 1 }
          ],
          courierDetails: matchedHistory.courierDetails || {
            carrierName: matchedHistory.city === "Mwanza" ? "Direct Malimbe Stylist Runner" : "Express Regional Transit Coach (Stand Kuu Parcel)",
            trackingNumber: `TRK-${matchedHistory.id.substring(3)}-REG`,
            phone: "+255 767 542 687",
            estimatedArrival: matchedHistory.city === "Mwanza" ? "Within 2 Hours" : "Next business day transit (Under 24H guarantee)"
          },
          trackingHistory: matchedHistory.trackingHistory || generateDynamicHistory(status, matchedHistory.date || new Date().toLocaleDateString(), matchedHistory.timestamp || "Just Now")
        };
        setActiveOrder(constructedOrder);
      } else {
        setActiveOrder(PRESETS["MZ-849204"]);
      }
    }
  }, [latestOrderId, orderHistory]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSearched(true);

    const targetId = orderIdInput.trim().toUpperCase();
    if (!targetId) {
      setErrorMsg(tSW ? "Tafadhali weka Namba ya Agizo iliyotolewa (Checkout ID)." : "Please enter an active Order Reference Token.");
      return;
    }

    // 1. Check if matches pre-configured presets
    if (PRESETS[targetId]) {
      setActiveOrder(PRESETS[targetId]);
      return;
    }

    // 2. Check if matches active order history from localStorage database
    const matchedHistory = orderHistory.find(
      o => o.id.toUpperCase() === targetId || o.id.toUpperCase().replace("MZ-", "").replace("WAIT-", "") === targetId.replace("MZ-", "").replace("WAIT-", "")
    );

    if (matchedHistory) {
      // Build a realistic tracker schema from local storage orders
      // Status in history order might be undefined, fallback to 'pending'
      const status = matchedHistory.status || "pending";
      
      const constructedOrder = {
        id: matchedHistory.id,
        name: matchedHistory.name,
        phone: matchedHistory.phone,
        city: matchedHistory.city,
        area: matchedHistory.area,
        address: matchedHistory.address || (matchedHistory.city === "Mwanza" ? `${matchedHistory.area}, Mwanza` : matchedHistory.city),
        paymentMethod: matchedHistory.paymentMethod,
        total: matchedHistory.total,
        itemsCount: matchedHistory.itemsCount || 1,
        date: matchedHistory.date || new Date().toLocaleDateString(),
        timestamp: matchedHistory.timestamp || "Just Now",
        status: status,
        items: matchedHistory.items || [
          { id: "p-custom", name: "Mosse Sartorial Gentleman Pick", price: matchedHistory.total, size: matchedHistory.size || "M", colorName: "Standard Shade", quantity: matchedHistory.itemsCount || 1 }
        ],
        courierDetails: matchedHistory.courierDetails || {
          carrierName: matchedHistory.city === "Mwanza" ? "Direct Malimbe Stylist Runner" : "Express Regional Transit Coach (Stand Kuu Parcel)",
          trackingNumber: `TRK-${matchedHistory.id.substring(3)}-REG`,
          phone: "+255 767 542 687",
          estimatedArrival: matchedHistory.city === "Mwanza" ? "Within 2 Hours" : "Next business day transit (Under 24H guarantee)"
        },
        trackingHistory: matchedHistory.trackingHistory || generateDynamicHistory(status, matchedHistory.date || new Date().toLocaleDateString(), matchedHistory.timestamp || "Just Now")
      };

      setActiveOrder(constructedOrder);
      return;
    }

    // 3. Fallback: Dynamically generate an interactive simulated status for literally *any* custom Order ID!
    // This provides a seamless "supa dupa" sandbox experience instead of displaying a dry error.
    if (/^[A-Za-z0-9_-]{4,14}$/.test(targetId)) {
      // Seed status based on character hash so it's consistent if they search the same random ID twice!
      let charSum = 0;
      for (let i = 0; i < targetId.length; i++) charSum += targetId.charCodeAt(i);
      const statuses: Array<"pending" | "processing" | "dispatched" | "out_for_delivery" | "delivered"> = [
        "processing", "dispatched", "out_for_delivery", "delivered"
      ];
      const randomStatus = statuses[charSum % statuses.length];
      const orderDate = new Date(Date.now() - (charSum % 3) * 86400000).toLocaleDateString();

      const dynamicSimulated: any = {
        id: targetId.startsWith("MZ-") ? targetId : `MZ-${targetId}`,
        name: "Honorable Gentleman",
        phone: "+255 7XX XXX XXX",
        city: "Dar es Salaam",
        area: "Kijitonyama",
        address: "Ali Hassan Mwinyi Road, Block D",
        paymentMethod: "mobile_money",
        total: 195000,
        itemsCount: 1,
        date: orderDate,
        timestamp: "02:15 PM",
        status: randomStatus,
        items: [
          { id: "p-dyn", name: "MOSSE Dapper Streetwear Cargo Jeans", price: 195000, size: "32", colorName: "Classic Bleached Indigo", quantity: 1 }
        ],
        courierDetails: {
          carrierName: "Dar Express Transit Logistics VIP",
          trackingNumber: `DX-TRK-${charSum % 9000 + 1000}`,
          phone: "0767 542 687",
          estimatedArrival: randomStatus === "delivered" ? "Delivered perfectly" : "In transit (estimated 18-24 hours transit time)"
        },
        trackingHistory: generateDynamicHistory(randomStatus, orderDate, "02:15 PM")
      };

      setActiveOrder(dynamicSimulated);
      return;
    }

    setErrorMsg(
      tSW 
        ? "Samahani, Namba hiyo haijatambuliwa katika mfumo wetu wa dharura. Tafadhali weka msimbo rasmi (e.g. MZ-849204)." 
        : "Reference code unrecognized on the terminal. Check format standards (e.g., MZ-849204) or select a pre-loaded ticket below."
    );
    setActiveOrder(null);
  };

  function generateDynamicHistory(status: string, dateStr: string, timeStr: string) {
    const list = [];
    const states = ["pending", "processing", "dispatched", "out_for_delivery", "delivered"];
    const activeIndex = states.indexOf(status);

    const descriptions: Record<string, { title: string, desc: string; titleSW: string, descSW: string }> = {
      pending: {
        title: "Order Processed & Verified",
        titleSW: "Ombi Limepokelewa",
        desc: "Order generated & logged into regional M-Pesa/AirtelMoney ledger.",
        descSW: "Agizo limerekodiwa katika hifadhidata ya duka letu Malimbe Mwanza."
      },
      processing: {
        title: "Boutique Quality Check & Luxury Gift Wrapping",
        titleSW: "Maandalizi ya Umaridadi",
        desc: "Checking seams and pocket placement. Folding inside bespoke wax paper.",
        descSW: "Bidhaa inafanyiwa ukaguzi wa mwisho na kupakiwa kwenye boksi la zawadi."
      },
      dispatched: {
        title: "Dispatched from Mwanza terminal hub",
        titleSW: "Mzigo Umesafirishwa Njiani",
        desc: "Handed over to registered express commuter bus line with courier token.",
        descSW: "Mzigo umekabidhiwa kwa Dereva wa Basi la mikoani kuelekea mji wako."
      },
      out_for_delivery: {
        title: "Out for Local Courier Handover",
        titleSW: "Mzigo Umefika Stendi Kuu",
        desc: "Bus arrived at local stand. Driver or local boda dispatcher coordinating with client contact line.",
        descSW: "Basi limefika stendi mji wenu. Dereva kapiga simu kukutana kuchukua pamba."
      },
      delivered: {
        title: "immaculate Delivery Completed successfully",
        titleSW: "Uwasilishaji Umekamilika",
        desc: "Fitted, confirmed and signed off. Thank you for shopping with Mosse Store Mwanza!",
        descSW: "Umepokea bidhaa na kuridhika. Karibu tena mbunifu Moses Fashion!"
      }
    };

    for (let i = 0; i <= activeIndex; i++) {
      const stateKey = states[i];
      const descObj = descriptions[stateKey];
      list.push({
        status: stateKey,
        title: tSW ? descObj.titleSW : descObj.title,
        description: tSW ? descObj.descSW : descObj.desc,
        date: i === activeIndex ? "Today" : dateStr,
        time: i === activeIndex ? timeStr : "01:00 PM"
      });
    }

    return list.reverse();
  }

  const formatPrice = (value: number) => {
    if (currency === "TZS") {
      return `${value.toLocaleString()} TZS`;
    }
    return `$${value}`;
  };

  const getActiveStatusIndex = (currentStatus: string) => {
    return ALL_STATUSES.findIndex(s => s.key === currentStatus);
  };

  // Helper payment translator
  const translatePayment = (method: string) => {
    if (method === "mobile_money") return tSW ? "Fedha kwa Simu (Lipa Namba)" : "Mobile Money Escrow";
    if (method === "cod") return tSW ? "Ofisini Malimbe / Lipa Baada ya Kupokea" : "Cash on Delivery / Studio Pickup";
    return tSW ? "Mjadala wa WhatsApp" : "Direct WhatsApp Stylist Link";
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans" id="order-tracker-portal">
      {/* Upper Navigation & Title Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-900 pb-5">
        <div>
          <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full border border-amber-500/15 font-mono font-black uppercase tracking-wider">
            {tSW ? "📡 HALI YA SAFARI YA MZIGO MIKOANI" : "📡 REAL-TIME TERMINAL LOGISTICS"}
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mt-1.5 font-sans">
            {tSW ? "Ufuatiliaji wa Agizo Lako" : "Sartorial Delivery Tracker"}
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5 max-w-xl">
            {tSW 
              ? "Kagua hatua ya mzigo wako ulipotumwa kwa basi kutoka studio yetu Malimbe, Mwanza kwenda Dar, Arusha, au mkoa wowote Tz nchini."
              : "Verify exact bus dispatch status, location handovers, and estimated carrier coordinates for your premium purchase."}
          </p>
        </div>

        {onBackToBoutique && (
          <button
            onClick={onBackToBoutique}
            className="px-4 py-2 border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900 text-neutral-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{tSW ? "Rudi Dukani" : "Return to Catalog"}</span>
          </button>
        )}
      </div>

      {/* Main Track Look-Up Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input form & Preset Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-950 border border-neutral-850 p-5 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
              <QrCode className="w-4 h-4 text-amber-500" />
              <span>{tSW ? "HAKIKI KITAMBULISHO CHA AGIZO" : "ENTER SECURED TOKEN ID"}</span>
            </h3>

            <p className="text-[11px] text-neutral-400 leading-normal">
              {tSW 
                ? "Weka Namba yako ya Agizo uliyopewa ulipomaliza kulipa (Mfano: MZ-849204) ili kupata taarifa za safari na risiti ya dereva."
                : "Your Reference code was displayed on checkout screen and logged down in Sandbox Database below. Paste it below for instant live tracking."}
            </p>

            <form onSubmit={handleTrack} className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. MZ-849204"
                  value={orderIdInput}
                  onChange={(e) => {
                    setOrderIdInput(e.target.value);
                    setErrorMsg("");
                  }}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 pl-10 pr-4 py-3 text-xs rounded-xl outline-none transition-colors text-white uppercase font-mono tracking-widest text-neutral-200"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-[10px] font-mono rounded-lg flex items-start gap-1.5 leading-normal">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-450 text-neutral-950 font-black text-xs font-mono tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{tSW ? "Tafuta Mzigo" : "Sync Delivery Node"}</span>
              </button>
            </form>
          </div>

          {/* Quick Click Preset Testbeds */}
          <div className="bg-neutral-950/60 border border-neutral-900 p-5 rounded-2xl space-y-3.5">
            <div>
              <h4 className="text-[10px] font-mono font-bold text-neutral-400 tracking-wider uppercase">
                {tSW ? "Majaribio ya Haraka ya Wasafiri" : "Simulated Live Handovers (Click to inspect)"}
              </h4>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                {tSW 
                  ? "Bofya tiketi hizi za msaada ili kujionea mifumo yetu ya ufuatiliaji wa suti na viatu mara moja."
                  : "Tap on these pre-filled dapper profiles to instantly review diverse transit stages and regional bus operations."}
              </p>
            </div>

            <div className="space-y-2.5">
              {Object.values(PRESETS).map((p: any) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setOrderIdInput(p.id);
                    setActiveOrder(p);
                    setErrorMsg("");
                    setSearched(true);
                  }}
                  className={`w-full p-3 text-left border rounded-xl transition-all cursor-pointer flex items-center justify-between group ${
                    activeOrder && activeOrder.id === p.id
                      ? "bg-amber-500/5 border-amber-500/30 text-white"
                      : "bg-neutral-950 hover:bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-neutral-250"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-extrabold text-amber-500 tracking-wider">
                        {p.id}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-300">
                        • {p.city}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500">
                      {p.name} • {p.itemsCount} {p.itemsCount > 1 ? "Fits" : "Garment"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      p.status === "delivered" 
                        ? "bg-emerald-500" 
                        : p.status === "out_for_delivery" 
                        ? "bg-indigo-500" 
                        : "bg-amber-500"
                    }`} />
                    <span className="text-[9px] font-mono uppercase bg-neutral-900 px-1.5 py-0.5 border border-neutral-800 rounded font-semibold text-neutral-400">
                      {tSW 
                        ? ALL_STATUSES.find(s => s.key === p.status)?.labelSW 
                        : ALL_STATUSES.find(s => s.key === p.status)?.label
                      }
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Tracker Terminal (8 cols) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeOrder ? (
              <motion.div
                key={activeOrder.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* 1. Status Summary Card Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-neutral-950 to-neutral-900 border border-neutral-850 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="space-y-1.5 z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-amber-500 font-mono font-bold text-xs tracking-wider rounded-lg">
                        {activeOrder.id}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                      <span className="text-xs font-mono text-neutral-400 font-medium">
                        Placed on {activeOrder.date} @ {activeOrder.timestamp}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight uppercase">
                        Current Status:
                      </h3>
                      <span className="text-neutral-500 block">•</span>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 border border-amber-500/20 rounded-lg animate-pulse">
                        <Truck className="w-3.5 h-3.5" />
                        <span>
                          {tSW 
                            ? ALL_STATUSES.find(s => s.key === activeOrder.status)?.labelSW 
                            : ALL_STATUSES.find(s => s.key === activeOrder.status)?.label
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right shrink-0 z-10 font-mono">
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-widest">
                      {tSW ? "Jumla ya Thamani" : "PROCESSED TOTAL VALUE"}
                    </span>
                    <strong className="text-xl md:text-2xl font-black text-amber-500 block mt-0.5">
                      {formatPrice(activeOrder.total)}
                    </strong>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/10 rounded uppercase mt-1 inline-block">
                      ✓ Paid via {activeOrder.paymentMethod ? activeOrder.paymentMethod.replace("_", " ") : "Mobile M-Pesa"}
                    </span>
                  </div>
                </div>

                {/* 2. Visual Status Step Progress Bar */}
                <div className="bg-neutral-950 border border-neutral-900 p-6 md:p-8 rounded-3xl shadow-lg space-y-8">
                  <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest border-b border-neutral-900 pb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>{tSW ? "Homa ya Usafirishaji Line Map" : "COURIER ROAD-MAP INTERSECTION"}</span>
                  </h4>

                  {/* Step Progress Line */}
                  <div className="relative pt-4 pb-2">
                    {/* Background Progress bar line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-900 -translate-y-1/2 rounded-full hidden md:block" />
                    
                    {/* Active Filled Progress Bar line */}
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-600 -translate-y-1/2 rounded-full transition-all duration-700 hidden md:block" 
                      style={{ 
                        width: `${(getActiveStatusIndex(activeOrder.status) / (ALL_STATUSES.length - 1)) * 100}%` 
                      }}
                    />

                    {/* Horizontal mapping for desktops / Vertical list form for mobiles */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                      {ALL_STATUSES.map((step, idx) => {
                        const isCompleted = getActiveStatusIndex(activeOrder.status) >= idx;
                        const isActive = activeOrder.status === step.key;
                        const StepIcon = step.icon;

                        return (
                          <div 
                            key={step.key} 
                            className={`flex md:flex-col items-center gap-3.5 md:text-center group transition-colors duration-300 ${
                              isCompleted ? "text-neutral-200" : "text-neutral-650"
                            }`}
                          >
                            {/* Circle bead indicator */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border shrink-0 ${
                              isActive 
                                ? "bg-amber-500 text-neutral-950 border-amber-400 scale-110 shadow-lg shadow-amber-500/25 ring-4 ring-amber-500/20" 
                                : isCompleted 
                                ? "bg-neutral-900 text-amber-500 border-amber-500/30" 
                                : "bg-neutral-950 text-neutral-600 border-neutral-850"
                            }`}>
                              {isCompleted && !isActive ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <StepIcon className="w-4 h-4" />
                              )}
                            </div>

                            <div className="space-y-0.5 md:space-y-1 text-left md:text-center">
                              <p className={`text-[11px] font-mono tracking-wider font-extrabold uppercase ${
                                isActive ? "text-amber-500 font-black" : isCompleted ? "text-white" : "text-neutral-500"
                              }`}>
                                {idx + 1}. {tSW ? step.labelSW : step.label}
                              </p>
                              <p className="text-[10px] text-neutral-500 hidden md:block leading-tight font-medium">
                                {idx === 0 ? "Malimbe Mwanza HQ" : idx === 1 ? "Packaging unit" : idx === 2 ? "regional Bus board" : idx === 3 ? "Boda or terminal Stand" : "Delivered safely!"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3. Detailed Logistics & Recipient coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Detailed Courier parcel Coordinates */}
                  <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-500" />
                      <span>{tSW ? "Taarifa za Msafirishaji / Gari" : "REGIONAL CARRIER PROVISIONS"}</span>
                    </h4>

                    {activeOrder.courierDetails ? (
                      <div className="space-y-3.5 text-xs">
                        <div className="flex border-b border-neutral-900 pb-2.5">
                          <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">Transit Company:</span>
                          <span className="text-neutral-200 font-bold w-2/3">{activeOrder.courierDetails.carrierName}</span>
                        </div>
                        <div className="flex border-b border-neutral-900 pb-2.5">
                          <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">Tracking Waybill:</span>
                          <span className="text-neutral-200 font-mono font-bold w-2/3 text-amber-500">{activeOrder.courierDetails.trackingNumber}</span>
                        </div>
                        <div className="flex border-b border-neutral-900 pb-2.5 items-center">
                          <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">Driver Contact:</span>
                          <span className="text-neutral-200 font-mono w-2/3 flex items-center gap-1.5 font-bold">
                            <span className="text-neutral-300 font-semibold">{activeOrder.courierDetails.phone}</span>
                            <a 
                              href={`tel:${activeOrder.courierDetails.phone}`} 
                              className="text-amber-500 p-1 hover:bg-neutral-900 rounded transition-colors"
                              title="Speed-dial courier concierge desk"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">Estimated Arrival:</span>
                          <span className="text-emerald-400 font-semibold w-2/3 font-mono text-[11px] font-bold">
                            ⚡ {activeOrder.courierDetails.estimatedArrival}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-neutral-500 text-xs font-mono font-medium">Standard automated bus parcel protocol in preparation.</p>
                    )}
                  </div>

                  {/* Recipient Coordinates Card */}
                  <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      <span>{tSW ? "Eneo Halisi la Mteja" : "RECIPIENT & ROUTING DESTINATION"}</span>
                    </h4>

                    <div className="space-y-3.5 text-xs font-sans">
                      <div className="flex border-b border-neutral-900 pb-2.5">
                        <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">{tSW ? "Jina la Mpokeaji:" : "Gentleman Name:"}</span>
                        <span className="text-neutral-200 font-bold w-2/3">{activeOrder.name}</span>
                      </div>
                      <div className="flex border-b border-neutral-900 pb-2.5">
                        <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">{tSW ? "Simu ya Mpokeaji:" : "Contact Line:"}</span>
                        <span className="text-neutral-200 font-mono font-bold w-2/3">{activeOrder.phone}</span>
                      </div>
                      <div className="flex border-b border-neutral-900 pb-2.5">
                        <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">{tSW ? "Mji & Sehemu:" : "City Destination:"}</span>
                        <span className="text-neutral-200 font-bold w-2/3 capitalize">
                          {activeOrder.city}, {activeOrder.area || "Malimbe"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-neutral-500 w-1/3 font-mono font-bold uppercase text-[10px]">{tSW ? "Mtaa wa Kufikisha:" : "Street Address:"}</span>
                        <span className="text-neutral-300 w-2/3 italic whitespace-normal font-medium leading-relaxed">
                          {activeOrder.address || "SAUT Near Malimbe boutique depot"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Order Item Manifest Segment */}
                <div className="bg-neutral-955 border border-neutral-900 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest border-b border-neutral-900 pb-3 flex items-center gap-2">
                    <Box className="w-4 h-4 text-amber-500" />
                    <span>{tSW ? "Maudhui ya Bidhaa Zako / Fitting Items" : "FITTING PARCEL MANIFEST CONTENTS"}</span>
                  </h4>

                  <div className="divide-y divide-neutral-900">
                    {activeOrder.items && activeOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs font-sans">
                        <div className="flex items-center gap-3">
                          {/* Image icon mockup */}
                          <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-500 shrink-0 select-none">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-neutral-200 font-bold leading-snug">{item.name}</p>
                            <div className="flex items-center gap-2 text-neutral-500 mt-1 font-mono text-[9px] font-semibold uppercase">
                              <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-850 text-neutral-300 rounded">
                                Size {item.size}
                              </span>
                              <span>•</span>
                              <span>Color: {item.colorName || "Unspecified"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono text-[11px]">
                          <span className="text-neutral-200 font-bold block">{formatPrice(item.price)}</span>
                          <span className="text-neutral-500 text-[10px] font-medium block mt-0.5">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Direct Transit History Trail */}
                <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-2xl space-y-5">
                  <h4 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-widest border-b border-neutral-900 pb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>{tSW ? "Kumbukumbu za Safari Hatua kwa Hatua" : "MILITARY TRANSIT TERMINAL CHRONOLOGY"}</span>
                  </h4>

                  <div className="space-y-5 pr-2">
                    {activeOrder.trackingHistory && activeOrder.trackingHistory.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start relative pl-1">
                        {/* Timeline wire connection line */}
                        {idx !== activeOrder.trackingHistory.length - 1 && (
                          <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-neutral-900" />
                        )}

                        <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          idx === 0 
                            ? "bg-amber-500 text-neutral-950 border-amber-300 shadow shadow-amber-500/20" 
                            : "bg-neutral-900 text-neutral-550 border-neutral-800"
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${idx === 0 ? "bg-neutral-950" : "bg-neutral-600"}`} />
                        </div>

                        <div className="space-y-1 font-sans">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h5 className={`text-xs font-black uppercase tracking-wide leading-tight ${
                              idx === 0 ? "text-amber-500" : "text-neutral-300"
                            }`}>
                              {item.title}
                            </h5>
                            <span className="text-[10px] font-mono text-neutral-550 bg-neutral-900/40 px-2 py-0.5 rounded border border-neutral-850">
                              {item.date} @ {item.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 leading-relaxed max-w-xl font-medium">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="p-12 text-center bg-neutral-950/40 border border-neutral-900/60 rounded-3xl font-sans space-y-4">
                <Search className="w-10 h-10 text-neutral-600 mx-auto opacity-30 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest font-sans">
                    Terminal Awaiting Input
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 leading-normal">
                    Enter any alphanumeric Order Reference Token in the secure console on your left to establish synchronous radar logs.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
