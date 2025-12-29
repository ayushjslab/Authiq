// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox", 
});

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("products[]");
  
  if (!productId) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  const checkout = await polar.checkouts.create({
    products: [productId],
    successUrl: `${req.nextUrl.origin}/confirmation?checkout_id={CHECKOUT_ID}`,
  });

  return NextResponse.redirect(checkout.url);
}