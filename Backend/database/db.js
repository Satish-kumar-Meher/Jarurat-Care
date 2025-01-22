import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Add options to optimize connection
    const connection = await mongoose.connect(URI);

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
