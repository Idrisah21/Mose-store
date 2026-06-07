import React, { useState } from "react";
import { User, ShieldAlert, Sparkles, Building, Key, Star, LogIn, ArrowRight } from "lucide-react";
import { Language } from "../utils/translations";

interface LoginPortalProps {
  onLogin: (role: "customer" | "admin") => void;
  language: Language;
}

export default function LoginPortal({ onLogin, language }: LoginPortalProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailInput.trim().toLowerCase();
    const pass = passcodeInput.trim();

    if (!email || !pass) {
      setErrorMsg(language === "SW" ? "Tafadhali jaza sifa zote!" : "Please fill in all credentials!");
      return;
    }

    if (email === "admin@mosse.tz" && pass === "mosse2026") {
      onLogin("admin");
    } else if (email === "customer@mosse.tz" && pass === "gentleman") {
      onLogin("customer");
    } else {
      // General custom usernames are allowed as customer for convenience
      if (pass === "gentleman") {
        onLogin("customer");
      } else {
        setErrorMsg(
          language === "SW" 
            ? "Msimbo si sahihi! Tumia prefilled profiles hapo chini kwa jaribio rahisi." 
            : "Invalid passcode! Please utilize the pre-filled profiles below for instant sandbox testing."
        );
      }
    }
  };

  const selectProfile = (role: "customer" | "admin") => {
    if (role === "admin") {
      setEmailInput("admin@mosse.tz");
      setPasscodeInput("mosse2026");
      setErrorMsg("");
      onLogin("admin");
    } else {
      setEmailInput("customer@mosse.tz");
      setPasscodeInput("gentleman");
      setErrorMsg("");
      onLogin("customer");
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle top decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.04)_0%,transparent_60%)] pointer-events-none" />

        {/* Mosse Icon and Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-900 via-amber-950/40 to-neutral-800 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-xl">
            <span className="font-extrabold text-lg uppercase tracking-widest font-mono">M</span>
          </div>
          <div>
            <h2 className="text-lg font-black tracking-widest text-white uppercase font-sans">
              MOSSE HOUSE PORTAL
            </h2>
            <p className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">
              {language === "SW" ? "Lango la Uthibitishaji wa Nguo" : "Sartorial Identity Gateway"}
            </p>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            {language === "SW" 
              ? "Karibu kwenye Mfumo Rasmi. Tafadhali chagua ngazi yako ya idhini ili kulinda na kudhibiti biashara ya suti na mitindo ya kike na kiume Mwanza."
              : "Determine your credentials bracket to enter. Customers access immediate product styling and checkouts, while Admins authorize website settings and catalog controls."}
          </p>
        </div>

        {/* Credentials Form Box */}
        <form onSubmit={handleManualLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              {language === "SW" ? "Barua Pepe / Handle Name:" : "Access Account Handle:"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="customer@mosse.tz or admin@mosse.tz"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-amber-500 text-neutral-200 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              {language === "SW" ? "Msimbo wa Pasi (Passcode):" : "Sentry Passcode Token:"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="• • • • • • • •"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-amber-500 text-neutral-100 font-mono tracking-widest text-lg"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-mono rounded-lg flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-450 animate-bounce" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:from-amber-450 hover:to-amber-550 text-xs font-mono font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{language === "SW" ? "Ingia kwenye Mfumo" : "Authenticate Entry"}</span>
          </button>
        </form>

        {/* Suggested sandbox click options (CRO Ease of use option) */}
        <div className="space-y-3 pt-4 border-t border-neutral-850">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 text-center">
            {language === "SW" ? "Machaguo ya Majaribio ya Haraka" : "Quick Sandbox Auth Profiles"}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Customer Profile button */}
            <button
              type="button"
              onClick={() => selectProfile("customer")}
              className="p-3 bg-neutral-950/80 hover:bg-neutral-950 border border-neutral-850 hover:border-amber-500/30 rounded-xl text-left space-y-1.5 group transition-all text-xs cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500/20" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-black">Gentleman Customer</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium leading-tight">
                {language === "SW" ? "Nunua nguo, tafuta suti na pata msimbo wa usharika ya 10%" : "Browse fits, add to cart, and test 10% affiliate links"}
              </div>
              <div className="text-[8px] font-mono text-neutral-500 flex items-center gap-1 group-hover:text-neutral-300">
                <span>One-Click Log In</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Admin Profile button */}
            <button
              type="button"
              onClick={() => selectProfile("admin")}
              className="p-3 bg-neutral-950/80 hover:bg-neutral-950 border border-neutral-850 hover:border-amber-500/30 rounded-xl text-left space-y-1.5 group transition-all text-xs cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-black">Mosse Store Owner</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium leading-tight">
                {language === "SW" ? "Ufikiaji kamili wa katalogi, ongeza nguo na kurekebisha mipangilio" : "Manage inventory, delete items, view metrics & strategy"}
              </div>
              <div className="text-[8px] font-mono text-neutral-500 flex items-center gap-1 group-hover:text-neutral-300">
                <span>One-Click Log In</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Explanatory footer tag */}
        <div className="text-center">
          <p className="text-[9px] font-mono text-neutral-500 leading-normal uppercase">
            🔒 Sandboxed Token verification active • Malimbe Mwanza HQ
          </p>
        </div>
      </div>
    </div>
  );
}
