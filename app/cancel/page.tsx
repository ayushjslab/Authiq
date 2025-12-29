"use client"
import { motion } from "framer-motion";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-md w-full rounded-2xl border border-emerald-600/20 bg-black/80 p-8 text-center"
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-600/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-emerald-600/40 flex items-center justify-center">
            <span className="text-3xl text-emerald-600">×</span>
          </div>

          <h1 className="text-3xl font-bold text-emerald-600">
            Payment Canceled
          </h1>

          <p className="mt-3 text-emerald-200/60">
            No pressure. You’re always in control.
          </p>

          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 rounded-xl border border-emerald-600 py-3 font-semibold text-emerald-500 hover:bg-emerald-600/10"
            >
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 rounded-xl bg-emerald-600 py-3 font-semibold text-black hover:bg-emerald-500"
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
