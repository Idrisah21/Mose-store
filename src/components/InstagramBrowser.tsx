/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Lock, 
  Grid, 
  Tv, 
  UserCheck, 
  Instagram, 
  Heart, 
  MessageCircle, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  Check,
  ArrowRight
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";
import { TRANSLATIONS, Language } from "../utils/translations";

interface InstagramBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: "TZS" | "USD";
  products: Product[];
  onAddToCartQuick: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onSelectProduct: (product: Product) => void;
  mosseLogo: string;
}

export default function InstagramBrowser({
  isOpen,
  onClose,
  language,
  currency,
  products,
  onAddToCartQuick,
  onSelectProduct,
  mosseLogo
}: InstagramBrowserProps) {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<"live" | "posts" | "reels" | "tagged">("live");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1848);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(prev => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
    }
  };

  const stories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
      caption: "🔥 Suede Chelsea Stock Refilled today",
      location: "Malimbe, Mwanza"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800",
      caption: "⚡ New Denim Cargo Series in warehouse",
      location: "SAUT Campus"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
      caption: "👑 Private fittings setup ready for VIP gentlemen",
      location: "Fashion Lounge"
    }
  ];

  const instagramPosts = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
      likes: 142,
      commentsCount: 9,
      caption: "TUNAUZA NGUO 👕👖👟 Side-Stripe Indigo Denim Shorts spec mguuni. King of the casual weekends! Tupigie au tuandikie WhatsApp namba 0767542687 kufanya order sasa hivi. #mosse_store #mwanza",
      date: "2 hours ago",
      linkedProductId: "prod-7"
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800",
      likes: 98,
      commentsCount: 6,
      caption: "Distressed light blue ripped shorts for active summer setting! Soft comfort, vintage washing details. 📍 Location Malimbe Mwanza, Call/WhatsApp: 0767542687. Tunatuma mikoani kote 🚌 #MwanzaSAUT #StreetStyle",
      date: "1 day ago",
      linkedProductId: "prod-8"
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800",
      likes: 126,
      commentsCount: 5,
      caption: "Terracotta Rust-Brown luxury fabric. Beautiful fit, dual-stitch durability. Stand out from the crowd! Delivery within Mwanza and countrywide across East Africa. #MosseCotton #VibeOfTheDay",
      date: "3 days ago",
      linkedProductId: "prod-9"
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800",
      likes: 89,
      commentsCount: 3,
      caption: "The elegant sand-khaki utility setup matching with any smart elements. Call 0767542687 to deliver right to your workspace or university hostel in Malimbe we have 11 pairs intact. #mosse_house_of_switch",
      date: "5 days ago",
      linkedProductId: "prod-10"
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      likes: 212,
      commentsCount: 14,
      caption: "Sartorial Opulence: The Mosse Royal Navy Premium Tailoring drape layout. Complete jacket and slim pants. Fit verify via Masaki or Malimbe studio nodes. #SartorialGentleman #SuitTanzania",
      date: "1 week ago",
      linkedProductId: "prod-1"
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
      likes: 177,
      commentsCount: 8,
      caption: "Handcrafted genuine suede leather dapper Chelsea boots built strong for extreme long-haul stylish elegance. Inashikilia mguu vizuri na rangi haichuji. Let us send it via regional bus to Dodoma or Arusha today!",
      date: "1 week ago",
      linkedProductId: "prod-2"
    }
  ];

  const selectedPost = instagramPosts.find(p => p.id === selectedPostId);
  const linkedProduct = selectedPost?.linkedProductId 
    ? products.find(p => p.id === selectedPost.linkedProductId) 
    : undefined;

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col justify-center items-center p-0 sm:p-4 animate-fadeIn font-sans">
      
      {/* 1. Simulated Browser Container */}
      <div className="w-full h-full sm:h-auto sm:max-w-4xl bg-neutral-900 border-0 sm:border border-neutral-800 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col aspect-none md:aspect-auto md:max-h-[85vh]">
        
        {/* Browser Top Bar & URL Bar */}
        <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-850 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Window controls */}
            <span className="w-3 h-3 rounded-full bg-rose-500 block cursor-pointer hover:opacity-80" onClick={onClose} title="Close Webview"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
          </div>

          {/* Browser Navigation buttons */}
          <div className="hidden sm:flex items-center gap-1 text-neutral-500 shrink-0">
            <button className="p-1 hover:text-white rounded transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1 hover:text-white rounded transition-colors"><ChevronRight className="w-4 h-4" /></button>
            <button className="p-1 hover:text-white rounded transition-colors"><RotateCw className="w-3.5 h-3.5" /></button>
          </div>

          {/* Locked Secured Web Address */}
          <div className="flex-1 max-w-lg bg-neutral-900/95 border border-neutral-800 rounded-lg py-1 px-3 flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate select-none">https://instagram.com/mosse_store</span>
            <span className="text-[9px] px-1 py-0.2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold rounded">SECIFIED</span>
          </div>

          {/* Outer Link / Close Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href="https://www.instagram.com/mosse_store?igsh=eDd5bTExOTZrem81"
              target="_blank"
              rel="noreferrer" 
              className="p-1 px-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] text-amber-500 font-mono font-bold rounded flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="hidden sm:inline">Outer App</span>
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Browser Core body viewport */}
        <div className="flex-1 overflow-y-auto bg-neutral-950 p-4 md:p-6 space-y-6">
          
          {/* Animated App Notification Alert of Virtual Frame */}
          <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border-l-4 border-amber-500 p-3 rounded-r-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
              <p className="text-[11px] text-neutral-200">
                {language === "SW" 
                  ? "Unakagua Instagram rasmi ya Mosse Store moja kwa moja ndani ya tovuti!" 
                  : "You are browsing Mosse Store's live Instagram profile inside our secure web gateway!"}
              </p>
            </div>
            <span className="text-[9px] font-mono font-extrabold uppercase bg-amber-500 text-neutral-950 px-2 py-0.5 rounded shadow">
              {language === "SW" ? "Kuvinjari Salama" : "Secured Link"}
            </span>
          </div>

          {/* Profile Header Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-neutral-900 pb-6">
            
            {/* Round Mascot and Instagram Stories circle */}
            <div className="md:col-span-3 flex flex-col items-center">
              <div className="relative group cursor-pointer" onClick={() => setActiveStoryIdx(0)}>
                {/* Multi-layered neon pink profile border of stories */}
                <div className="absolute inset-x-[-4px] inset-y-[-4px] bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 rounded-full rotate-45 p-[3px] animate-pulse"></div>
                <div className="relative w-24 h-24 bg-neutral-950 rounded-full p-[3px] overflow-hidden flex items-center justify-center">
                  <img 
                    src={mosseLogo} 
                    alt="Mosse Instagram Logo" 
                    className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-105 duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Watch Story badge */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[8px] font-mono rounded-full font-black uppercase tracking-wider shadow">
                  STORY LIVE
                </span>
              </div>
              <p className="text-[9px] font-mono text-neutral-500 mt-3">{language === "SW" ? "Bofya kutazama Story" : "Click to View Story"}</p>
            </div>

            {/* Profile specifications */}
            <div className="md:col-span-9 space-y-4 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-white tracking-wide">mosse_store</h2>
                  <span className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white" title="Verified Creator">
                    <Check className="w-2.5 h-2.5 stroke-[4]" />
                  </span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={handleFollowToggle}
                    className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isFollowing 
                        ? "bg-neutral-800 border border-neutral-700 text-neutral-300" 
                        : "bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black"
                    }`}
                  >
                    {isFollowing ? (language === "SW" ? "Unajumuika ✓" : "Following ✓") : (language === "SW" ? "Fuatilia" : "Follow")}
                  </button>
                  <a 
                    href="https://api.whatsapp.com/send?phone=255767542687&text=Habari Mosse Store! Nimeona Instagram yenu hapa mwanza."
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 bg-neutral-850 hover:bg-neutral-800 rounded-lg text-xs font-bold font-mono transition-colors border border-neutral-800 flex items-center justify-center gap-1 text-white"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Message</span>
                  </a>
                </div>
              </div>

              {/* Counter status indices */}
              <div className="flex items-center justify-center md:justify-start gap-6 border-y border-neutral-900/60 py-2.5 text-sm">
                <div>
                  <span className="font-extrabold text-white font-mono">653</span> <span className="text-neutral-400 font-sans text-xs">Posts</span>
                </div>
                <div>
                  <span className="font-extrabold text-white font-mono">{followersCount.toLocaleString()}</span> <span className="text-neutral-400 font-sans text-xs">Followers</span>
                </div>
                <div>
                  <span className="font-extrabold text-white font-mono">263</span> <span className="text-neutral-400 font-sans text-xs">Following</span>
                </div>
              </div>

              {/* Bio description */}
              <div className="space-y-1 text-xs text-neutral-200">
                <p className="font-black text-neutral-100">Moses Fashion Lounge</p>
                <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-wider">👕👖👟 TUNAUZA NGUO MIKOANI KOTE</p>
                <p className="text-[11px] font-sans">📌 Location Malimbe-SAUT, Mwanza (Tanzania)</p>
                <p className="text-[11px] text-emerald-400 font-mono">WHATSAPP: 0767542687 • Tunatuma Mabasi Masaa 24!</p>
              </div>
            </div>
          </div>

          {/* 3. Interactive Stories slide modal overlay within the viewport */}
          {activeStoryIdx !== null && (
            <div className="relative bg-neutral-900 rounded-xl p-4 border border-amber-500/30 flex flex-col md:flex-row gap-4 items-center">
              <button 
                onClick={() => setActiveStoryIdx(null)}
                className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full hover:bg-black/90 text-white z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-full md:w-1/2 aspect-[4/5] rounded-xl overflow-hidden relative border border-neutral-800">
                {/* Story Top progress indicators */}
                <div className="absolute top-2.5 inset-x-2.5 flex gap-1.5 z-10">
                  {stories.map((s, idx) => (
                    <div 
                      key={s.id} 
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        idx === activeStoryIdx ? "bg-amber-500" : idx < activeStoryIdx ? "bg-white" : "bg-neutral-600"
                      }`}
                    />
                  ))}
                </div>

                <img 
                  src={stories[activeStoryIdx].image} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                  <div className="flex items-center gap-1.5 mt-4">
                    <img src={mosseLogo} className="w-6 h-6 rounded-full border border-white/20" alt="" />
                    <div>
                      <span className="text-[10px] font-bold text-white block">mosse_store</span>
                      <span className="text-[8px] text-neutral-400 block -mt-0.5">{stories[activeStoryIdx].location}</span>
                    </div>
                  </div>

                  <p className="text-xs font-mono font-bold text-center text-amber-400 bg-black/50 py-2 rounded-lg border border-amber-500/10 mb-4 px-2.5">
                    {stories[activeStoryIdx].caption}
                  </p>
                </div>
              </div>

              {/* Story Interactive specification panel */}
              <div className="w-full md:w-1/2 space-y-4">
                <span className="px-2 py-0.5 bg-rose-600 text-white text-[8px] font-mono font-extrabold rounded uppercase tracking-wider animate-pulse">
                  STORY DEAL DROPPED
                </span>
                <h3 className="text-md font-extrabold text-white uppercase font-sans">
                  {stories[activeStoryIdx].caption}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {language === "SW" 
                    ? "Hii ni ofa maalum iliyorushwa sasa hivi kupitia Instagram story. Wateja walioko Mwanza au mikoani mnaweza kukamata pamba hizi papo hapo kwa kubofya kitufe cha dharura chini kukamilisha."
                    : "This item was published via our official active stories. Select size below to order instantly with immediate high-priority sorting and packaging in Malimbe."}
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (activeStoryIdx > 0) {
                        setActiveStoryIdx(prev => prev! - 1);
                      } else {
                        setActiveStoryIdx(stories.length - 1);
                      }
                    }}
                    className="p-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white rounded-lg text-xs font-bold"
                  >
                    Prev
                  </button>
                  <button 
                    onClick={() => {
                      if (activeStoryIdx < stories.length - 1) {
                        setActiveStoryIdx(prev => prev! + 1);
                      } else {
                        setActiveStoryIdx(0);
                      }
                    }}
                    className="p-2.5 bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white rounded-lg text-xs font-bold flex-1"
                  >
                    Next Story Slide
                  </button>
                  <a 
                    href="https://api.whatsapp.com/send?phone=255767542687&text=Habari, nataka ya Story"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black uppercase text-xs rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <span>Order Promo</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Section: Interactive Layout Grid tabs */}
          <div className="flex justify-center border-b border-neutral-900">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] uppercase font-mono font-bold tracking-widest">
              <button 
                onClick={() => { setActiveTab("live"); setSelectedPostId(null); }}
                className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === "live" ? "border-amber-500 text-amber-500 font-extrabold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                <Instagram className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === "SW" ? "Live Stream (Iframe)" : "Live Stream (Iframe)"}</span>
              </button>
              <button 
                onClick={() => { setActiveTab("posts"); setSelectedPostId(null); }}
                className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === "posts" ? "border-amber-500 text-amber-500 font-extrabold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{t.gridTab} ({instagramPosts.length})</span>
              </button>
              <button 
                onClick={() => { setActiveTab("reels"); setSelectedPostId(null); }}
                className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === "reels" ? "border-amber-500 text-amber-500 font-extrabold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>{t.reelsTab}</span>
              </button>
              <button 
                onClick={() => { setActiveTab("tagged"); setSelectedPostId(null); }}
                className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === "tagged" ? "border-amber-500 text-amber-500 font-extrabold" : "border-transparent text-neutral-400 hover:text-white"}`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t.clientTagsTab}</span>
              </button>
            </div>
          </div>

          {/* Active Tab Viewport Area */}
          {activeTab === "live" && (
            <div className="space-y-6">
              {/* Telemetry status bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-neutral-900/60 border border-neutral-850 rounded-xl gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300">
                      {language === "SW" ? "Njia ya Salama ya Live Stream" : "Live Instagram Secure Gateway"}
                    </p>
                    <p className="text-[9px] text-neutral-500 font-mono">FRAME_SSL: Encrypted Tunnel • PORT: 443</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href="https://www.instagram.com/mosse_store?igsh=eDd5bTExOTZrem81"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[10px] font-mono tracking-widest font-extrabold uppercase rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === "SW" ? "Fungua App Direki" : "Launch App Direct"}</span>
                    <ExternalLink className="w-3 h-3 stroke-[3]" />
                  </a>
                </div>
              </div>

              {/* Grid with Device Mockup Frame (Left) and Content Details Board (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. Device Mockup Frame Panel */}
                <div className="col-span-1 lg:col-span-7 flex flex-col items-center">
                  <div className="w-full max-w-full sm:max-w-sm border-0 sm:border-8 border-neutral-850 bg-neutral-950 rounded-none sm:rounded-[2.5rem] p-0 sm:p-3 shadow-none sm:shadow-[0_0_50px_rgba(245,158,11,0.12)] ring-0 sm:ring-2 sm:ring-amber-500/10 flex flex-col overflow-hidden relative">
                    
                    {/* Speaker/Camera notch mock */}
                    <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-neutral-850 rounded-b-xl z-20 items-center justify-center gap-1">
                      <span className="w-2.5 h-1 bg-neutral-700 rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>
                    </div>

                    {/* Smartphone Custom Header layout */}
                    <div className="pt-2 sm:pt-5 pb-3 px-4 flex items-center justify-between text-[9px] font-mono text-neutral-450 border-b border-neutral-900 bg-neutral-950 select-none z-10 shrink-0">
                      <span>10:53 AM</span>
                      <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-400 rounded-full font-bold flex items-center gap-0.5 animate-pulse text-[8px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        LIVE SYNCED
                      </span>
                      <div className="flex items-center gap-1 text-[8px]">
                        <span>5G</span>
                        <div className="w-4 h-2 border border-neutral-500 rounded-sm p-0.2 flex items-center">
                          <div className="h-full w-4/5 bg-amber-500 rounded-2xs"></div>
                        </div>
                      </div>
                    </div>

                    {/* Iframe Viewport */}
                    <div className="relative flex-1 bg-neutral-900 min-h-[500px] sm:min-h-[460px] sm:max-h-[580px] rounded-none sm:rounded-2xl overflow-hidden shadow-inner flex flex-col">
                      
                      {/* Premium Dark Glass Loading mask overlay styled like premium app gateway */}
                      <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-6 space-y-4 text-center z-0">
                        <img src={mosseLogo} alt="Loading..." className="w-12 h-12 rounded-full border border-amber-500/20 animate-spin" />
                        <div className="space-y-1">
                          <p className="text-xs font-mono font-bold tracking-widest text-white uppercase">{language === "SW" ? "Inapakia Profaili..." : "Initializing Stream..."}</p>
                          <p className="text-[10px] text-neutral-500 leading-relaxed font-sans max-w-[200px]">
                            {language === "SW" ? "Ulinzi wa Meta unaweza kuzuia upakiaji wa iframe kwa usalama wako wa kuki." : "Secure iframe tunnel active. If loading times exceed, Meta sandboxing is in effect."}
                          </p>
                        </div>
                      </div>

                      {/* Real Iframe element embedding the Instagram profile */}
                      <iframe 
                        src="https://www.instagram.com/mosse_store/" 
                        title="Mosse Store Live Instagram Feed"
                        className="w-full h-full min-h-[460px] border-0 rounded-2xl relative z-10 bg-transparent"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Home bottom action line mockup */}
                    <div className="hidden sm:flex py-2 justify-center shrink-0">
                      <div className="w-28 h-1 bg-neutral-700 rounded-full"></div>
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-mono text-neutral-500 mt-2">
                    {language === "SW" ? "Simu ya Kidijitali ya Mosse Live Stream" : "Digital Smartphone Emulator Live Mode"}
                  </span>
                </div>

                {/* 2. Premium Specification Details Board Card */}
                <div className="col-span-1 lg:col-span-5 space-y-4">
                  <div className="p-5 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-950 border border-neutral-850 rounded-2xl space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-mono font-extrabold uppercase rounded-md tracking-widest">
                        {language === "SW" ? "MFUMO WA INSTAGRAM" : "INTEGRATED IFRAME CHANNEL"}
                      </span>
                      <h3 className="text-sm font-extrabold text-neutral-100 uppercase tracking-wide font-mono">
                        {language === "SW" ? "Kagua Maisha ya Umaridadi" : "Live Instagram Feed Stream"}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {language === "SW"
                        ? "Tunarahisisha uchaguzi wako! Wasifu wetu wa Instagram ulioundwa kwa bidii sasa umeunganishwa mbele yako. Unaweza kukagua pamba kali na style mbalimbali kwa upole."
                        : "Experience Mosse Store's live Instagram profile directly inside our application workspace, framed elegantly under our premium design aesthetic."}
                    </p>

                    <div className="space-y-2.5 pt-1">
                      <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1 text-left">
                        <p className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                          {language === "SW" ? "✓ Ushirikiano Kamili" : "✓ Real-time Stream Sync"}
                        </p>
                        <p className="text-[11px] text-neutral-450 leading-normal font-sans">
                          {language === "SW" 
                            ? "Tazama picha kali, reels za uvaaji, na stories moja kwa moja. Kila kitu kinatiririka papo hapo!" 
                            : "Directly view live model showcases, on-campus streetwear galleries, and quick fitting updates on our feed."}
                        </p>
                      </div>

                      <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1 text-left">
                        <p className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                          {language === "SW" ? "⚡ Mfumo mbadala wa Katalogi" : "⚡ Seamless Catalog Tool"}
                        </p>
                        <p className="text-[11px] text-neutral-450 leading-normal font-sans">
                          {language === "SW" 
                            ? "Kama unataka kufanya manunuzi ya haraka au kuongeza pamba kwenye bag, badili kwenda tab ya 'Picha Zilizopo' chini." 
                            : "For direct shopping, click size selection, and high-converting catalog checkout, switch to the 'Grid Posts' tab below."}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-900 space-y-2">
                      <a 
                        href="https://www.instagram.com/mosse_store?igsh=eDd5bTExOTZrem81"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-mono font-black tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        <Instagram className="w-4 h-4 text-pink-600 fill-transparent" />
                        <span>{language === "SW" ? "Fungua Profile ya Instagram" : "Open Instagram Profile"}</span>
                      </a>
                      
                      <button
                        onClick={() => setActiveTab("posts")}
                        className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span>{language === "SW" ? "Tazama Katalogi Kavu" : "Switch to Synced Grid"}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instagramPosts.map((post) => {
                const hasLiked = likedPosts[post.id];
                return (
                  <div 
                    key={post.id} 
                    onClick={() => setSelectedPostId(post.id)}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-850 bg-neutral-950 cursor-pointer"
                  >
                    <img 
                      src={post.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Info Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/85 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3.5 text-xs">
                      <div className="flex justify-between items-center w-full">
                        <span className="px-1.5 py-0.5 bg-amber-500 text-neutral-950 font-mono font-black text-[8px] rounded uppercase tracking-wider">
                          {language === "SW" ? "Kagua Nguo" : "Shop Look"}
                        </span>
                        <span className="text-neutral-500 text-[9px] font-mono">{post.date}</span>
                      </div>

                      <div className="flex items-center justify-center gap-4 text-white font-black text-center py-2">
                        <span className="flex items-center gap-1">
                          <Heart className={`w-4 h-4 text-rose-500 ${hasLiked ? "fill-current scale-110" : ""}`} />
                          <span>{post.likes + (hasLiked ? 1 : 0)}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          <span>{post.commentsCount}</span>
                        </span>
                      </div>

                      <p className="text-[10px] text-neutral-300 line-clamp-1 italic text-center w-full">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "reels" && (
            <div className="text-center py-8 space-y-4 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
                <Tv className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-bold text-neutral-300">{t.noReels}</p>
              <p className="text-[11px] text-neutral-500">
                {language === "SW" 
                  ? "Ukishaji umefichwa kwasababu ya ulinzi wa Meta mtandaoni. Unaweza kukagua video zetu zote kali moja kwa moja kwenye Instagram!" 
                  : "Due to strict API boundaries our active video feed requires direct profile streaming."}
              </p>
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/mosse_store?igsh=eDd5bTExOTZrem81"
                  target="_blank"
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 text-neutral-950 font-mono font-extrabold text-[10px] tracking-wider rounded-lg uppercase hover:bg-amber-400"
                >
                  <span>{t.launchReels}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {activeTab === "tagged" && (
            <div className="text-center py-8 space-y-4 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
                <UserCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs font-bold text-neutral-300">{t.noTags}</p>
              <p className="text-[11px] text-neutral-500">
                {language === "SW" 
                  ? "Picha kali za wateja na wanafunzi wa chuo cha Nyegezi SAUT, wakitokelezea na kutinga Jeans fupi, Suede boots na Suit zilizoandaliwa na stylist mkuu."
                  : "These represents verified style reviews. Open outer app to browse reviews on Instagram."}
              </p>
              <div className="pt-2">
                <a 
                  href="https://www.instagram.com/mosse_store/tagged"
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 text-white font-mono font-extrabold text-[10px] tracking-wider rounded-lg uppercase"
                >
                  <span>{t.exploreClientPhotos}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                </a>
              </div>
            </div>
          )}

          {/* 4. Single Post Overlay / Shoppable Details Mode inside Simulator */}
          {selectedPost && (
            <div className="bg-neutral-900 border border-amber-500/20 rounded-xl p-4 space-y-4 mt-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                <div className="flex items-center gap-2">
                  <img src={mosseLogo} alt="" className="w-8 h-8 rounded-full border border-neutral-800" />
                  <div>
                    <span className="text-xs font-bold text-white block">mosse_store</span>
                    <span className="text-[9px] text-neutral-400 block -mt-0.5">{selectedPost.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPostId(null)}
                  className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-square bg-neutral-950 rounded-lg overflow-hidden border border-neutral-850 relative">
                  <img src={selectedPost.image} alt="" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => toggleLike(selectedPost.id)}
                    className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white"
                  >
                    <Heart className={`w-4 h-4 ${likedPosts[selectedPost.id] ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-200 leading-relaxed font-sans">{selectedPost.caption}</p>
                    <div className="flex gap-4 text-xs font-bold pt-1 border-t border-neutral-850">
                      <span className="text-neutral-400">{selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)} Likes</span>
                      <span className="text-neutral-400">{selectedPost.commentsCount} Comments</span>
                    </div>
                  </div>

                  {/* Connected Product Card (Shoppable checkout element) */}
                  {linkedProduct ? (
                    <div className="p-3 bg-neutral-950 rounded-lg border border-amber-500/20 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest">{t.shopFeatured}</span>
                        <span className="text-neutral-500 text-[8px] font-mono">{linkedProduct.sku}</span>
                      </div>
                      <div className="flex gap-3">
                        <img src={linkedProduct.images[0]} alt="" className="w-12 h-12 object-cover rounded border border-neutral-800" />
                        <div>
                          <p className="text-xs font-bold text-white uppercase line-clamp-1">{linkedProduct.name}</p>
                          <p className="text-[11px] text-amber-500 font-mono font-bold mt-0.5">
                            {currency === "TZS" ? `${linkedProduct.priceTZS.toLocaleString()} TZS` : `$${linkedProduct.priceUSD}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-1 border-t border-neutral-900/40">
                        <button 
                          onClick={() => {
                            onSelectProduct(linkedProduct);
                            onClose();
                          }}
                          className="flex-1 py-1.5 px-3 bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-white rounded hover:bg-neutral-850 cursor-pointer"
                        >
                          {t.overviewSpecs}
                        </button>
                        <button 
                          onClick={() => {
                            onAddToCartQuick(linkedProduct, linkedProduct.sizes[0], linkedProduct.colors[0]);
                          }}
                          className="flex-1 py-1.5 px-3 bg-amber-500 text-neutral-950 text-[9px] font-mono font-bold uppercase rounded hover:bg-amber-400 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{t.addToFittingBag}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-neutral-950/40 rounded-lg border border-neutral-850 text-center font-sans">
                      <p className="text-[9px] text-neutral-500">{t.unmappedSku}</p>
                    </div>
                  )}

                  <a 
                    href={`https://api.whatsapp.com/send?phone=255767542687&text=Habari Mosse! Nataka kununua pamba niliyoiona kwenye Instagram yenu: ${window.location.origin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-neutral-950 text-xs font-mono font-black tracking-wider uppercase rounded-lg text-center flex items-center justify-center gap-1.5 hover:opacity-90 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === "SW" ? "Agiza Picha Hii WhatsApp" : "Order This Style WhatsApp"}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Browser Footer Node */}
        <div className="bg-neutral-950 px-4 py-3.5 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-neutral-500 font-sans">
          <p>© 2026 mosse_store • {language === "SW" ? "Karibu Malimbe Nyegezi Mwanza" : "Moses Fashion Mwanza Studio"}</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-300 cursor-pointer" onClick={() => setActiveTab("posts")}>{language === "SW" ? "Mkusanyiko" : "Grid Posts"}</span>
            <span className="hover:text-neutral-300 cursor-pointer" onClick={() => setActiveStoryIdx(0)}>{language === "SW" ? "Kagua Stories" : "Stories"}</span>
            <span className="text-neutral-700">|</span>
            <span className="text-emerald-500 font-mono font-bold">● System Sync Done</span>
          </div>
        </div>

      </div>

    </div>
  );
}
