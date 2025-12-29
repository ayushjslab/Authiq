import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { Webhooks } from "@polar-sh/nextjs";
import { redirect } from "next/navigation";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onCheckoutCreated: async (payload) => {
    console.log(payload.data.metadata);
  },
  onSubscriptionCreated: async (payload) => {
    try {
      await connectDB();

      const userId = payload.data.metadata?.userId;

      if (!userId) {
        console.error("Missing userId in webhook metadata");
        return;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          subscription: "pro",
        },
        { new: true }
      );

      console.log(user);
    } catch (error) {
      console.log("Subscription create error:", error);
    }
  },

  onSubscriptionCanceled: async (payload) => {},
  onSubscriptionRevoked: async (payload) => {
    // Expired - remove access now
  },
});
