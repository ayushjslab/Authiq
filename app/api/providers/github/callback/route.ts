import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import WebsiteUser from "@/models/websiteUsers.model";

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

    console.log("websiteId:", websiteId);
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
      login: userResponse.data.login,
      name: userResponse.data.name,
      email: primaryEmail,
      avatar_url: userResponse.data.avatar_url,
    };

    const resData = await WebsiteUser.create({
      website: websiteId,
      name: user.name,
      email: user.email,
      image: user.avatar_url,
    });

    console.log(resData);

    // Issue JWT
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    const res = NextResponse.redirect("http://localhost:3001");
    res.cookies.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return res;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "GitHub login failed" }, { status: 500 });
  }
}
