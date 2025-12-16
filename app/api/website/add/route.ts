// app/api/website/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Website from "@/models/website.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, userId, websiteUrl } = body;

    console.log(name, userId, websiteUrl);

    if (!name || !userId || !websiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newWebsite = await Website.create({
      name,
      user: userId,
      websiteUrl,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Website created successfully",
        website: newWebsite,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
