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
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId is required",
          data: null,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const user = await WebsiteUser.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          data: null,
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User fetched successfully",
        data: user,
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
