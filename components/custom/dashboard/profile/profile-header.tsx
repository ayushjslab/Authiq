"use client"

import { motion } from "framer-motion"
import { Mail, Copy, Check } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function ProfileHeader() {
  const [copied, setCopied] = useState(false)
  const { data: session } = useSession()

  const copyEmail = () => {
    navigator.clipboard.writeText(session?.user?.email ?? "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-16 md:mb-24"
    >
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-10">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-3xl bg-emerald-500/30 blur-3xl opacity-60" />

          <motion.img
            src={
              session?.user?.image ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5-8t-5GC_F4ejPuUfiUrQt8jaTIy-E0MNSQ&s"
            }
            alt="Profile"
            className="
              relative w-40 h-40 md:w-48 md:h-48
              rounded-3xl object-cover
              border border-emerald-500/30
              shadow-xl
            "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260 }}
          />
        </motion.div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            {session?.user?.name}
          </motion.h1>

          {/* Email card */}
          <motion.button
            onClick={copyEmail}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="
              group flex items-center gap-3
              px-5 py-4 rounded-xl
              border border-emerald-500/30
              bg-emerald-500/5 backdrop-blur-xl
              hover:bg-emerald-500/10
              transition-all
              shadow-[0_10px_40px_-20px_rgba(16,185,129,0.6)]
            "
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>

            <span className="font-medium text-foreground truncate">
              {session?.user?.email}
            </span>

            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 ml-auto" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-emerald-400 transition-colors" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
