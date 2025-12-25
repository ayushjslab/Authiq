import { Schema, model, models, Types } from "mongoose";

export interface IWebsiteUser {
  website: Types.ObjectId;
  providerId: string;
  provider: "google" | "github";
  emailVerified: boolean;
  lastLoginAt: Date;
  name: string;
  email: string;
  image?: string;
}

const WebsiteUserSchema = new Schema<IWebsiteUser>(
  {
    website: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "github"],
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

WebsiteUserSchema.index({ website: 1, email: 1 }, { unique: true });

const WebsiteUser =
  models.WebsiteUser || model<IWebsiteUser>("WebsiteUser", WebsiteUserSchema);

export default WebsiteUser;
