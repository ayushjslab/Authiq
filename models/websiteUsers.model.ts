import { Schema, model, models, Types } from "mongoose";

export interface IWebsiteUser {
  website: Types.ObjectId;
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

const WebsiteUser =
  models.WebsiteUser || model<IWebsiteUser>("WebsiteUser", WebsiteUserSchema);

export default WebsiteUser;
