"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, RotateCcw, ExternalLink } from "lucide-react";
import { useState } from "react";

interface SuccessDisplayProps {
  data: {
    name: string;
    url: string;
    apiKey: string;
  };
  onReset: () => void;
}

export default function SuccessDisplay({ data, onReset }: SuccessDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [secretCopied, setSecretCopied] = useState(false);

  const copyToClipboard = (key: string) => {
    if(key == "api"){
      navigator.clipboard.writeText(data.apiKey);
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
     setTimeout(() => setSecretCopied(false), 2000);
  };

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

return (
  <motion.div
    className="relative w-full max-w-3xl mx-auto"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >

    {/* Success Pulse */}
    <motion.div
      className="absolute inset-0 -z-10 opacity-30"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.15 }}
      transition={{ duration: 0.8 }}
    />

    <div className="relative z-10 space-y-10">
      {/* Success Icon */}
      <motion.div className="flex justify-center" variants={itemVariants}>
        <motion.div
          className="relative w-28 h-28 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500/20 border-2 border-emerald-500"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.45)",
                "0 0 0 28px rgba(16, 185, 129, 0)",
              ],
            }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <Check className="w-14 h-14 text-emerald-500" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Card */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-card/50 backdrop-blur-2xl">
          <div className="p-10 space-y-10">
            {/* Header */}
            <motion.div
              className="text-center space-y-3"
              variants={itemVariants}
            >
              <h2 className="text-4xl font-extrabold tracking-tight">
                Website Registered
              </h2>
              <p className="text-muted-foreground text-base">
                Everything is set up and ready to go 🚀
              </p>
            </motion.div>

            {/* Website Info */}
            <motion.div
              className="grid md:grid-cols-2 gap-5"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl p-5 bg-emerald-500/5 border border-emerald-500/20"
              >
                <p className="text-xs font-semibold text-muted-foreground mb-1 tracking-widest">
                  WEBSITE NAME
                </p>
                <p className="text-xl font-semibold">{data.name}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl p-5 bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between gap-4 group"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground mb-1 tracking-widest">
                    WEBSITE URL
                  </p>
                  <p className="text-lg font-semibold text-emerald-500 break-all">
                    {data.url}
                  </p>
                </div>

                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:bg-emerald-500/20 transition"
                >
                  <ExternalLink className="w-5 h-5 text-emerald-500" />
                </a>
              </motion.div>
            </motion.div>

            {/* Website ID */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/40 bg-linear-to-br from-emerald-500/15 to-emerald-600/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">
                  Your Website ID
                </p>

                <div className="flex items-center gap-3 bg-background/60 p-4 rounded-xl border border-emerald-500/20">
                  <code className="flex-1 font-mono text-sm break-all text-foreground/80">
                    {data.apiKey}
                  </code>

                  <motion.button
                    onClick={() => copyToClipboard("api")}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-emerald-500/20 transition"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-emerald-500" />
                    )}
                  </motion.button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  🔐 Keep this ID secure — it’s required for all authenticated
                  requests.
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="grid md:grid-cols-2 gap-4 pt-4"
              variants={itemVariants}
            >
              <Button
                onClick={onReset}
                variant="outline"
                className="h-12 rounded-xl border-emerald-500/30 hover:bg-emerald-500/10 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Add Another Website
              </Button>

              <a href={data.url} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-12 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white flex items-center gap-2">
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
);

}
