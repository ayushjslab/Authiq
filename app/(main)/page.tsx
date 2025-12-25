"use client"

import Navbar from "@/components/custom/hero/navbar"
import Hero from "@/components/custom/hero/hero"
import HowToUse from "@/components/custom/hero/how-to-use"
import Reviews from "@/components/custom/hero/reviews"
import Footer from "@/components/custom/hero/footer"
import { useSession } from "next-auth/react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowToUse /> 
      <Reviews />
      <Footer />
    </main>
  )
}
