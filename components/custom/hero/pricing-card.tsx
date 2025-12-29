"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPro?: boolean;
  index: number;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  isPro,
  index,
}: PricingCardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session?.user?.id) {
      router.push("/login");
    }
    const params = new URLSearchParams();
    params.append("products[]", process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID!);

    window.location.href = `/api/checkout?${params.toString()}`;
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col p-8 rounded-3xl border transition-all duration-300",
        isPro
          ? "bg-zinc-900/50 border-emerald-500/50 shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)] scale-105 z-10"
          : "bg-black border-white/10 hover:border-white/20"
      )}
    >
      {isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          {price !== "Free" && <span className="text-zinc-500">/month</span>}
        </div>
        <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <div
              className={cn(
                "mt-0.5 rounded-full p-0.5 shrink-0",
                isPro
                  ? "bg-emerald-500/20 text-emerald-500"
                  : "bg-white/10 text-white"
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </div>
            <span className="text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>

      <Button
        className={cn(
          "w-full py-6 rounded-xl font-semibold transition-all duration-300",
          isPro
            ? "bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/20"
            : "bg-white hover:bg-zinc-200 text-black"
        )}
        onClick={() => (isPro ? handleCheckout() : {})}
      >
        Get Started
      </Button>
    </motion.div>
  );
}
