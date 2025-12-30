"use client";

import { motion } from "framer-motion";
import {
  LogOut,
  Mail,
  User,
  Calendar,
  Settings,
  Shield,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDate } from "@/lib/formate-date";

export default function AccountPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const { data: session, status } = useSession();

  const { data: accountData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await axios.get(`/api/account?userId=${session?.user.id}`);
    },
    enabled: !!session?.user?.id,
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground animate-pulse">
          Loading account…
        </span>
      </div>
    );
  }

  return (
    <div className=" text-white font-sans selection:bg-emerald-500/30">
      <main className="max-w-4xl mx-auto px-6 py-15">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <section className="flex flex-col md:flex-row items-center gap-8 border-b border-emerald-500/10 pb-12">
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <Avatar className="h-32 w-32 border-2 border-emerald-500/20 relative">
                <AvatarImage
                  src={session?.user.image || "/placeholder.svg"}
                  alt={session?.user.name || "profile"}
                />
                <AvatarFallback className="bg-emerald-950 text-emerald-500 text-5xl font-bold">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center md:text-left space-y-2"
            >
              <h1 className="text-4xl font-bold tracking-tight text-balance">
                {session?.user.name}
              </h1>
              <p className="text-emerald-500 font-mono text-sm tracking-wider uppercase">
                {accountData?.data?.userData?.subscription === "free"
                  ? "Free Member"
                  : "Premium Member"}
              </p>
            </motion.div>

              <div className="md:ml-auto">
              <Button
                variant="outline"
                onClick={() => signOut({callbackUrl: "/login"})}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </section>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors duration-500 group">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-500">
                    <User className="w-4 h-4" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-xs font-mono uppercase text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-lg font-medium">{session?.user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono uppercase text-muted-foreground">
                      Email Address
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-emerald-500/60" />
                      <p className="text-lg font-medium">
                        {session?.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors duration-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-emerald-500">
                    <Calendar className="w-4 h-4" /> Account Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-xs font-mono uppercase text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-lg font-medium">
                      {formatDate(accountData?.data?.userData?.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-mono uppercase text-muted-foreground">
                      Current Plan
                    </p>
                    <p className="text-lg font-medium text-emerald-400">
                      {accountData?.data?.userData?.subscription === "free"
                        ? "Free Plan"
                        : "Pro Plan"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
