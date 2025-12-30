"use client"

import { motion } from "framer-motion"
import { MoreHorizontal, ExternalLink, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
]

export function WebsiteTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Active Websites</h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-card border-white/5 hover:bg-emerald-500/10 hover:text-emerald-500"
        >
          Add Website
        </Button>
      </div>
      <div className="rounded-xl border border-white/5 bg-card/30 backdrop-blur-md overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="w-[300px] text-muted-foreground font-medium">Domain</TableHead>
              <TableHead className="text-muted-foreground font-medium">Active Users</TableHead>
              <TableHead className="text-muted-foreground font-medium">Growth</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((site, i) => (
              <TableRow key={site.name} className="hover:bg-white/2 border-white/5 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {site.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {site.users}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <TrendingUp className="w-3 h-3" />
                    {site.growth}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      site.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {site.status}
                  </span>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
