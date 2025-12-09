import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  WebsiteUser  from "@/models/websiteUsers.model";

export async function GET(
  req: Request,
  { params }: { params: { websiteId: string } }
) {
  try {
    await connectDB();

    const { websiteId } = await params;

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await WebsiteUser.find({ website: websiteId })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await WebsiteUser.countDocuments({ website: websiteId });

    return NextResponse.json(
      {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
