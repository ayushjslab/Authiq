"use client"
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-md w-full rounded-2xl border border-emerald-600/30 bg-black/80 p-8 text-center shadow-[0_0_60px_-15px_rgba(16,185,129,0.6)]"
      >
        {/* glow */}
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-2xl" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-600 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-emerald-500">
            Payment Successful
          </h1>

          <p className="mt-3 text-emerald-200/70">
            You’re all set. Smooth. Clean. Effortless.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-black transition hover:bg-emerald-500"
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
