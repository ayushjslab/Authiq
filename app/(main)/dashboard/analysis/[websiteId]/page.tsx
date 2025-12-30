"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  Activity,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  Mail,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { IWebsite } from "@/models/website.model";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  lastLoginAt: string; // ISO string from DB
  createdAt: string;
}

export default function AnalyticsDashboard() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [users, setUsers] = useState<User[]>([]);

  const isActive = (lastLoginAt: string | Date) => {
    const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
    return new Date().getTime() - new Date(lastLoginAt).getTime() < TWO_DAYS;
  };

  const [websiteData, setWebsiteData] = useState<IWebsite>();

  const getLoginsPerDay = () => {
    const loginCounts: Record<string, number> = {};

    users.forEach((user) => {
      const d = new Date(user.lastLoginAt);

      const key = d.toISOString().split("T")[0];

      loginCounts[key] = (loginCounts[key] || 0) + 1;
    });

    return Object.entries(loginCounts)
      .map(([key, count]) => ({
        date: new Date(key).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        logins: count,
        sortKey: key,
      }))
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .map(({ date, logins }) => ({ date, logins }));
  };

  const loginsPerDay = useMemo(() => getLoginsPerDay(), [users]);

  const { websiteId } = useParams();

  const totalLogins = users.length;
  const todayLogins = users.filter(
    (user) =>
      new Date(user.lastLoginAt).toDateString() === new Date().toDateString()
  ).length;

  const getAvgLoginsPerDay = () => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      return d.toDateString();
    });

    let total = 0;
    last7Days.forEach((day) => {
      const count = users.filter(
        (user) => new Date(user.lastLoginAt).toDateString() === day
      ).length;
      total += count;
    });

    return (total / 7).toFixed(1);
  };

  const avgLoginsPerDay = getAvgLoginsPerDay();

  const fetchUsers = useMutation({
    mutationFn: async (websiteId: string) => {
      const res = await axios.get(`/api/website/${websiteId}/users/fetch`);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setUsers(data.users);
    },
  });

  const fetchWebsite = useMutation({
    mutationFn: async (websiteId: string) => {
      const res = await axios.get(`/api/website/${websiteId}/fetch`);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setWebsiteData(data.data);
    },
  });

  useEffect(() => {
    if (websiteId) {
      fetchWebsite.mutate(websiteId as string);
      fetchUsers.mutate(websiteId as string);
    }
  }, [websiteId]);

  return (
    <div className="min-h-screen bg-black text-rose-50">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
    relative
    border-b border-emerald-500/20
    bg-background/60
    backdrop-blur-2xl
    shadow-[0_10px_40px_-20px_rgba(16,185,129,0.35)]
  "
      >
       

        <div className="container mx-auto px-6 py-7">
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Advanced Analytics
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {websiteData?.name}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 text-sm text-emerald-400">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur">
                <Globe className="h-4 w-4 text-emerald-500" />
                <span className="hidden sm:inline font-medium">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Total Logins",
              value: totalLogins,
              subtitle: "Last 7 days",
              icon: Users,
            },
            {
              title: "Today's Logins",
              value: todayLogins,
              subtitle: "Active sessions",
              icon: Activity,
            },
            {
              title: "Avg Per Day",
              value: avgLoginsPerDay,
              subtitle: "Daily average",
              icon: TrendingUp,
            },
            {
              title: "Unique Users",
              value: users.length,
              subtitle: "Total registered",
              icon: Users,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card
                  className="
            group relative overflow-hidden rounded-2xl
            border border-emerald-500/25
            bg-card/60 backdrop-blur-xl
            
            hover:border-emerald-500/50
            transition-all
          "
                >
                  {/* Ambient gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">
                      {item.title}
                    </CardTitle>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                      <Icon className="h-4 w-4 text-emerald-500" />
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="text-4xl font-extrabold tracking-tight">
                      {item.value}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 w-full gap-8">
          {/* Area Chart */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          >
            <Card
              className="
        relative overflow-hidden rounded-2xl
        border border-emerald-500/25
        bg-card/60 backdrop-blur-2xl
      "
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-card/50" />

              <CardHeader className="relative z-10 space-y-1">
                <CardTitle className="text-xl font-bold">
                  Login Activity Trend
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Daily user login patterns
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <ChartContainer
                  config={{
                    logins: {
                      label: "Logins",
                      color: "rgb(16, 185, 129)", // emerald-500
                    },
                  }}
                  className="h-80 w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={loginsPerDay}>
                      <defs>
                        <linearGradient
                          id="emeraldArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(16,185,129)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(16,185,129)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(16,185,129,0.15)"
                      />

                      <XAxis
                        dataKey="date"
                        stroke="rgba(167,243,208,0.8)"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="rgba(167,243,208,0.8)"
                        style={{ fontSize: "12px" }}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.75)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(16,185,129,0.3)",
                          borderRadius: "12px",
                          color: "#ecfdf5",
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="logins"
                        stroke="rgb(16,185,129)"
                        strokeWidth={2.5}
                        fill="url(#emeraldArea)"
                        activeDot={{ r: 5 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          >
            <Card
              className="
        relative overflow-hidden rounded-2xl
        border border-emerald-500/25
        bg-card/60 backdrop-blur-2xl
      "
            >
              <div className="absolute inset-0 bg-card/50" />

              <CardHeader className="relative z-10 space-y-1">
                <CardTitle className="text-xl font-bold">
                  Daily Login Metrics
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  User engagement by day
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <ChartContainer
                  config={{
                    logins: {
                      label: "Logins",
                      color: "rgb(16, 185, 129)", // emerald-500
                    },
                  }}
                  className="h-80 w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={loginsPerDay}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(16,185,129,0.15)"
                      />

                      <XAxis
                        dataKey="date"
                        stroke="rgba(167,243,208,0.8)"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="rgba(167,243,208,0.8)"
                        style={{ fontSize: "12px" }}
                      />

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.75)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(16,185,129,0.3)",
                          borderRadius: "12px",
                          color: "#ecfdf5",
                        }}
                      />

                      <Bar
                        dataKey="logins"
                        fill="rgb(16,185,129)"
                        radius={[10, 10, 4, 4]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
          {/* Users Table */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <Card
              className="
      relative overflow-hidden rounded-2xl
      border border-emerald-500/25
      bg-card/60 backdrop-blur-2xl
    "
            >
              {/* subtle glow */}
              <div className="absolute inset-0 bg-card/50" />

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Recent User Logins
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Detailed login history and user activity
                    </CardDescription>
                  </div>

                  <Badge className="bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 px-3 py-1">
                    {users.length} Total
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                      <tr>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          User
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Email
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Login Date
                        </th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.5 + index * 0.04,
                            duration: 0.35,
                          }}
                          className="
                  group rounded-xl
                  bg-background/40
                  hover:bg-emerald-500/5
                  transition-colors
                "
                        >
                          {/* User */}
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              <Image
                                src={user.image}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover ring-2 ring-emerald-500/20"
                              />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  ID: {user._id}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5 text-emerald-500" />
                              {user.email}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                              {new Date(user.lastLoginAt).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-2">
                            <Badge
                              variant="outline"
                              className={
                                isActive(user.lastLoginAt)
                                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                                  : "border-muted bg-muted/40 text-muted-foreground"
                              }
                            >
                              {isActive(user.lastLoginAt)
                                ? "Active"
                                : "Inactive"}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
