"use client"

import { motion } from "framer-motion"
import { ProfileHeader } from "@/components/custom/dashboard/profile/profile-header"
import { WebsitesList } from "@/components/custom/dashboard/profile/website-list"

export default function SettingsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen to-muted/30">
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ProfileHeader />
        <WebsitesList />
      </motion.div>
    </div>
  )
}
