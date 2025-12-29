"use client";

import { motion } from "framer-motion";
import { PricingCard } from "./pricing-card";

export default function PricingPage() {
  const plans = [
    {
      title: "Free Tier",
      price: "Free",
      description:
        "Perfect for hobbyists and side projects looking to get started with basic web hosting.",
      features: [
        "Up to 3 websites",
        "Community support",
        "Basic analytics",
      ],
      isPro: false,
    },
    {
      title: "Pro Plan",
      price: "$19",
      description:
        "For professionals and scaling businesses that need unlimited freedom and premium performance.",
      features: [
        "Infinite websites",
        "24/7 Priority support",
        "Advanced analytics dashboard",
      ],
      isPro: true,
    },
  ];

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl w-full mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4"
          >
            Pricing Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Scale your vision <br />
            <span className="text-emerald-500">without limits.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 max-w-xl mx-auto text-lg"
          >
            Choose the plan that fits your journey. From single projects to
            infinite possibilities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {plans.map((plan, index) => (
            <PricingCard key={plan.title} {...plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center text-zinc-500 text-sm"
        >
          Have questions?{" "}
          <button className="text-emerald-500 hover:underline">
            Contact our sales team
          </button>
        </motion.div>
      </div>
    </main>
  );
}
