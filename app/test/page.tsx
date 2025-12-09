"use client"

import { useSession } from "next-auth/react"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>
  if (!session) return <p>Not logged in</p>

  return (
    <div>
      <h2>Hello {session.user?.name}</h2>
      <p>{session.user?.email}</p>
      <img src={session.user?.image || ""} width={50} />
    </div>
  )
}
