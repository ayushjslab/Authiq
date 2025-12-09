"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Animated Logo / Orb */}
      <motion.div
        className="w-24 h-24 rounded-full bg-[#ff0055] shadow-[0_0_20px_#ff0055] mb-8"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Loading Text */}
      <motion.h1
        className="text-3xl font-bold text-[#ff0055] tracking-widest"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        LOADING...
      </motion.h1>

      {/* Animated Ruby Bars */}
      <div className="flex space-x-2 mt-6">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-8 bg-[#ff0055] rounded-full"
            animate={{ scaleY: [1, 2, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
