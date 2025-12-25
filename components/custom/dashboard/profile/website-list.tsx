"use client"

import { motion } from "framer-motion"
import { type Website, WebsiteCard } from "./website-card"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getUserFromJWT } from "@/hooks/getUser"
import { Globe, Loader2 } from "lucide-react"

export function WebsitesList() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  const { data, isLoading } = useQuery({
    queryKey: ["websites"],
    queryFn: async () => {
      const user = await getUserFromJWT()
      const res = await axios.get(`/api/website/fetch?userId=${user?.id}`)
      return res.data.data as Website[]
    },
  })

  /* ───────────────────────── Loading ───────────────────────── */
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">My Websites</h2>
          <p className="text-muted-foreground">
            Manage and monitor your web properties
          </p>
        </div>

        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground">
              Loading your websites…
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ───────────────────────── Empty ───────────────────────── */
  if (!data || data.length === 0) {
    return (
      <motion.div
        className="space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={titleVariants}>
          <h2 className="text-4xl font-bold tracking-tight">My Websites</h2>
          <p className="text-muted-foreground">
            Manage and monitor your web properties
          </p>
        </motion.div>

        <motion.div
          variants={titleVariants}
          className="
            relative overflow-hidden rounded-2xl
            border border-emerald-500/30
            bg-linear-to-br from-emerald-500/10 via-transparent to-transparent
            px-6 py-20 text-center
          "
        >
          {/* glow */}
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl opacity-30" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/15">
              <Globe className="h-9 w-9 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              No websites yet
            </h3>
            <p className="max-w-md text-muted-foreground">
              Add your first website to unlock analytics, tracking, and insights.
            </p>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  /* ───────────────────────── List ───────────────────────── */
  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        variants={titleVariants}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-bold tracking-tight">
              My Websites
            </h2>

            <span
              className="
                inline-flex items-center justify-center
                rounded-full px-4 py-1.5 text-sm font-semibold
                bg-emerald-500/10 text-emerald-400
              "
            >
              {data.length}
            </span>
          </div>

          <p className="text-muted-foreground">
            Manage and monitor your web properties
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {data.map((website) => (
          <WebsiteCard key={website._id} website={website} />
        ))}
      </div>
    </motion.div>
  )
}
