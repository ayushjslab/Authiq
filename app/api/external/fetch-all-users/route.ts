// app/api/fetch/users/route.ts
import { NextResponse } from "next/server";
import WebsiteUser from "@/models/websiteUsers.model";
import { connectDB } from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    await connectDB();
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
      { status: 500, headers: corsHeaders }
    );
  }
}