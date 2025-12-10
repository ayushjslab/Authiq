"use client"

import { useState } from "react"
import AddWebsiteForm from "@/components/custom/dashboard/add-website/add-website-form"
import SuccessDisplay from "@/components/custom/dashboard/add-website/success-display"

export default function Page() {
  const [successData, setSuccessData] = useState<{
    name: string
    url: string
    apiKey: string
  } | null>(null)

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {successData ? (
          <SuccessDisplay data={successData} onReset={() => setSuccessData(null)} />
        ) : (
          <AddWebsiteForm onSuccess={setSuccessData} />
        )}
      </div>
    </main>
  )
}
