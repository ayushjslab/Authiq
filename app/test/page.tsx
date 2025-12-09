'use client'

export default function Profile() {
  const handleGitHubLogin = () => {
    window.open('/api/providers/github', '_self'); // redirects to GitHub login
  }

  const handleGoogleLogin = () => {
    window.open('/api/providers/google', '_self'); // redirects to Google login
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleGitHubLogin}>Sign in with GitHub</button>
    </div>
  )
}
