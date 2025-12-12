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
    hidden: { opacity: 0, y: 20 },
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">My Websites</h2>
          <p className="text-muted-foreground">Manage and monitor your web properties</p>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your websites...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={titleVariants}>
          <h2 className="text-3xl font-bold text-foreground mb-2">My Websites</h2>
          <p className="text-muted-foreground">Manage and monitor your web properties</p>
        </motion.div>

        <motion.div
          variants={titleVariants}
          className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-lg bg-muted/20"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No websites yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Get started by adding your first website to monitor and manage your web properties.
          </p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={titleVariants} className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground">My Websites</h2>
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {data.length}
            </span>
          </div>
          <p className="text-muted-foreground">Manage and monitor your web properties</p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:gap-6">
        {data.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </motion.div>
  )
}
