"use client"

import { motion } from "framer-motion"
import { Code2, Zap, Shield, BarChart3 } from "lucide-react"

export default function HowToUse() {
  const steps = [
    {
      icon: Shield,
      title: "Login & Create Project",
      description:
        "Sign in with Google or GitHub. Create your project and instantly unlock your secure Authiq dashboard.",
    },
    {
      icon: Code2,
      title: "Add Your Website",
      description:
        "Register your website, get a unique Website ID, and connect your app to Authiq in seconds.",
    },
    {
      icon: Zap,
      title: "Install & Authenticate",
      description:
        "Install the SDK, drop in your Website ID, and use pre-built hooks for Google & GitHub authentication.",
    },
    {
      icon: BarChart3,
      title: "Analyze & Scale",
      description:
        "Track logins, providers, and user activity with real-time analytics built for growth.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  return (
    <section
      id="roadmap"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
    
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            How to use{" "}
            <span className="bg-linear-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Authiq
            </span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            From zero to secure authentication — beautifully simple.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div key={step.title} variants={itemVariants} className="group relative">
                <div className="relative h-full rounded-2xl p-px bg-linear-to-br from-emerald-500/40 via-emerald-600/10 to-transparent">
                  <div className="h-full rounded-2xl bg-zinc-950/80 backdrop-blur-xl p-8 border border-white/5 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]">
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-11 h-11 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="mb-5 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"
                    >
                      <Icon className="text-emerald-400" size={24} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-linear-to-r from-emerald-500 to-transparent" />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
