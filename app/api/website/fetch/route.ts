import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import Website from "@/models/website.model"; 

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId)
      .select("websites")
      .populate({
        path: "websites",
        select: "name websiteUrl createdAt _id",
        options: { sort: { createdAt: -1 } },
      })
      .lean(); 

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user.websites,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
