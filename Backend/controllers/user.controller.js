import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register Function
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        console.log(req.body)
        if (!username || !email || !password || !role) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        const userEmail = await User.findOne({ email});
        if (userEmail) {
            return res.status(401).json({
                message: "Email already exist ,try different email",
                success: false,
            });
        };
        const userName = await User.findOne({username});
        if (userName) {
            return res.status(401).json({
                message: "Username already exist ,try different username",
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

           //create a new user and save in database
    const newlyCreatedUser = new User({
        username,
        email,
        password: hashedPassword,
        role : role || "user",
      });
  
      await newlyCreatedUser.save();
  
      if (newlyCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User registered successfully!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Unable to register user! please try again.",
        });
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Some server error occured! Please try again",
            success: false,
        });

    }
}


// Login Function

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false,
            });
        };

    const accessToken = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );
  
      res.status(200).json({
        success: true,
        message: "Logged in successful",
        accessToken,
      });

    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Some error occured! Please try again",
        });
}
}