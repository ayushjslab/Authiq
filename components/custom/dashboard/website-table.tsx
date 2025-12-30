"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export interface Website {
  _id: string;
  name: string;
  isExpired: boolean;
  websiteUrl: string;
  websiteUsers: string[]; // user IDs (or populated later)
  updatedAt: string; // ISO date string
}


const websites = [
  {
    name: "euveka.vercel.app",
    users: "124,502",
    growth: "+12.5%",
    status: "Active",
    added: "Dec 12, 2025",
  },
  {
    name: "v0chat-ui.com",
    users: "89,230",
    growth: "+8.2%",
    status: "Active",
    added: "Nov 28, 2025",
  },
  {
    name: "portfolio-next.js",
    users: "12,400",
    growth: "+24.1%",
    status: "Maintenance",
    added: "Nov 15, 2025",
  },
  {
    name: "emerald-dash.ai",
    users: "45,210",
    growth: "+15.3%",
    status: "Active",
    added: "Oct 20, 2025",
  },
];

export function WebsiteTable({ metricsData }: { metricsData: any }) {
  const router = useRouter();
  function getDomainFromUrl(url: string): string {
    if (!url) return "";

    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/\?:#]+)/);

    return match ? match[1] : "";
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Active Websites
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/dashboard/add-website`)}
          className="bg-card border-white/5 hover:bg-emerald-500/10 hover:text-emerald-500"
        >
          Add Website
        </Button>
      </div>
      <div className="rounded-xl border border-white/5 bg-card/30 backdrop-blur-md overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="w-[300px] text-muted-foreground font-medium">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Domain
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Active Users
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metricsData?.data?.userData?.websites.map((site: Website, i: number) => (
              <TableRow
                key={i}
                className="hover:bg-white/2 border-white/5 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {site.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {getDomainFromUrl(site?.websiteUrl)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {site.websiteUsers?.length}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      !site?.isExpired
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {site?.isExpired ? "Expired" : "Active"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
