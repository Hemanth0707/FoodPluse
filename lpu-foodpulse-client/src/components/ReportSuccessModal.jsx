import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

export default function ReportSuccessModal({ isOpen, onClose, pointsEarned = 150 }) {
  // Listen for Escape key to close
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Confetti & Sparkles Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 1,
              x: "50vw",
              y: "50vh",
              scale: Math.random() * 0.8 + 0.4,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              x: `calc(50vw + ${Math.random() * 360 - 180}px)`,
              y: `calc(50vh + ${Math.random() * 360 - 180}px)`,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 1.8,
              ease: "easeOut",
              delay: Math.random() * 0.15,
            }}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0
                ? "bg-purple-400"
                : i % 3 === 1
                ? "bg-pink-400"
                : "bg-blue-400"
            }`}
          />
        ))}
      </div>

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="relative w-full max-w-md overflow-hidden premium-glass border border-purple-500/25 shadow-2xl p-8 text-center"
        role="dialog"
        aria-modal="true"
        aria-label="Report Quality Verification Success"
      >
        {/* Glow Ring Effects */}
        <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon Sphere */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          {/* Rotating halo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
          />
          {/* Second pulsing glow ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 rounded-full bg-purple-500/10 border border-purple-500/30"
          />
          {/* Center visual */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <ShieldCheck size={32} className="animate-pulse" />
          </div>
          {/* Sparkles element */}
          <Sparkles className="absolute top-0 right-0 text-pink-400 w-5 h-5 animate-bounce" />
        </div>

        {/* Details Content */}
        <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
          AI Audit Verified!
        </h2>
        <p className="text-sm text-gray-300 max-w-sm mx-auto mb-6">
          Thank you for keeping LPU FoodPulse safe. The computer vision model successfully audited the report and approved safety compliance standards.
        </p>

        {/* Reward Showcase Card */}
        <div className="bg-purple-950/20 border border-purple-500/25 rounded-2xl p-4 mb-6 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-purple-500/10">
            <Award size={80} />
          </div>
          <div className="text-xs font-bold text-purple-300 uppercase tracking-widest">Digital Credits Awarded</div>
          <div className="text-4xl font-black text-white flex items-baseline justify-center gap-1.5 mt-1.5">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">+{pointsEarned}</span>
            <span className="text-sm text-purple-300 font-bold">PTS</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            Added directly to your student mess wallet
          </div>
        </div>

        {/* XP Level Progression Ring/Bar */}
        <div className="space-y-2 mb-8 text-left">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Auditor XP (Lvl 3)</span>
            <span className="text-purple-300">850 / 1000 XP</span>
          </div>
          <div className="h-2 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "70%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
          <div className="text-[10px] text-gray-500 text-center">
            Earn 150 more XP to level up to Senior Mess Auditor
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="btn-primary py-3 px-8 w-full rounded-2xl glow-on-hover flex items-center justify-center gap-2 text-sm font-bold transition-all accessibility-focus"
        >
          Excellent
          <ChevronRight size={14} />
        </button>
      </motion.div>
    </div>
  );
}
