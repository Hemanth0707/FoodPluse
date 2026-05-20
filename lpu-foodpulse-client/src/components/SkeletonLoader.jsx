import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader({ type = "card", className = "", count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case "avatar":
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shimmer-bg border border-purple-500/10 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 shimmer-bg rounded-md" />
              <div className="h-3 w-16 shimmer-bg rounded-md opacity-60" />
            </div>
          </div>
        );
      case "text":
        return (
          <div className="space-y-2 py-1">
            <div className="h-4 w-3/4 shimmer-bg rounded-md" />
            <div className="h-3 w-1/2 shimmer-bg rounded-md opacity-60" />
          </div>
        );
      case "card":
      default:
        return (
          <div className="premium-glass p-6 min-h-[160px] flex flex-col justify-between border border-purple-500/10">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl shimmer-bg border border-purple-500/10" />
                <div className="w-16 h-5 shimmer-bg rounded-full" />
              </div>
              <div className="h-6 w-2/3 shimmer-bg rounded-md" />
              <div className="h-4 w-1/2 shimmer-bg rounded-md opacity-60" />
            </div>
            <div className="h-4 w-full shimmer-bg rounded-md mt-4 opacity-40" />
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className={className}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
}
