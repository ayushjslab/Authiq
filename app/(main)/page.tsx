"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  )
}
