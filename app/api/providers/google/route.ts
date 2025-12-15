import Website from '@/models/website.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const referer = req.headers.get("referer");

  const match = referer?.match(/^https?:\/\/([^:/?#]+)(?::\d+)?/);

  if (!match) {
    return NextResponse.json({success: false, message: "Hostname not correct"}, {status: 500})
  }
  const hostname = match[1];

  const url = new URL(req.url);
  const websiteId = url.searchParams.get("websiteId");

  console.log(hostname, websiteId)

  const website = await Website.findOne({
      _id: websiteId,
      websiteUrl: hostname,
    });

    if(!website) {
      return NextResponse.json({
        success: false, message: "Wrong API or Hostname"
      })
    }

  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent('openid email profile');
  const state = encodeURIComponent(req.url);

  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;

  return NextResponse.redirect(googleUrl);
}
