import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Add options to optimize connection
    const connection = await mongoose.connect(URI, {
      useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
  socketTimeoutMS: 45000, // Increase to 45 seconds
  maxPoolSize: 10, // Limit connection pool size
    });

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
