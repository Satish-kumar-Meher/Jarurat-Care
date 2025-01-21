
import Joi from "joi";

// Validation schema for user signup
export const SignUpSchema = Joi.object({
  // Username validation
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_-]+$/) // Allows only letters, numbers, underscores, and dashes
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.pattern.base": "Username can not contain spaces and symbols",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username must not be more than 255 characters",
      "any.required": "Username is required",
    }),

  // Email validation
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email address",
      "string.min": "Email must be at least 3 characters",
      "string.max": "Email must not be more than 255 characters",
      "any.required": "Email is required",
    }),

  // Password validation
  password: Joi.string()
    .trim()
    .min(7)
    .max(1024)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 7 characters",
      "string.max": "Password must not be more than 1024 characters",
      "any.required": "Password is required",
    }),

    // Role validation
  role: Joi.string()
  .valid("user", "admin") // Only allows 'user' or 'admin'
  .optional() // Make the role optional, as it can default to 'user'
  .messages({
    "string.base": "Role must be a string",
    "any.only": "Role must be either 'user' or 'admin'",
  }),
});



// Validation schema for the Resource model
export const ResourceSchema = Joi.object({
    // Title validation
    title: Joi.string()
      .trim()
      .min(1)
      .max(255)
      .required()
      .messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required and cannot be empty",
        "string.min": "Title must be at least 1 character",
        "string.max": "Title must not exceed 255 characters",
        "any.required": "Title is required",
      }),
  
    // Description validation
    description: Joi.string()
      .trim()
      .min(1)
      .max(1024)
      .required()
      .messages({
        "string.base": "Description must be a string",
        "string.empty": "Description is required and cannot be empty",
        "string.min": "Description must be at least 1 character",
        "string.max": "Description must not exceed 1024 characters",
        "any.required": "Description is required",
      }),
  
    // CreatedAt validation
    createdAt: Joi.date()
    .default(() => new Date()) 
    .messages({
      "date.base": "CreatedAt must be a valid date",
    }),
  });
