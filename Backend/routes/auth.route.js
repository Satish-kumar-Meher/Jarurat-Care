
import express from "express";
import { validate } from "../middlewares/validate-middleware.js"; // Validation middleware
import { SignUpSchema } from "../utils/validator.js"; // Joi schema for validation
import { login, register } from "../controllers/user.controller.js"; // User controller functions

const router = express.Router();

// POST /register - Validate request and register a new user
router.route("/register").post(validate(SignUpSchema), register);

// POST /login - Authenticate user and generate a token
router.route("/login").post(login);

export default router; // Export the router for use in the main app
