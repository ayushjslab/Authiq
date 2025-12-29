import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import Website from "@/models/website.model";
import { Webhooks } from "@polar-sh/nextjs";

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
          purchaseTime: new Date(),
        },
        { new: true }
      );

      console.log(user);
    } catch (error) {
      console.log("Subscription create error:", error);
    }
  },

  onSubscriptionCanceled: async () => {},
  onSubscriptionRevoked: async (payload) => {
    try {
      const userId = payload.data.metadata?.userId;

      if (!userId) {
        console.error("Missing userId in revoked webhook");
        return;
      }

      await connectDB();

      const user = await User.findById(userId).select("websites").lean();

      if (!user?.websites || user.websites.length === 0) return;

      const websitesToExpire = user.websites.slice(0, -3); 

      await Website.updateMany(
        { _id: { $in: websitesToExpire } },
        { $set: { isExpired: true } }
      );

      console.log(
        `Marked ${websitesToExpire.length} websites as expired for user ${userId}`
      );
    } catch (error) {
      console.error("Error in subscription revoked:", error);
    }
  },
});
