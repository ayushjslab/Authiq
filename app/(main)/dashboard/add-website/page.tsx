"use client"

import { useState } from "react"
import AddWebsiteForm from "@/components/custom/dashboard/add-website/add-website-form"
import SuccessDisplay from "@/components/custom/dashboard/add-website/success-display"

export default function Page() {
  const [successData, setSuccessData] = useState<{
    name: string
    url: string
    apiKey: string
    secretKey: string
  } | null>(null)

  return (
    <main className="min-h-screen bg-background overflow-hidden relative">
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
