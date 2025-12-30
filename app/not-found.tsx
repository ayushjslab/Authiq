"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-[600px] h-[600px] bg-emerald-500/20 blur-[180px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md px-6"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center 
                     rounded-3xl bg-emerald-500/15 border border-emerald-500/30 
                     backdrop-blur-xl shadow-lg"
        >
          <ShieldAlert className="h-10 w-10 text-emerald-400" />
        </motion.div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-linear-to-br from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back somewhere safe.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button
            asChild
            className="rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 
                       hover:from-emerald-600 hover:to-emerald-700 
                       text-white shadow-lg"
          >
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="rounded-xl border border-emerald-500/20 
                       hover:bg-emerald-500/10"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
