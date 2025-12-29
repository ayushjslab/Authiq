import { connectDB } from "@/lib/db";
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionCreated: async (payload) => {
    try {
        await connectDB();
        
    } catch (error) {
        console.log(error)
    }
  },
  onSubscriptionCanceled: async (payload) => {
    // Canceled - still active until period ends
  },
  onSubscriptionRevoked: async (payload) => {
    // Expired - remove access now
  },
});