import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Website from "@/models/website.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ websiteId: string } > }
) {
  try {
    const { websiteId } = await params;

    if (!websiteId) {
      return NextResponse.json(
        {
          success: false,
          message: "Website ID is required",
          data: null,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const website = await Website.findById(websiteId);

    if (!website) {
      return NextResponse.json(
        {
          success: false,
          message: "Website not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Website fetched successfully",
        data: website,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        data: null,
      },
      { status: 500 }
    );
  }
}
