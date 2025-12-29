// app/api/website/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Website from "@/models/website.model";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, userId, websiteUrl } = body;

    if (!name || !userId || !websiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.credit <= 0 && user.subscription === "free") {
      return NextResponse.json({ error: "Not enough credit" }, { status: 403 });
    }

    const newWebsite = await Website.create({
      name,
      user: userId,
      websiteUrl,
    });

    await User.findByIdAndUpdate(
      userId,
      [
        {
          $set: {
            credit: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$subscription", "free"] },
                    { $gt: ["$credit", 0] },
                  ],
                },
                { $subtract: ["$credit", 1] },
                "$credit",
              ],
            },
            websites: {
              $concatArrays: [{ $ifNull: ["$websites", []] }, [newWebsite._id]],
            },
          },
        },
      ],
      { new: true, updatePipeline: true }
    );

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
