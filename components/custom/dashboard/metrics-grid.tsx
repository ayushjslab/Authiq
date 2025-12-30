"use client";

import { motion } from "framer-motion";
import { CreditCard, Globe, Zap, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GiInfinity } from "react-icons/gi";
const metrics = [
  {
    title: "Total API Requests",
    value: "1.2M",
    description: "Across all websites",
    icon: CreditCard,
    trend: "+12% vs last week",
    color: "text-emerald-500",
  },
];

export function MetricsGrid() {
  const { data: session } = useSession();

  const { data: metricsData, isLoading } = useQuery({
    queryKey: ["metricsData"],
    queryFn: async () => {
      return await axios.get(`/api/metrics?userId=${session?.user?.id}`);
    },
    enabled: !!session?.user?.id,
    staleTime: 20 * 1000,
  });

  console.log(metricsData?.data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="bg-card/50 border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                  {metric.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

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
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                updated at
              </span>
            </div>
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
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                Monthly Billing
              </span>
            </div>
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
                  <span className="flex items-center gap-1">{metricsData?.data?.userData?.websites?.length} {" "}/<GiInfinity className="h-7 w-7"/></span>
                )}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.data?.userData?.subscription === "free" ? (
                <span>{metricsData?.data?.userData?.websites?.length - 3} slots remaining</span>
              ) : (
                <span>Infinte slots remaining</span>
              )}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                Monthly Billing
              </span>
            </div>
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
                  <span className="flex items-center gap-1">{metricsData?.data?.userData?.websites?.length} {" "}/<GiInfinity className="h-7 w-7"/></span>
                )}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metricsData?.data?.userData?.subscription === "free" ? (
                <span>{metricsData?.data?.userData?.websites?.length - 3} slots remaining</span>
              ) : (
                <span>Infinte slots remaining</span>
              )}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                Monthly Billing
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
