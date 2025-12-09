import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, image } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { success: false, message: "Name & email are required" },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, image });
    }

    return NextResponse.json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
