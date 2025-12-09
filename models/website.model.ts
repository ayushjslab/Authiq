// models/Website.ts
import { Schema, model, models, Types } from "mongoose";

export interface IWebsite {
  user: Types.ObjectId;
  name: string;
  websiteUrl: string;
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
  },
  { timestamps: true }
);

const Website =
  models.Website || model<IWebsite>("Website", WebsiteSchema);

  export default Website