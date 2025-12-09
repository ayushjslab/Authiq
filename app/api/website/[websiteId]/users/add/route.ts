import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  WebsiteUser  from "@/models/websiteUsers.model";

export async function POST(
  req: Request,
  { params }: { params: { websiteId: string } }
) {
  try {
    await connectDB();

    const { websiteId } = await params;
    const body = await req.json();
    const { name, email, image } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = await WebsiteUser.create({
      website: websiteId,
      name,
      email,
      image,
    });

    return NextResponse.json(
      {
        message: "Website user added successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
