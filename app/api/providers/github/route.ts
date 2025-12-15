import Website from "@/models/website.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const referer = req.headers.get("referer");

  const match = referer?.match(/^https?:\/\/([^:/?#]+)(?::\d+)?/);

  console.log(match)

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

  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_REDIRECT_URI;
  const scope = "read:user user:email";
  const state = encodeURIComponent(req.url);

  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  const response = NextResponse.redirect(githubUrl);
  return response;
}
