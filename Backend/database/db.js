import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI || "mongodb+srv://satishmeher:Satish853DB@jc-cluster1.glfmr.mongodb.net/?retryWrites=true&w=majority&appName=jc-cluster1";

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
