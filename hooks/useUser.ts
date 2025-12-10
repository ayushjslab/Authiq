import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { getUserFromJWT } from "./getUser"

export function useUser() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/get-user-id", {
          email: session?.user?.email,
        })

        const data = await getUserFromJWT();

        console.log(res.data, session)
        setUser(res.data)
      } catch (err: any) {
        setError(err?.response?.data?.error || "Failed to fetch user")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [status, session?.user?.email])

  return { user, loading, error }
}
