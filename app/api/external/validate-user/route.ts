import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Website from "@/models/website.model";
import { connectDB } from "@/lib/db";

async function getAllowedOrigins(): Promise<string[]> {
  await connectDB();
  const websites = await Website.find({}, "websiteUrl");
  return websites.map((w) => w.websiteUrl.replace(/\/$/, ""));
}

function corsHeaders(
  origin: string,
  allowedOrigins: string[]
): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = await getAllowedOrigins();

  return NextResponse.json(
    {},
    { headers: corsHeaders(origin, allowedOrigins) }
  );
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const origin = request.headers.get("origin") || "";
    const allowedOrigins = await getAllowedOrigins();
    const headers = corsHeaders(origin, allowedOrigins);

    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    console.log("token --->> ", token);

    if (!token) {
      return NextResponse.json(
        { authenticated: false, session: null },
        { status: 401, headers }
      );
    }

    const website = await Website.findOne({ websiteUrl: origin });
    if (!website?.secretKey) {
      return NextResponse.json(
        { authenticated: false, session: null },
        { status: 401, headers }
      );
    }

    const payload = jwt.verify(token, website.secretKey);

    return NextResponse.json(
      {
        authenticated: true,
        session: payload,
      },
      { headers }
    );
  } catch (err) {
    return NextResponse.json(
      { authenticated: false, session: null },
      { status: 401 }
    );
  }
}
