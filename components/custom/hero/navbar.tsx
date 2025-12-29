"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldHalf, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileButton from "@/components/shared/profile-button";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session} = useSession();

  const navItems = [
    { label: "Reviews", href: "#reviews" },
    { label: "Map", href: "#roadmap" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "SDK", href: "#sdk" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-xl glass-ruby ruby-shimmer"
          >
            <ShieldHalf className="text-primary-foreground" size={26} />
          </motion.div>
          <span className="font-semibold text-2xl tracking-wide text-primary transition-colors">
            Authiq
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-white/70 hover:text-primary transition-colors text-sm font-medium tracking-wide"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:block"
        >
          {session && session.user ? (
            <ProfileButton />
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="border-primary text-primary hover:bg-primary/30 hover:text-emerald-500  backdrop-blur-xl"
            >
              Sign In
            </Button>
          )}
        </motion.div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <Menu size={22} className="text-white" />
          )}
        </button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/80 text-base font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {session && session.user ? (
            <ProfileButton />
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="border-primary text-primary hover:bg-primary/30 hover:text-emerald-500 backdrop-blur-xl w-full"
            >
              Sign In
            </Button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
