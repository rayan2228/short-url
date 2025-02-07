import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://citnode2401:PWsKbXqiDurGwHHK@cluster0.r7q0y.mongodb.net/shorturls?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
};
export {connectDb}