// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox",
});

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("products[]");
  const userId = req.nextUrl.searchParams.get("userId");

  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const checkout = await polar.checkouts.create({
    products: [productId],
     metadata: {
      userId,
    },
    successUrl: `${req.nextUrl.origin}/success`,
  });

  return NextResponse.redirect(checkout.url);
}
