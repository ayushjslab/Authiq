import Website from "@/models/website.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const referer = req.headers.get("referer");

  if (!referer) {
    return NextResponse.json(
      { success: false, message: "Referer not found" },
      { status: 400 }
    );
  }

  let refererHost: string;
  try {
    refererHost = new URL(referer).hostname;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid referer URL" },
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

  if (refererHost !== websiteHost) {
    return NextResponse.json(
      { success: false, message: "Wrong API or Hostname" },
      { status: 403 }
    );
  }

  // ---- OAuth redirect ----
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const redirectUri = process.env.GITHUB_REDIRECT_URI!;
  const scope = "read:user user:email";
  const state = encodeURIComponent(req.url);

  const githubUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${scope}` +
    `&state=${state}`;

  return NextResponse.redirect(githubUrl);
}
