"use client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UrlPreview } from "@/components/ui/link-preview"
import { getUserFromJWT } from "@/hooks/getUser"
import { motion, MotionConfig } from "framer-motion"
import { useState } from "react"
import { Check, Copy, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"

export type Website = {
  id: string
  url: string
  hostname: string
  secretKey: string
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
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 rounded-lg transition-colors"
      aria-label="Copy to clipboard"
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-muted" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-16"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-600/10 flex items-center justify-center">
        <Plus className="w-10 h-10 text-rose-600" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">No websites yet</h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Get started by adding your first website to track analytics and insights.
      </p>
      <button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Add Your First Website
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

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-background px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">Your Websites</h1>
            <p className="text-lg text-muted-foreground">Manage and monitor all your connected websites</p>
          </div>

          {isLoading && <LoadingSkeleton />}

          {!isLoading && !websites?.length && <EmptyState />}

          {!isLoading && websites && websites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {websites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-rose-600/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-muted">
                    <UrlPreview
                      url={site.url}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-xl font-bold text-foreground group-hover:text-rose-600 transition-colors line-clamp-1">
                        {site.hostname}
                      </h2>
                      <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground font-medium">URL</span>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-rose-600 transition-colors truncate"
                        >
                          {site.url}
                        </a>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground font-medium">Website ID</span>
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-foreground font-mono text-xs bg-muted px-2 py-1 rounded truncate flex-1">
                            {site.id}
                          </code>
                          <CopyButton text={site.id} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground font-medium">Secret Key</span>
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-foreground font-mono text-xs bg-muted px-2 py-1 rounded truncate flex-1">
                            {site.secretKey}
                          </code>
                          <CopyButton text={site.secretKey} />
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/analysis/${site.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                    >
                      View Analytics
                      <ExternalLink className="w-4 h-4" />
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
