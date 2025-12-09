import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  Website  from "@/models/website.model";

export async function PUT(
  req: Request,
  { params }: { params: { websiteId: string } }
) {
  try {
    await connectDB();

    const { websiteId } = await params;
    const body = await req.json();
    const { name, websiteUrl } = body;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (websiteUrl) updateData.websiteUrl = websiteUrl;

    const updatedWebsite = await Website.findByIdAndUpdate(
      websiteId,
      updateData,
      { new: true }
    );

    if (!updatedWebsite) {
      return NextResponse.json(
        { error: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Website updated successfully",
        website: updatedWebsite,
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
