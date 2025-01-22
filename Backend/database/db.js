import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Add options to optimize connection
    const connection = await mongoose.connect(URI, {
      useNewUrlParser: true, // Prevents deprecated string parser warnings
      useUnifiedTopology: true, // Improves connection management
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if unable to connect
      maxPoolSize: 10, // Maintain up to 10 connections in  pool
    });

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
