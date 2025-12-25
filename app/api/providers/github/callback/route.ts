import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import WebsiteUser from "@/models/websiteUsers.model";
import Website from "@/models/website.model";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const stateParam = url.searchParams.get("state");

    if (!code || !stateParam) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const stateUrl = new URL(decodeURIComponent(stateParam));
    const websiteId = stateUrl.searchParams.get("websiteId");
    const redirectUrl = stateUrl.searchParams.get("redirectUrl");

    if (!websiteId || !redirectUrl) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI!,
      },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = tokenResponse.data;

    const { data: ghUser } = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { data: emails } = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const primaryEmail =
      emails.find((e: any) => e.primary && e.verified)?.email ||
      emails.find((e: any) => e.verified)?.email;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "GitHub email not available" },
        { status: 400 }
      );
    }

    const email = primaryEmail.toLowerCase();

    const websiteUser = await WebsiteUser.findOneAndUpdate(
      { website: websiteId, email },
      {
        $set: {
          lastLoginAt: new Date(),
          name: ghUser.name || ghUser.login,
          image: ghUser.avatar_url,
          emailVerified: true,
        },
        $setOnInsert: {
          provider: "github",
          providerId: ghUser.id.toString(),
          website: websiteId,
          email,
        },
      },
      { new: true, upsert: true }
    );

    const website = await Website.findById(websiteId)
      .select("secretKey")
      .lean();

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    await Website.findByIdAndUpdate(websiteId, {
      $addToSet: { websiteUsers: websiteUser._id },
    });

    const token = jwt.sign(
      {
        id: websiteUser._id,
        email: websiteUser.email,
        name: websiteUser.name,
        image: websiteUser.image,
        provider: "github",
        websiteId,
      },
      website.secretKey,
      { expiresIn: "4h" }
    );
    return NextResponse.redirect(`${redirectUrl}?token=${token}`);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "GitHub login failed" }, { status: 500 });
  }
}
