/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  MessageCircle, 
  Heart, 
  Share2, 
  ExternalLink, 
  Check, 
  Users, 
  MapPin, 
  Phone,
  Bookmark,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Grid,
  Tv,
  UserCheck
} from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data/products";
import { TRANSLATIONS, Language } from "../utils/translations";

interface PostItem {
  id: string;
  image: string;
  likes: number;
  commentsCount: number;
  caption: string;
  date: string;
  linkedProductId?: string;
  comments: {
    username: string;
    text: string;
    time: string;
    verifiedPurchase?: boolean;
    replies?: { username: string; text: string; time: string }[];
  }[];
}

interface SocialFeedProps {
  currency: "TZS" | "USD";
  language: Language;
  onAddToCartQuick: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInstagram: () => void;
  mosseLogo: string;
}

export default function SocialFeed({ currency, language, onAddToCartQuick, onSelectProduct, onOpenInstagram, mosseLogo }: SocialFeedProps) {
  const t = TRANSLATIONS[language];
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncTime, setSyncTime] = useState<string>("Just now");
  const [activeSubTab, setActiveSubTab] = useState<"posts" | "reels" | "tagged">("posts");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Handcrafting the post database conforming exactly to the user's uploaded Instagram profile image and aesthetics
  const instagramPosts: PostItem[] = [
    {
      id: "ig-1",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800",
      likes: 142,
      commentsCount: 9,
      caption: "TUNAUZA NGUO 👕👖👟 Side-Stripe Indigo Denim Shorts spec mguuni. King of the casual weekends! Tupigie au tuandikie WhatsApp namba 0767542687 kufanya order sasa hivi. #mosse_store #mwanza",
      date: "2 hours ago",
      linkedProductId: "prod-7",
      comments: [
        { username: "manlikelewis._", text: "Hii side stripe ni kali kinoma mzee! 🔥 Nafika ofisini Malimbe jioni hii kucheki size yangu.", time: "1h", verifiedPurchase: true },
        { 
          username: "mosse_store", 
          text: "Karibu sana kaka! Size 30 na 32 zipo chache leo, fanya kuwahi kijana wa nyumbani.", 
          time: "45m" 
        },
        { username: "i_drisah21", text: "Tuma Dar es Salaam kaka, inachukua muda gani?", time: "30m" },
        { username: "mosse_store", text: "Kaka wa Dar tunatuma kwa basi na inafika chini ya masaa 24 salama kabisa! DM sasa hivi tufanye amani ⚡", time: "25m" }
      ]
    },
    {
      id: "ig-2",
      image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800",
      likes: 98,
      commentsCount: 6,
      caption: "Distressed light blue ripped shorts for active summer setting! Soft comfort, vintage washing details. 📍 Location Malimbe Mwanza, Call/WhatsApp: 0767542687. Tunatuma mikoani kote 🚌 #MwanzaSAUT #StreetStyle",
      date: "1 day ago",
      linkedProductId: "prod-8",
      comments: [
        { username: "wizy_maarifa", text: "Bei gani hizi kaka?", time: "12h" },
        { username: "mosse_store", text: "Ni 48,000 TZS tu kaka weka DM size yako tukupigie hesabu na usafiri!", time: "11h" },
        { username: "jahn_dapper_tz", text: "Material yake ni ngumu au ile stretch mzee wangu?", time: "5h" },
        { username: "mosse_store", text: "Ni ultra long-staple cotton denim thabiti sana Kaka lakini inaruhusu movement vizuri mno! Inakaa poa sana.", time: "4h" }
      ]
    },
    {
      id: "ig-3",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800",
      likes: 126,
      commentsCount: 5,
      caption: "Terracotta Rust-Brown luxury fabric. Beautiful fit, dual-stitch durability. Stand out from the crowd! Delivery within Mwanza and countrywide across East Africa. #MosseCotton #VibeOfTheDay",
      date: "3 days ago",
      linkedProductId: "prod-9",
      comments: [
        { username: "saidi_flair", text: "Hii rangi ni adimu mno kupata duka la kawaida. Moja safi kwangu!", time: "2d", verifiedPurchase: true },
        { username: "mosse_store", text: "Shukrani sana! Rungi hii ina drapes maalum mwangani 👑", time: "2d" }
      ]
    },
    {
      id: "ig-4",
      image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&q=80&w=800",
      likes: 89,
      commentsCount: 3,
      caption: "The elegant sand-khaki utility setup matching with any smart elements. Call 0767542687 to deliver right to your workspace or university hostel in Malimbe we have 11 pairs intact. #mosse_house_of_switch",
      date: "5 days ago",
      linkedProductId: "prod-10",
      comments: [
        { username: "kelvin_k", text: "Zimebaki size gani?", time: "4d" },
        { username: "mosse_store", text: "Pande zote kuanzia size 28 hadi 36 zipo heri mkuu wangu.", time: "4d" }
      ]
    },
    {
      id: "ig-5",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      likes: 212,
      commentsCount: 14,
      caption: "Sartorial Opulence: The Mosse Royal Navy Premium Tailoring drape layout. Complete jacket and slim pants. Fit verify via Masaki or Malimbe studio nodes. #SartorialGentleman #SuitTanzania",
      date: "1 week ago",
      linkedProductId: "prod-1",
      comments: [
        { username: "baraka_sauti", text: "Hii ndio suti niliyoiona juzi! Fitment yake imetulia kinyama.", time: "6d", verifiedPurchase: true },
        { username: "mosse_store", text: "Asante Kaka, we pride ourselves on international standard shoulder tailoring!", time: "6d" }
      ]
    },
    {
      id: "ig-6",
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
      likes: 177,
      commentsCount: 8,
      caption: "Handcrafted genuine suede leather dapper Chelsea boots built strong for extreme long-haul stylish elegance. Inashikilia mguu vizuri na rangi haichuji. Let us send it via regional bus to Dodoma or Arusha today!",
      date: "1 week ago",
      linkedProductId: "prod-2",
      comments: [
        { username: "lucas_clemens", text: "Viatu vyenu ni og, vimevumilia sana mvua za masika hapa Dar.", time: "1w" },
        { username: "mosse_store", text: "Oya Kaka! Hiyo ni suede maalum iliyopitishwa anti-water membrane treatment, asante kwa feedback!", time: "1w" }
      ]
    }
  ];

  const handleSyncFeed = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      setSyncTime(`Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }, 1800);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getPriceOutput = (product: Product) => {
    if (currency === "TZS") {
      return `${product.priceTZS.toLocaleString()} TZS`;
    }
    return `$${product.priceUSD}`;
  };

  return (
    <div id="social-feed-container" className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-4 md:p-6 space-y-6">
      
      {/* 1. Header Integration Controller */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-850 pb-5">
        <div>
          <h3 className="text-sm font-extrabold uppercase text-amber-500 tracking-wider flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            <span>{t.socialTitle}</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            {t.socialBrief}
          </p>
        </div>

        {/* Sync Simulated Feed Component */}
        <button
          onClick={handleSyncFeed}
          disabled={isSyncing}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 disabled:opacity-50 text-neutral-300 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? (language === "SW" ? "Inasawazisha..." : "Syncing...") : `${t.syncBtn} (${syncTime})`}</span>
        </button>
      </div>

      {/* 2. Authentic Instagram Profile Card */}
      <div className="p-4 md:p-6 bg-neutral-950 rounded-xl border border-neutral-850/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Profile Avatar Spot */}
        <div className="md:col-span-3 flex flex-col items-center justify-center space-y-3">
          <div className="relative cursor-pointer group" onClick={onOpenInstagram} title={language === "SW" ? "Fungua Instagram ndani ya Tovuti" : "Open Instagram inside Website"}>
            <div className="absolute inset-x-[-4px] inset-y-[-4px] bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 rounded-full rotate-45 p-[3px] animate-pulse group-hover:scale-102 transition-transform"></div>
            <div className="relative w-24 h-24 bg-neutral-950 rounded-full p-[3px] overflow-hidden flex items-center justify-center">
              <img 
                src={mosseLogo} 
                alt="Mosse Store Profile" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="text-center">
            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500/10 to-yellow-600/10 text-amber-500 border border-amber-500/15 text-[9px] font-mono rounded font-bold uppercase tracking-wider">
              @mosse_store
            </span>
          </div>
        </div>

        {/* Profile Statistics and Bio Info */}
        <div className="md:col-span-9 space-y-4">
          <div className="flex items-center gap-4 sm:gap-6 border-b border-neutral-900 pb-3">
            <div>
              <span className="block text-md font-extrabold text-white font-mono">653</span>
              <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider">Posts</span>
            </div>
            <div>
              <span className="block text-md font-extrabold text-white font-mono">1,848</span>
              <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider">Followers</span>
            </div>
            <div>
              <span className="block text-md font-extrabold text-white font-mono">263</span>
              <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider">Following</span>
            </div>
            <div className="ml-auto">
              <button 
                onClick={onOpenInstagram}
                className="py-1.5 px-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-[10px] font-mono uppercase tracking-wider rounded text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{t.viewInstaBtn}</span>
                <ExternalLink className="w-3 h-3 text-amber-500" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-black uppercase text-white tracking-wider">Moses Fashion</h4>
              <span className="w-3.5 h-3.5 bg-sky-500 rounded-full flex items-center justify-center text-white" title="Verified Profile">
                <Check className="w-2.5 h-2.5 stroke-[4]" />
              </span>
            </div>
            <p className="text-[11px] text-amber-500 font-medium">Clothing (Brand) • House of Switch</p>
            
            <div className="text-[11px] text-neutral-300 font-mono space-y-1 leading-relaxed">
              <p>TUNAUZA NGUO 👕👖👟 🇹🇿🇰🇪 call <span className="text-white hover:underline cursor-pointer">0767542687</span></p>
              <p>WHATSAPP <span className="text-emerald-400">0767542687</span>. 📍LOCATION MALIMBE</p>
              <p>MWANZA. MIKOANI TUNATUMA 🚌</p>
            </div>

            {/* Simulated Mutual Followers */}
            <div className="flex items-center gap-2 pt-1 border-t border-neutral-900/60 mt-3 text-[10px] text-neutral-400 font-sans">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-600 border border-neutral-950 flex items-center justify-center text-[8px] font-bold text-white">ML</div>
                <div className="w-5 h-5 rounded-full bg-pink-600 border border-neutral-950 flex items-center justify-center text-[8px] font-bold text-white">ID</div>
                <div className="w-5 h-5 rounded-full bg-amber-600 border border-neutral-950 flex items-center justify-center text-[8px] font-bold text-white">WM</div>
              </div>
              <p>
                {language === "SW" ? "Inatufuatiliwa na " : "Followed by "}<strong className="text-neutral-200">manlikelewis._</strong>, <strong className="text-neutral-200">i_drisah21</strong>{language === "SW" ? " na " : " and "}<strong className="text-neutral-200">wizy_maarifa</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs within Social Feed */}
      <div className="flex justify-center border-b border-neutral-850/80">
        <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest font-bold">
          <button 
            onClick={() => setActiveSubTab("posts")}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeSubTab === "posts" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{t.gridTab} ({instagramPosts.length})</span>
          </button>
          <button 
            onClick={() => setActiveSubTab("reels")}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeSubTab === "reels" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>{t.reelsTab}</span>
          </button>
          <button 
            onClick={() => setActiveSubTab("tagged")}
            className={`py-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeSubTab === "tagged" ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-white"}`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.clientTagsTab}</span>
          </button>
        </div>
      </div>

      {/* 4. Active Feed Render Node */}
      {activeSubTab === "posts" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {instagramPosts.map((post) => {
              const hasLiked = likedPosts[post.id];
              return (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-850 bg-neutral-950 cursor-pointer"
                >
                  <img 
                    src={post.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Instant Info overlay */}
                  <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-4 text-xs font-sans">
                    
                    {/* Top: SKU tags */}
                    <div className="flex justify-between items-center w-full">
                      <span className="px-2 py-0.5 bg-amber-500 text-neutral-950 font-mono font-extrabold text-[8px] rounded uppercase tracking-wider">
                        {language === "SW" ? "Kagua Sura" : "Shop Look"}
                      </span>
                      <span className="text-neutral-400 font-mono text-[9px]">
                        {post.date}
                      </span>
                    </div>

                    {/* Center: Interactive likes / Comments counters */}
                    <div className="flex items-center justify-center gap-6 text-white font-bold text-center">
                      <span className="flex items-center gap-1.5">
                        <Heart className={`w-4 default-transition h-4 ${hasLiked ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                        <span>{post.likes + (hasLiked ? 1 : 0)}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>{post.commentsCount}</span>
                      </span>
                    </div>

                    {/* Bottom: Teaser Caption */}
                    <p className="text-[10px] text-neutral-300 line-clamp-1 italic text-center w-full">
                      {post.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Gold Accented Follow Button */}
          <div className="pt-2 text-center">
            <button 
              onClick={onOpenInstagram}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-xs font-mono font-black tracking-wider uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 active:translate-y-0 transform duration-300 border border-amber-400/40 relative overflow-hidden group w-full sm:w-auto cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <Instagram className="w-4 h-4 fill-current stroke-[2.5]" />
              <span>{t.followInstagramGold}</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {activeSubTab === "reels" && (
        <div className="p-8 bg-neutral-950/50 rounded-xl border border-neutral-850/60 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
            <Tv className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-xs font-bold text-neutral-300">{t.noReels}</p>
          <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
            {language === "SW" 
              ? "Reels zetu huhitaji ulishaji wa moja kwa moja kutoka mtandao wa mzazi wa Meta. Jisikie huru kufungua akaunti rasmi kukagua." 
              : "Our Instagram reels require external video player stream sync. Feel free to view them directly on our official Instagram page under @mosse_store."}
          </p>
          <div className="pt-2">
            <button 
              onClick={onOpenInstagram} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-neutral-950 font-mono font-bold text-[10px] tracking-wider rounded uppercase hover:bg-amber-400 cursor-pointer"
            >
              <span>{t.launchReels}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeSubTab === "tagged" && (
        <div className="p-8 bg-neutral-950/50 rounded-xl border border-neutral-850/60 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
            <UserCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs font-bold text-neutral-300">{t.noTags}</p>
          <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
            {language === "SW"
              ? "Hapa tunaweka picha kali zilizorushwa na wanafunzi wa Chuo Kikuu cha Mtakatifu Agostino (SAUT) wakiwa wametinga suruali, kaptula na raba zetu chuoni Nyegezi."
              : "These are authentic snapshots captured by St. Augustine University (SAUT) students wearing the custom designed Mosse distressed fits on campus."}
          </p>
          <div className="pt-2">
            <button 
              onClick={onOpenInstagram} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white font-mono font-bold text-[10px] tracking-wider rounded uppercase cursor-pointer"
            >
              <span>{t.exploreClientPhotos}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Styled Instagram Lightbox / Modal Overlay */}
      {selectedPost && (() => {
        const linkedProduct = selectedPost.linkedProductId 
          ? PRODUCTS.find(p => p.id === selectedPost.linkedProductId) 
          : null;
        
        const hasLiked = likedPosts[selectedPost.id];

        return (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
              
              {/* Left Side: Solid Post Media */}
              <div className="relative bg-neutral-950 flex items-center justify-center p-0 aspect-square md:aspect-auto max-h-[45vh] md:max-h-[90vh]">
                <img 
                  src={selectedPost.image} 
                  alt="" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Close Button on Mobile view */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 left-4 p-2 bg-neutral-950/80 hover:bg-neutral-950/100 text-white rounded-full transition-colors md:hidden border border-neutral-800"
                >
                  <span className="font-bold text-xs uppercase font-mono px-1">{language === "SW" ? "Funga Picha" : "Close Info"}</span>
                </button>
              </div>

              {/* Right Side: Instagram Profile Deck & Shopping Integration */}
              <div className="p-4 md:p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[90vh] space-y-4">
                
                {/* Upper Deck Account info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-pink-600 p-[1.5px] overflow-hidden flex items-center justify-center">
                        <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center">
                          <span className="font-mono text-[8px] font-black tracking-normal text-amber-500">MS</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-extrabold text-white">mosse_store</h4>
                          <span className="w-3 h-3 bg-sky-500 rounded-full flex items-center justify-center text-white">
                            <Check className="w-2 stroke-[4] h-2" />
                          </span>
                        </div>
                        <p className="text-[9px] text-neutral-400 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-amber-500" />
                          <span>Malimbe, Mwanza (SAUT Node)</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPost(null)}
                      className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 border border-neutral-850 rounded text-[10px] font-mono text-neutral-400 hover:text-white cursor-pointer"
                    >
                      ✕ {language === "SW" ? "Funga" : "Close"}
                    </button>
                  </div>

                  {/* Post Caption Body */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-white font-mono mr-1.5">mosse_store</span>
                    <p className="text-[11px] text-neutral-300 leading-relaxed inline-block font-sans font-normal">
                      {selectedPost.caption}
                    </p>
                    <span className="block text-[9px] text-neutral-500 pt-1 font-mono">{selectedPost.date}</span>
                  </div>

                  {/* Post Stats Action Bar */}
                  <div className="flex items-center justify-between border-t border-b border-neutral-850 py-2.5 text-xs text-neutral-400">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => toggleLike(selectedPost.id, e)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${hasLiked ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                        <span className="font-bold text-white text-[11px]">{selectedPost.likes + (hasLiked ? 1 : 0)} {language === "SW" ? "Wamependa" : "Likes"}</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-white text-[11px]">{selectedPost.commentsCount} {language === "SW" ? "Maoni" : "Comments"}</span>
                      </span>
                    </div>

                    <Bookmark className="w-4 h-4 text-neutral-500 hover:text-amber-500 cursor-pointer" />
                  </div>

                  {/* Real-time Swahili Comment loops */}
                  <div className="space-y-3 pt-1 max-h-[160px] overflow-y-auto pr-2">
                    {selectedPost.comments.map((comment, cIdx) => (
                      <div key={cIdx} className="text-[10px] space-y-1 bg-neutral-950/30 p-2 rounded-lg border border-neutral-850/60 font-sans">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-neutral-200">{comment.username}</span>
                            {comment.verifiedPurchase && (
                              <span className="p-0.5 px-1 bg-amber-500/10 text-amber-500 text-[6px] rounded border border-amber-500/20 uppercase font-black font-mono">
                                {t.verifiedClientLabel}
                              </span>
                            )}
                          </div>
                          <span className="text-neutral-500 text-[8px] font-mono">{comment.time}</span>
                        </div>
                        <p className="text-neutral-400 leading-normal">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Integration: Active "Shop This Look" Widget */}
                <div className="pt-3 border-t border-neutral-850 relative z-20">
                  {linkedProduct ? (
                    <div className="p-3 bg-neutral-950/90 rounded-xl border border-amber-500/20 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">
                          ⚡ {t.shopFeatured}
                        </span>
                        <span className="text-neutral-500 font-mono text-[9px]">{linkedProduct.sku}</span>
                      </div>

                      <div className="flex gap-2.5 items-center">
                        <img 
                          src={linkedProduct.images[0]} 
                          alt="" 
                          className="w-10 h-10 object-cover rounded border border-neutral-800"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-[11px] font-bold text-white truncate uppercase">{linkedProduct.name}</h5>
                          <span className="text-[10px] font-mono text-amber-500 font-bold">{getPriceOutput(linkedProduct)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onSelectProduct(linkedProduct);
                          }}
                          className="py-1.5 px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[9px] font-mono uppercase tracking-wider text-white rounded transition-colors cursor-pointer"
                        >
                          {t.overviewSpecs}
                        </button>

                        <button
                          onClick={() => {
                            // Quick Add first size
                            onAddToCartQuick(linkedProduct, linkedProduct.sizes[1] || "32", linkedProduct.colors[0]);
                            setSelectedPost(null);
                          }}
                          className="py-1.5 px-3 bg-amber-500 hover:bg-amber-450 text-neutral-950 text-[9px] font-mono uppercase font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3 shrink-0" />
                          <span>{t.addToFittingBag}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-850 text-center font-sans">
                      <p className="text-[10px] text-neutral-500">{t.unmappedSku}</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
