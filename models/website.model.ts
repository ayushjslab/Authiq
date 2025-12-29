import { Schema, model, models, Types, Document } from "mongoose";
import crypto from "crypto";

export interface IWebsite extends Document {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  isExpired: boolean;
  websiteUrl: string;
  secretKey: string;
  websiteUsers: Types.ObjectId[];
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
    isExpired: {
      type: Boolean,
      default: false
    },
    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },
    secretKey: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(32).toString("hex"),
    },
    websiteUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "WebsiteUser",
      },
    ],
  },
  { timestamps: true }
);

const Website = models.Website || model<IWebsite>("Website", WebsiteSchema);

export default Website;
