"use client";

import { motion } from "framer-motion";
import { CreditCard, Globe, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiInfinity } from "react-icons/gi";

export function MetricsGrid({metricsData}:{metricsData: any}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
      >
        <Card className="bg-card/50 border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining Credits
            </CardTitle>
            <Zap className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {metricsData?.data?.userData?.subscription === "free" ? (
                `${metricsData?.data?.userData?.credit}/3`
              ) : (
                <GiInfinity className="h-8 w-8 text-bold" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.data?.userData?.subscription === "free" ? (
                <span>You have limited credits</span>
              ) : (
                <span>You have infinte credits</span>
              )}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
      >
        <Card className="bg-card/50 border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscription Plan
            </CardTitle>
            <Crown className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              <p>
                <span
                  className={`${
                    metricsData?.data?.userData?.subscription === "free"
                      ? "text-emerald-500"
                      : "text-yellow-500"
                  }`}
                >
                  {metricsData?.data?.userData?.subscription.toUpperCase()}
                </span>{" "}
                Tier
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.data?.userData?.subscription === "free" ? (
                <span>You have limited credits</span>
              ) : (
                <span>You have infinte credits</span>
              )}
            </p>
            
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
      >
        <Card className="bg-card/50 border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Added Websites
            </CardTitle>
            <Globe className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              <p>
                {metricsData?.data?.userData?.subscription === "free" ? (
                  <span>{metricsData?.data?.userData?.websites?.length}/3</span>
                ) : (
                  <span className="flex items-center gap-1">
                    {metricsData?.data?.userData?.websites?.length} /
                    <GiInfinity className="h-7 w-7" />
                  </span>
                )}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.data?.userData?.subscription === "free" ? (
                <span>
                  {metricsData?.data?.userData?.websites?.length - 3} slots
                  remaining
                </span>
              ) : (
                <span>Infinte slots remaining</span>
              )}
            </p>
            
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
      >
        <Card className="bg-card/50 border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Websites Users
            </CardTitle>
            <CreditCard className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">
              {metricsData?.data?.userData?.websites?.reduce(
                (total: number, website: any) => total + (website.websiteUsers?.length || 0),
                0
              ) || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all websites
            </p>
            
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
