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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-rose-900/30 bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-rose-50">
                Advanced Analytics
              </h1>
              <p className="mt-1 text-rose-300/70">{websiteData?.name}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-rose-400">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">
                {websiteData?.redirectUrl}
              </span>
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
          className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-rose-100">
                  Total Logins
                </CardTitle>
                <Users className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rose-50">
                  {totalLogins}
                </div>
                <p className="mt-1 text-xs text-rose-400">Last 7 days</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-rose-100">
                  Today's Logins
                </CardTitle>
                <Activity className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rose-50">
                  {todayLogins}
                </div>
                <p className="mt-1 text-xs text-rose-400">Active sessions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-rose-100">
                  Avg Per Day
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rose-50">
                  {avgLoginsPerDay}
                </div>
                <p className="mt-1 text-xs text-rose-400">Daily average</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-rose-100">
                  Unique Users
                </CardTitle>
                <Users className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rose-50">
                  {users.length}
                </div>
                <p className="mt-1 text-xs text-rose-400">Total registered</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 w-full gap-6">
          {/* Area Chart - Logins Per Day */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader>
                <CardTitle className="text-rose-50">
                  Login Activity Trend
                </CardTitle>
                <CardDescription className="text-rose-400">
                  Daily user login patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    logins: {
                      label: "Logins",
                      color: "rgb(225, 29, 72)", // rose-600
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={loginsPerDay}>
                      <defs>
                        <linearGradient
                          id="colorLogins"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(225, 29, 72)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(225, 29, 72)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgb(225, 29, 72, 0.1)"
                      />
                      <XAxis
                        dataKey="date"
                        stroke="rgb(253, 164, 175)"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="rgb(253, 164, 175)"
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgb(0, 0, 0)",
                          border: "1px solid rgb(225, 29, 72, 0.3)",
                          borderRadius: "8px",
                          color: "rgb(253, 242, 248)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="logins"
                        stroke="rgb(225, 29, 72)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorLogins)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bar Chart - Logins Per Day */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
              <CardHeader>
                <CardTitle className="text-rose-50">
                  Daily Login Metrics
                </CardTitle>
                <CardDescription className="text-rose-400">
                  User engagement by day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    logins: {
                      label: "Logins",
                      color: "rgb(225, 29, 72)", // rose-600
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={loginsPerDay}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgb(225, 29, 72, 0.1)"
                      />
                      <XAxis
                        dataKey="date"
                        stroke="rgb(253, 164, 175)"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="rgb(253, 164, 175)"
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgb(0, 0, 0)",
                          border: "1px solid rgb(225, 29, 72, 0.3)",
                          borderRadius: "8px",
                          color: "rgb(253, 242, 248)",
                        }}
                      />
                      <Bar
                        dataKey="logins"
                        fill="rgb(225, 29, 72)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="border-rose-900/30 bg-linear-to-br from-rose-950/50 to-black">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-rose-50">
                    Recent User Logins
                  </CardTitle>
                  <CardDescription className="text-rose-400">
                    Detailed login history and user information
                  </CardDescription>
                </div>
                <Badge className="bg-rose-600 text-white hover:bg-rose-700">
                  {users.length} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-rose-900/30">
                      <th className="pb-3 text-left text-sm font-medium text-rose-300">
                        User
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-rose-300">
                        Email
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-rose-300">
                        Login Date
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-rose-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.05,
                          duration: 0.3,
                        }}
                        className="group border-b border-rose-900/20 transition-colors hover:bg-rose-950/30"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10">
                              <Image
                                src={user.image}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="object-cover w-full h-full rounded-full"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-rose-50">
                                {user.name}
                              </div>
                              <div className="text-xs text-rose-400">
                                ID: {user._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2 text-sm text-rose-300">
                            <Mail className="h-3 w-3 text-rose-500" />
                            {user.email}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2 text-sm text-rose-300">
                            <Calendar className="h-3 w-3 text-rose-500" />
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
                        <td className="py-4">
                          <Badge
                            variant="outline"
                            className={`border-${
                              isActive(user.lastLoginAt) ? "emerald" : "rose"
                            }-600 ${
                              isActive(user.lastLoginAt)
                                ? "bg-emerald-600/10 text-emerald-400"
                                : "bg-rose-600/10 text-rose-400"
                            }`}
                          >
                            {isActive(user.lastLoginAt) ? "Active" : "Inactive"}
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
  );
}
