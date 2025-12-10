"use client"

import { motion } from "framer-motion"
import { Code2, Zap, Shield, Check } from "lucide-react"

export default function HowToUse() {
  const steps = [
    {
      icon: Code2,
      title: "Install SDK",
      description:
        "Add Authiq to your project with a single npm command. Works with React, Vue, Angular, and vanilla JS.",
    },
    {
      icon: Shield,
      title: "Configure Keys",
      description:
        "Get your API keys from the dashboard. Set your redirect URIs and configure your authentication flow.",
    },
    {
      icon: Zap,
      title: "Implement Auth",
      description: "Use our simple hooks or middleware. Three lines of code to add secure authentication to your app.",
    },
    {
      icon: Check,
      title: "Go Live",
      description: "Your users can now securely log in. Monitor analytics and manage users from your dashboard.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            How to Use{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Authiq</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to add enterprise-grade authentication to your application.
          </p>
        </motion.div>

        {/* Steps Grid */}
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
                {/* Card */}
                <div className="relative h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  {/* Number Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-primary-foreground text-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {idx + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-primary" size={24} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Connection line */}
                {idx < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-primary to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                  />
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
