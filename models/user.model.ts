import { Schema, Types, model, models } from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  image?: string;
  credit?: number;
  subscription?: string;
  websites?: Types.ObjectId[];
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    credit: { type: Number, default: 3 },
    subscription: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
    websites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Website",
      },
    ],
    image: { type: String },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
