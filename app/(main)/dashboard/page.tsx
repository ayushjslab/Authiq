import { MetricsGrid } from "@/components/custom/dashboard/metrics-grid";
import { WebsiteTable } from "@/components/custom/dashboard/website-table";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">

          <header className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Track performance, monitor metrics, and manage your websites — all in one place.
            </p>
          </header>

          <section className="rounded-2xl border bg-card shadow-sm p-6">
            <MetricsGrid />
          </section>

          <section className="rounded-2xl border bg-card shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Websites</h2>
              <p className="text-sm text-muted-foreground">
                Overview of all connected websites and their status.
              </p>
            </div>
            <WebsiteTable />
          </section>

        </div>
      </main>
    </div>
  );
}
