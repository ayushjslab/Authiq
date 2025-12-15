import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import WebsiteUser from "@/models/websiteUsers.model";
import Website from "@/models/website.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

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

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code missing" },
        { status: 400 }
      );
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const user = userResponse.data;
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
        provider: "google",
        providerId: user.sub,
        lastLoginAt: Date.now(),
        emailVerified: user.email_verified,
        name: user.name,
        email: user.email,
        image: user.picture,
      });
    }

    const website = await Website.findById(websiteId)
      .select("redirectUrl secretKey")
      .lean();
    if (!website?.redirectUrl) {
      return NextResponse.json(
        { error: "Redirect URL not found" },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      {
        id: user.sub,
        email: user.email,
        name: user.name,
        image: user.picture,
        provider: "google",
      },
      website.secretKey,
      { expiresIn: "2d" }
    );
    const res = NextResponse.redirect(website.redirectUrl);
    res.cookies.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 2 * 60 * 60 * 24,
    });
    return res;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "Google login failed" }, { status: 500 });
  }
}
