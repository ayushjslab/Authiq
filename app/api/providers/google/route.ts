import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientApp = url.searchParams.get('websiteId') || 'default';

  console.log(clientApp)

  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent('openid email profile');
  const state = encodeURIComponent(req.url); // optional, can pass client app info

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

  return NextResponse.redirect(googleUrl);
}
