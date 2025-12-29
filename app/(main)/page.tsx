"use client";

import Navbar from "@/components/custom/hero/navbar";
import Hero from "@/components/custom/hero/hero";
import HowToUse from "@/components/custom/hero/how-to-use";
import Reviews from "@/components/custom/hero/reviews";
import Footer from "@/components/custom/hero/footer";
import PricingPage from "@/components/custom/hero/pricing-page";
import InstallTabs from "@/components/custom/hero/install-sdk";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <HowToUse />
      <section id="sdk" className="flex flex-col md:flex-row items-start md:items-center justify-around p-6 mt-10  rounded-3xl border border-emerald-500 shadow-md lg:mx-20 md:mx-15 mx-10">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold  mb-3">
            Install the Package
          </h1>
          <p className="text-emerald-400 leading-relaxed">
            Customize everything according to your needs and take full control
            in your hands. Authiq makes integration smooth, flexible, and
            developer-friendly.
          </p>
        </div>

        <InstallTabs />
      </section>
      <PricingPage />
      <Reviews />
      <Footer />
    </main>
  );
}
