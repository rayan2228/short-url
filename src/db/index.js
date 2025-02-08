import mongoose from "mongoose";
import { DB_URL } from "../constants.js";
const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
};
export { connectDb };

