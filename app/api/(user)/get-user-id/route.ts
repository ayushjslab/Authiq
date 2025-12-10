import { connectDB } from "@/lib/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({email})

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}