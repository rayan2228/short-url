import mongoose, { model, Schema } from "mongoose";
const userSchema = new Schema(
  {
    displayname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
