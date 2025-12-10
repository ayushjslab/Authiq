"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, RotateCcw, ExternalLink } from "lucide-react"
import { useState } from "react"

interface SuccessDisplayProps {
  data: {
    name: string
    url: string
    apiKey: string
  }
  onReset: () => void
}

export default function SuccessDisplay({ data, onReset }: SuccessDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  return (
    <motion.div className="w-full max-w-2xl" variants={containerVariants} initial="hidden" animate="visible">
      {/* Success animation background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.8 }}
      >
      </motion.div>

      <div className="relative z-10 space-y-6">
        {/* Success Icon */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <motion.div
            className="relative w-24 h-24 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-rose-500/20 border-2 border-rose-500"
              animate={{
                boxShadow: ["0 0 0 0 rgba(244, 114, 182, 0.4)", "0 0 0 20px rgba(244, 114, 182, 0)"],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <Check className="w-12 h-12 text-rose-500" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants}>
          <Card className="border border-rose-500/30 bg-card/50 backdrop-blur-xl shadow-2xl">
            <div className="p-8 space-y-6">
              {/* Success Message */}
              <motion.div className="text-center space-y-2" variants={itemVariants}>
                <h2 className="text-3xl font-bold text-foreground">Success! 🎉</h2>
                <p className="text-muted-foreground">Your website has been registered successfully</p>
              </motion.div>

              {/* Website Details */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Website Name */}
                  <motion.div
                    className="p-4 rounded-lg bg-secondary/30 border border-rose-500/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-xs font-semibold text-muted-foreground mb-1">WEBSITE NAME</p>
                    <p className="text-lg font-semibold text-foreground wrap-break-word">{data.name}</p>
                  </motion.div>

                  {/* Website URL */}
                  <motion.div
                    className="p-4 rounded-lg bg-secondary/30 border border-rose-500/20 flex items-center justify-between group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">WEBSITE URL</p>
                      <p className="text-lg font-semibold text-rose-500 break-all">{data.url}</p>
                    </div>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 p-2 hover:bg-rose-500/20 rounded-md transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-rose-500" />
                    </a>
                  </motion.div>
                </div>

                {/* API Key Section */}
                <motion.div className="space-y-3" variants={itemVariants}>
                  <div className="p-4 rounded-lg bg-linear-to-br from-rose-500/10 to-rose-500/5 border-2 border-rose-500/40">
                    <p className="text-xs font-bold text-rose-500 mb-3 uppercase tracking-widest">Your API Key</p>
                    <div className="flex items-center gap-3 bg-background/50 p-3 rounded-md border border-rose-500/20 group">
                      <code className="flex-1 text-sm font-mono text-foreground/80 break-all">{data.apiKey}</code>
                      <motion.button
                        onClick={copyToClipboard}
                        className="shrink-0 p-2 hover:bg-rose-500/20 rounded-md transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-rose-500" />
                        )}
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Keep this key safe. You'll need it for API requests.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4" variants={itemVariants}>
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="border-rose-500/30 hover:bg-rose-500/10 text-foreground flex items-center justify-center gap-2 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Add Another
                </Button>
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Button>
                </a>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
