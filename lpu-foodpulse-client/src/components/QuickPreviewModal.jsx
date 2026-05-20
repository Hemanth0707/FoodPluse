import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Clock, Flame, ShieldAlert, Sparkles, ShoppingCart, Leaf, ChevronRight, Plus, Minus, Star } from "lucide-react";

export default function QuickPreviewModal({ item, isOpen, onClose, cartQuantity = 0, onUpdateCart, onViewStall }) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  // Mock Premium Metadata if not present in item
  const calories = item.calories || 320;
  const rating = item.rating || 4.8;
  const reviewsCount = item.reviewsCount || 124;
  const eta = item.eta || "15 mins";
  const allergens = item.allergens || ["Gluten-Free", "Vegetarian"];
  const protein = item.protein || "12g";
  const carbs = item.carbs || "45g";
  const fat = item.fat || "8g";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl overflow-hidden premium-glass border border-purple-500/20 shadow-2xl p-0 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
        role="dialog"
        aria-modal="true"
        aria-label={`Preview of ${item.name}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all accessibility-focus"
          aria-label="Close preview"
        >
          <X size={16} />
        </button>

        {/* Visual Section */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 min-h-[220px] md:min-h-full flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]" />
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover relative z-1"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center z-1">
              <div className="w-20 h-20 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 animate-premium-float">
                <Sparkles size={38} className="text-purple-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white mb-1">{item.name}</span>
              <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">Premium Dining</span>
            </div>
          )}

          {/* Dynamic ETA Overlay Badge */}
          <div className="absolute bottom-4 left-4 bg-black/65 backdrop-blur-md border border-purple-500/30 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs font-semibold text-purple-200 shadow-lg">
            <Clock size={13} className="text-purple-400" />
            <span>ETA: {eta}</span>
          </div>

          {/* Category Tag */}
          <span className="absolute top-4 left-4 bg-pink-500/20 backdrop-blur-md border border-pink-500/30 text-pink-300 text-[10px] font-bold uppercase tracking-widest rounded px-2.5 py-1">
            {item.category || "Popular"}
          </span>
        </div>

        {/* Content Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-semibold ml-1">{rating}</span>
                </div>
                <span className="text-xs text-gray-400">({reviewsCount} audits)</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{item.name}</h2>
              <button 
                onClick={onViewStall}
                className="text-xs text-purple-300 hover:text-purple-100 font-semibold mt-1.5 underline decoration-purple-500/50 hover:decoration-purple-300 transition-all text-left block"
              >
                {item.stallName || "LPU Campus Hub"}
              </button>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {item.description || "Freshly cooked under strict digital mess audits. Safe, visual AI scans confirm pristine standard and authentic campus recipes."}
            </p>

            {/* Nutrition Information */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300/80 flex items-center gap-1.5">
                <Flame size={13} className="text-purple-400" /> Nutrition Metrics
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/5 border border-white/5 rounded-xl p-2">
                  <div className="text-xs text-gray-400">Cal</div>
                  <div className="text-sm font-bold text-white mt-0.5">{calories} kcal</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2">
                  <div className="text-xs text-gray-400">Prot</div>
                  <div className="text-sm font-bold text-purple-300 mt-0.5">{protein}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2">
                  <div className="text-xs text-gray-400">Carb</div>
                  <div className="text-sm font-bold text-pink-300 mt-0.5">{carbs}</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2">
                  <div className="text-xs text-gray-400">Fat</div>
                  <div className="text-sm font-bold text-blue-300 mt-0.5">{fat}</div>
                </div>
              </div>
            </div>

            {/* Allergens & Dietary Flags */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300/80 flex items-center gap-1.5">
                <Leaf size={13} className="text-green-400" /> Dietary Info & Allergens
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allergens.map((alg, index) => (
                  <span
                    key={index}
                    className="text-xs bg-white/5 border border-white/10 text-gray-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {alg}
                  </span>
                ))}
                {item.isVeg ? (
                  <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Pure Veg
                  </span>
                ) : (
                  <span className="text-xs bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Non-Veg
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400">Audit Points Cost</div>
              <div className="text-2xl font-extrabold text-white flex items-baseline gap-1 mt-0.5">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{item.pointsCost}</span>
                <span className="text-xs text-gray-400 font-semibold">PTS</span>
              </div>
            </div>

            {/* Quantity Controls */}
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1.5 px-2.5">
                <button
                  onClick={() => onUpdateCart(item, -1)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all accessibility-focus"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold text-white px-1.5 min-w-[20px] text-center">{cartQuantity}</span>
                <button
                  onClick={() => onUpdateCart(item, 1)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all accessibility-focus"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onUpdateCart(item, 1)}
                className="btn-primary py-3 px-6 rounded-2xl glow-on-hover flex items-center gap-2.5 text-sm font-bold transition-all accessibility-focus"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
