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
      const { data: user } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const email = user.email.toLowerCase();

    const websiteUser = await WebsiteUser.findOneAndUpdate(
      {
        website: websiteId,
        email,
      },
      {
        $set: {
          lastLoginAt: new Date(),
          name: user.name,
          image: user.picture,
          emailVerified: user.email_verified,
        },
        $setOnInsert: {
          provider: "google",
          providerId: user.sub,
          website: websiteId,
          email,
        },
      },
      {
        new: true,
        upsert: true,
      }
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
        id: user.sub,
        email: user.email,
        name: user.name,
        image: user.picture,
        provider: "google",
      },
      website.secretKey,
      { expiresIn: "4h" }
    );
   return NextResponse.redirect(`${redirectUrl}?token=${token}`);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "Google login failed" }, { status: 500 });
  }
}
