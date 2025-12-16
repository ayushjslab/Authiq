import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import WebsiteUser from "@/models/websiteUsers.model";
import Website from "@/models/website.model";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    const stateParam = url.searchParams.get("state");

    if (!stateParam) {
      return NextResponse.json({ error: "State missing" }, { status: 400 });
    }

    // Decode the state
    const stateUrl = new URL(decodeURIComponent(stateParam));
    // Get websiteId from query params
    const websiteId = stateUrl.searchParams.get("websiteId");
    const redirectUrl = stateUrl.searchParams.get("redirectUrl")

    console.log(redirectUrl)

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code missing" },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const emailsResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const primaryEmail = emailsResponse.data.find((e: any) => e.primary)?.email;

    const user = {
      id: userResponse.data.id,
      name: userResponse.data.name,
      email: primaryEmail,
      image: userResponse.data.avatar_url,
      provider: "github",
    };

    const existWebsiteUser = await WebsiteUser.findOne({
      website: websiteId,
      email: user.email,
    });

    if (existWebsiteUser) {
      existWebsiteUser.lastLoginAt = new Date();
      await existWebsiteUser.save();
    }

    if (!existWebsiteUser) {
      const resData = await WebsiteUser.create({
        website: websiteId,
        name: user.name,
        email: user.email,
        image: user.image,
        provider: "github",
        emailVerified: true,
        providerId: user.id,
        lastLoginAt: Date.now,
      });
    }

    const website = await Website.findById(websiteId)
      .select("secretKey websiteUrl")
      .lean();
    if (!redirectUrl) {
      return NextResponse.json(
        { error: "Redirect URL not found" },
        { status: 404 }
      );
    }
    const token = jwt.sign(user, website.secretKey, { expiresIn: "2d" });
    const res = NextResponse.redirect(`${redirectUrl}?token=${token}`);
    return res;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "GitHub login failed" }, { status: 500 });
  }
}
