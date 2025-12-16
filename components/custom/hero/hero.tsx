"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { getUserFromJWT } from "@/hooks/getUser";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-10">
      {/* Soft background glow */}
      <div className="absolute inset-0 blur-[160px] opacity-30">
        <div className="absolute top-10 left-20 w-96 h-96 bg-primary/30 rounded-full" />
        <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 sm:px-10"
      >
        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col justify-center">
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold w-fit"
          >
            ✨ Authentication Reinvented
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl sm:text-6xl font-bold leading-tight text-foreground"
          >
            Secure Auth,  
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              Zero Complexity
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground max-w-xl"
          >
            Authiq gives you lightning-fast auth, beautiful UI components, and
            enterprise-grade security — wrapped in a developer-friendly package.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2 group"
              onClick={() => redirect("/dashboard")}
            >
              Get Started
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 5 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  repeatType: "reverse",
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
            >
              <Zap size={18} />
              Live Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-3 gap-6 max-w-sm"
          >
            {[
              { number: "10K+", label: "Developers" },
              { number: "99.9%", label: "Uptime" },
              { number: "<5 min", label: "Setup" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.number}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: ANIMATED VISUAL SIDE */}
        <div className="relative flex items-center justify-center">
          {/* Glow Orb */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[380px] h-[380px] bg-linear-to-br from-primary/20 to-secondary/10 rounded-full blur-2xl absolute"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-card/30 backdrop-blur-xl border border-primary/20 rounded-3xl p-10 shadow-2xl w-[330px] flex flex-col items-center"
          >
            <ShieldCheck className="text-primary mb-4" size={70} />
            <h3 className="text-xl font-semibold text-foreground">Enterprise Security</h3>
            <p className="text-muted-foreground mt-3 text-center text-sm">
              Built with advanced encryption and zero-trust principles.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
