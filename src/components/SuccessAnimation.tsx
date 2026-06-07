import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";

interface SuccessAnimationProps {
  type: "cart" | "checkout";
  productName?: string;
  onClose: () => void;
}

export default function SuccessAnimation({ type, productName, onClose }: SuccessAnimationProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-w-sm w-full text-center space-y-5 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Golden Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Sparkles Emitters */}
          <div className="absolute top-1/4 left-1/4 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="text-amber-500/50"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </div>
          <div className="absolute bottom-1/4 right-1/4 translate-y-1/2">
            <motion.div
              animate={{ rotate: -360, scale: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
              className="text-amber-500/40"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Animated Main Vector Graphic */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              {/* Outer pulsing ring */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
              />

              {/* Inner rotating dash border */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-full border border-dashed border-amber-500/40"
              />

              {/* Central Green Sphere and Check icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
                className="absolute inset-3.5 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"
              >
                {type === "cart" ? (
                  <ShoppingBag className="w-6 h-6 text-neutral-950 font-black stroke-[2.5]" />
                ) : (
                  <ShieldCheck className="w-7 h-7 text-neutral-900 font-black stroke-[2.5]" />
                )}
              </motion.div>

              {/* Floating micro stars/confetti ticks around */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                const distance = 38;
                const rad = (angle * Math.PI) / 180;
                const x = Math.sin(rad) * distance;
                const y = -Math.cos(rad) * distance;
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 0], x, y, opacity: [0, 1, 0] }}
                    transition={{ delay: 0.35, duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-amber-400"
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black font-mono tracking-widest text-white uppercase">
              {type === "cart" ? "Dapper Fit Selected!" : "Grand Checkout Complete!"}
            </h4>
            <p className="text-xs text-neutral-450 font-mono text-emerald-400 uppercase tracking-wider font-bold">
              {type === "cart" ? "✓ Added to Fitting Bag" : "✓ Order Locked in CRM"}
            </p>
            {productName && (
              <p className="text-xs font-medium text-neutral-200 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-850 inline-block">
                {productName}
              </p>
            )}
            <p className="text-[11px] text-neutral-400 leading-relaxed max-w-xs mx-auto">
              {type === "cart"
                ? "The garment has been stored inside your virtual Fitting Bag. Complete verification directly to request dispatch!"
                : "Your sartorial package has issued a direct reservation reference. Our Malimbe stylist will connect on WhatsApp shortly."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white text-[10px] font-mono uppercase tracking-widest font-black rounded-lg border border-neutral-700 transition-all cursor-pointer"
          >
            Acknowledge & Continue
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
