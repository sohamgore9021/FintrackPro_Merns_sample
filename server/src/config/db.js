import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};
