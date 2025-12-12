"use client"

import { motion } from "framer-motion"
import { Sparkles, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white pt-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-1/4 top-0 size-96 rounded-full bg-rose-600/20 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 size-96 rounded-full bg-rose-600/20 blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Sparkle icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="size-16 text-rose-600" />
          </motion.div>
        </motion.div>

        {/* Heading with staggered animation */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-balance text-center text-6xl font-bold leading-tight md:text-8xl"
          >
            Something{" "}
            <span className="relative inline-block">
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="bg-linear-to-r from-rose-600 via-rose-500 to-rose-600 bg-size-[200%_100%] bg-clip-text text-transparent"
              >
                Amazing
              </motion.span>
            </span>
            <br />
            Is Coming
          </motion.h1>
        </div>

        {/* Subtitle with delay */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className="mb-12 max-w-xl text-balance text-center text-lg text-zinc-400 md:text-xl"
        >
          {"We're crafting something extraordinary. Join the waitlist to be the first to experience it."}
        </motion.p>

        {/* Countdown or progress indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.6,
          }}
          className="mb-12 flex gap-6"
        >
          {[
            { value: "24", label: "Days" },
            { value: "18", label: "Hours" },
            { value: "42", label: "Minutes" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8 + index * 0.1,
                duration: 0.5,
              }}
              className="flex flex-col items-center"
            >
              <div className="mb-2 flex size-20 items-center justify-center rounded-xl border border-rose-600/20 bg-rose-600/10 backdrop-blur-sm">
                <motion.span
                  key={item.value}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="text-3xl font-bold text-rose-600"
                >
                  {item.value}
                </motion.span>
              </div>
              <span className="text-sm text-zinc-500">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Email signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="w-full max-w-md"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-rose-600/20 bg-white/5 pl-10 text-white placeholder:text-zinc-500 focus-visible:border-rose-600 focus-visible:ring-rose-600/20"
              />
            </div>
            <Button className="bg-rose-600 text-white hover:bg-rose-700">Notify Me</Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 1,
        }}
        className="text-center text-sm text-zinc-600 mt-10 mb-10"
      >
        <p>© 2025 Authiq. All rights reserved.</p>
      </motion.footer>
    </main>
  )
}
