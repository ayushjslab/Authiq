import Website, { IWebsite } from "@/models/website.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { message: "Missing userId", success: false },
        { status: 400 }
      );
    }

    // .find() returns an array
    const websites = await Website.find({ user: userId });

    return NextResponse.json({
      success: true,
      data: websites.map((w) => ({
        id: w._id.toString(),
        name: w.name,
        websiteUrl: w.websiteUrl,
        createdAt: new Date(w.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
