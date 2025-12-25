import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Website from "@/models/website.model";
import WebsiteUser from "@/models/websiteUsers.model";
import User from "@/models/user.model";
import { Types } from "mongoose";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ websiteId: string } > }
) {
  try {
    await connectDB();

    const { websiteId } = await params;
    const { userId } = await req.json();

    if (!websiteId || !userId) {
      return NextResponse.json(
        { success: false, message: "websiteId and userId are required" },
        { status: 400 }
      );
    }

    if (
      !Types.ObjectId.isValid(websiteId) ||
      !Types.ObjectId.isValid(userId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const website = await Website.findById(websiteId).select(
      "websiteUsers user"
    );

    if (!website) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    if (website.user.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    if (website.websiteUsers.length > 0) {
      await WebsiteUser.deleteMany({
        _id: { $in: website.websiteUsers },
      });
    }

    await Website.findByIdAndDelete(websiteId);

    await User.findByIdAndUpdate(userId, {
      $pull: { websites: websiteId },
      $inc: { credit: 1 },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Website and related users deleted successfully",
        deletedWebsiteId: websiteId,
        deletedWebsiteUsersCount: website.websiteUsers.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
