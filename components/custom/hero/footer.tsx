"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Github, Linkedin, Twitter, ShieldHalf, Instagram } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Roadmap", href: "/#roadmap" },
    ],
    Developers: [
      { name: "Documentation", href: "/docs" },
      { name: "SDKs", href: "https://www.npmjs.com/package/authiq" },
      { name: "Code Examples", href: "#" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  }

  const socialLinks = [
    { icon: FaXTwitter, label: "Twitter", href: "https://x.com/ayushjslab" },
    { icon: Github, label: "GitHub", href: "https://github.com/ayushjslab/Authiq" },
    { icon: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/in/ayushjslab" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ayushjslab" },
  ]

  const router = useRouter();

  return (
    <footer className="relative border-t border-border bg-background/50 backdrop-blur">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 sm:p-12 rounded-2xl bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to simplify authentication?</h3>
          <p className="text-muted-foreground mb-6 text-lg">
            Join thousands of developers who've already made the switch to Authiq.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get Started Free
          </motion.button>
        </motion.div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <ShieldHalf className="text-primary-foreground" size={20} />
              </div>
              <span className="font-bold text-lg text-foreground">Authiq</span>
            </Link>
            <p className="text-sm text-muted-foreground">Making authentication simple and secure.</p>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (categoryIdx + 1) * 0.1 }}
            >
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© {currentYear} Authiq. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="text-muted-foreground hover:text-primary" size={18} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
