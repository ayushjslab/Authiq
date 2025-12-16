"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UrlPreview } from "@/components/ui/link-preview"
import { getUserFromJWT } from "@/hooks/getUser"
import { motion, MotionConfig } from "framer-motion"
import { useState } from "react"
import { Check, Copy, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { BsGraphUpArrow } from "react-icons/bs";
export type Website = {
  id: string
  websiteUrl: string
  name: string
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-lg
      bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-emerald-500/20 bg-card/50 backdrop-blur animate-pulse overflow-hidden"
        >
          <div className="h-48 bg-muted" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-10 bg-muted rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-24 relative"
    >
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-64 h-64 bg-emerald-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center backdrop-blur">
        <Plus className="w-10 h-10 text-emerald-500" />
      </div>

      <h2 className="text-3xl font-bold mb-3">No websites yet</h2>
      <p className="text-muted-foreground mb-8">
        Add your first website and start tracking analytics instantly.
      </p>

      <button
        onClick={() => router.push("/dashboard/add-website")}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
        bg-linear-to-r from-emerald-500 to-emerald-600
        hover:from-emerald-600 hover:to-emerald-700
        text-white font-medium shadow-lg shadow-emerald-500/30 transition"
      >
        <Plus className="w-4 h-4" />
        Add Website
      </button>
    </motion.div>
  )
}

export default function WebsitesPage() {
  const { data: websites, isLoading } = useQuery({
    queryKey: ["websites"],
    queryFn: async () => {
      const user = await getUserFromJWT()
      const res = await axios.get(`/api/website/fetch?userId=${user?.id}`)
      return res.data.data as Website[]
    },
  })

  console.log(websites)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Your Websites
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage and monitor all your connected properties
            </p>
          </div>

          {isLoading && <LoadingSkeleton />}
          {!isLoading && !websites?.length && <EmptyState />}

          {!isLoading && websites && websites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {websites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl border border-emerald-500/20
                  bg-card/50 backdrop-blur-xl overflow-hidden
                  shadow-[0_10px_40px_-15px_rgba(16,185,129,0.4)]
                  hover:border-emerald-500/50 transition-all"
                >
                  {/* Preview */}
                  <div className="relative h-48 overflow-hidden">
                    <UrlPreview
                      url={site.websiteUrl}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-xl font-bold truncate">
                        {site.name}
                      </h2>
                      <ExternalLink onClick={() => redirect(site.websiteUrl)} className="w-4 h-4 text-muted-foreground shrink-0 cursor-pointer" />
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground font-medium">URL</p>
                        <a
                          href={site.websiteUrl}
                          target="_blank"
                          className="text-emerald-500 hover:text-emerald-600 transition truncate"
                        >
                          {site.websiteUrl}
                        </a>
                      </div>

                      <div>
                        <p className="text-muted-foreground font-medium">Website ID</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs bg-muted px-2 py-1 rounded font-mono truncate">
                            {site.id}
                          </code>
                          <CopyButton text={site.id} />
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/analysis/${site.id}`}
                      className="flex items-center justify-center gap-2
                      rounded-xl py-2.5
                      bg-linear-to-r from-emerald-500 to-emerald-600
                      hover:from-emerald-600 hover:to-emerald-700
                      text-white font-medium shadow-lg shadow-emerald-500/30 transition"
                    >
                      View Analytics
                      <BsGraphUpArrow   className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  )
}
