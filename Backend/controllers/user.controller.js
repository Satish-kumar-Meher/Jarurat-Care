import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Utility Function for Error Response
const errorResponse = (res, message, status = 400) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// Register Function
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate Input
    if (!username || !email || !password || !role) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Use single query to check for existing username or email
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "Username already exists";
      return errorResponse(res, message, 409);
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and Save New User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error in register:", error);
    return errorResponse(res, "Server error. Please try again later.", 500);
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Input
    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    // Find User by Email (Select only necessary fields)
    const user = await User.findOne({ email })
      .select("password role username")
      .lean();

    if (!user) return errorResponse(res, "Invalid email or password", 401);

    // Validate Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Generate JWT Token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    // Successful Login Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return errorResponse(res, "Server error. Please try again later.", 500);
  }
};
