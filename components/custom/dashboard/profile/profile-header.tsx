"use client"

import { motion } from "framer-motion"
import { Mail, Copy, Check } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function ProfileHeader() {
  const [copied, setCopied] = useState(false)

  const {data: session} = useSession();

  const copyEmail = () => {
    navigator.clipboard.writeText(session?.user?.email ?? "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  }

  return (
    <motion.div className="mb-16 md:mb-20" variants={profileVariants} initial="hidden" animate="visible">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Profile Image */}
        <motion.div className="relative" variants={imageVariants} initial="hidden" animate="visible">
          <div className="absolute inset-0 bg-linear-to-br from-accent to-accent/50 rounded-2xl blur-2xl opacity-60" />
          <motion.img
            src={session?.user?.image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-8t-5GC_F4ejPuUfiUrQt8jaTIy-E0MNSQ&s"}
            alt="Profile"
            className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border-2 border-accent/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Profile Info */}
        <motion.div
          className="flex-1"
          variants={profileVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {session?.user?.name}
          </motion.h1>

          {/* Email with Copy Button */}
          <motion.button
            onClick={copyEmail}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">{session?.user?.email}</span>
            {copied ? (
              <Check className="w-4 h-4 text-accent ml-auto" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-accent transition-colors" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
