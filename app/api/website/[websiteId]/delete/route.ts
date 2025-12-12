import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  Website  from "@/models/website.model";

export async function DELETE(
  req: Request,
  { params }: { params: { websiteId: string } }
) {
  try {
    await connectDB();

    const { websiteId } = await params;
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",websiteId)
    const deletedWebsite = await Website.findByIdAndDelete(websiteId);

    if (!deletedWebsite) {
      return NextResponse.json(
        { error: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Website deleted successfully",
        website: deletedWebsite,
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
