// models/Website.ts
import { Schema, model, models, Types, ObjectId, Document } from "mongoose";
import crypto from "crypto";

export interface IWebsite extends Document {
  createdAt: string;
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  websiteUrl: string;
  secretKey: string;
}

const WebsiteSchema = new Schema<IWebsite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    secretKey: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
  },
  { timestamps: true }
);

const Website = models.Website || model<IWebsite>("Website", WebsiteSchema);

export default Website;
