import Website from "@/models/website.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const referer = req.headers.get("referer");

  if (!referer) {
    return NextResponse.json(
      { success: false, message: "Referer missing" },
      { status: 400 }
    );
  }

  let refererHost: string;
  try {
    refererHost = new URL(referer).hostname;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid referer" },
      { status: 400 }
    );
  }

  const url = new URL(req.url);
  const websiteId = url.searchParams.get("websiteId");

  if (!websiteId) {
    return NextResponse.json(
      { success: false, message: "websiteId missing" },
      { status: 400 }
    );
  }

  const website = await Website.findById(websiteId);

  if (!website?.websiteUrl) {
    return NextResponse.json(
      { success: false, message: "Website not found" },
      { status: 404 }
    );
  }

  const websiteHost = new URL(
    website.websiteUrl.startsWith("http")
      ? website.websiteUrl
      : `https://${website.websiteUrl}`
  ).hostname;

  const isAllowed =
    refererHost === websiteHost ||
    refererHost.endsWith(`.${websiteHost}`);

  if (!isAllowed) {
    return NextResponse.json(
      { success: false, message: "Wrong API or Hostname" },
      { status: 403 }
    );
  }

  // ---- Google OAuth ----
  const redirectUri = process.env.GOOGLE_REDIRECT_URI!;
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const scope = encodeURIComponent("openid email profile");
  const state = encodeURIComponent(req.url);

  const googleUrl =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&state=${state}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.redirect(googleUrl);
}
