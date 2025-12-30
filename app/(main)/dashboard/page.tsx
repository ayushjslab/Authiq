"use client";
import { MetricsGrid } from "@/components/custom/dashboard/metrics-grid";
import { WebsiteTable } from "@/components/custom/dashboard/website-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground animate-pulse">Loading…</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Track performance, monitor metrics, and manage your websites — all
              in one place.
            </p>
          </header>

          <section className="rounded-2xl border bg-card shadow-sm p-6">
            <MetricsGrid metricsData={metricsData} />
          </section>

          <section className="rounded-2xl border bg-card shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Websites</h2>
              <p className="text-sm text-muted-foreground">
                Overview of all connected websites and their status.
              </p>
            </div>
            <WebsiteTable metricsData={metricsData} />
          </section>
        </div>
      </main>
    </div>
  );
}
