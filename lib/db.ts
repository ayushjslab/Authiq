import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in environment variables");
}

// Type-safe global cached object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Allow global mongoose cache in Next.js
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "authiq",
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
