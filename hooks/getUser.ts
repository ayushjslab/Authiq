"use server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  name?: string;
}

export async function getUserFromJWT(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    if (!payload.id || !payload.email) return null; // extra safety
    return payload;
  } catch {
    return null;
  }
}
