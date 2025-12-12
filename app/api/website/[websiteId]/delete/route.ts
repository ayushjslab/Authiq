import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Website from "@/models/website.model";
import WebsiteUser from "@/models/websiteUsers.model";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ websiteId: string } >}
) {
  try {
    await connectDB();

    const { websiteId } = await params;

    if (!websiteId) {
      return NextResponse.json(
        { success: false, message: "Website ID is required" },
        { status: 400 }
      );
    }

    const deletedWebsite = await Website.findByIdAndDelete(websiteId);

    if (!deletedWebsite) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    const deletedUsers = await WebsiteUser.deleteMany({
      website: websiteId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Website and all linked users deleted successfully",
        deletedWebsite,
        deletedUsersCount: deletedUsers.deletedCount,
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
