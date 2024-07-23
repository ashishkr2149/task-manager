import mongoose from "mongoose";
import { decrypt } from "./crypto.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(decrypt(process.env.MONGODB_URL));
    console.log(`Connected to Mongo DB ${connection.connection.host}`);
  } catch (err) {
    console.log(`Error connecting to MongoDB ${err}`);
  }
};

export default connectDB;
