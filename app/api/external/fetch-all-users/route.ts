// app/api/fetch/users/route.ts
import { NextResponse } from "next/server";
import WebsiteUser from "@/models/websiteUsers.model";
import Website from "@/models/website.model"; 
import { connectDB } from "@/lib/db";

async function getAllowedOrigins(): Promise<string[]> {
  await connectDB();
  const websites = await Website.find({});
  console.log(websites.map((w) => w.websiteUrl))
  return websites.map((w) => w.websiteUrl);
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = await getAllowedOrigins();

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const origin = request.headers.get("origin") || "";
    const allowedOrigins = await getAllowedOrigins();
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    };

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json(
        {
          success: false,
          message: "websiteId is required",
          data: null,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const users = await WebsiteUser.find({ website: websiteId });

    return NextResponse.json(
      {
        success: true,
        message: "Users fetched successfully",
        data: users,
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      },
      { status: 500, headers: {} }
    );
  }
}
