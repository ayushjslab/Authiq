"use client";

import { motion } from "framer-motion";
import { Website, WebsiteCard } from "./website-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUserFromJWT } from "@/hooks/getUser";

export function WebsitesList() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };
  const { data, isLoading } = useQuery({
    queryKey: ["websites"],
    queryFn: async () => {
      const user = await getUserFromJWT();
      const res = await axios.get(`/api/website/fetch?userId=${user?.id}`);
      return res.data.data as Website[];
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants}>
        <h2 className="text-3xl font-bold text-foreground mb-2">My Websites</h2>
        <p className="text-muted-foreground">
          Manage and monitor your web properties
        </p>
      </motion.div>

      <div className="grid gap-4 md:gap-6">
        {data?.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
      </div>
    </motion.div>
  );
}
