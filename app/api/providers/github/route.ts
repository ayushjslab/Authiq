import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientApp = url.searchParams.get('websiteId') || 'default';

  console.log(clientApp)
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI;
  const scope = 'read:user user:email';
  const state = encodeURIComponent(req.url);

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  return NextResponse.redirect(githubUrl);
}
