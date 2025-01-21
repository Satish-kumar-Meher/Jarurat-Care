
export const validate = (schema) => (req, res, next) => {
    // Validate the request body against the schema
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  
    if (error) {
      // Extract error details from Joi
      const status = 422;
      const message = "Validation error: Please fill the inputs correctly.";
      const extraDetails = error.details.map((err) => err.message).join(", ");
  
      // Construct the error response
      const validationError = {
        status,
        message,
        extraDetails,
      };
  
      console.error(validationError); // Log the error for debugging
      return res.status(status).json(validationError); // Respond with validation error
    }
  
    // If validation passes, update req.body with validated data (stripped of unknown fields)
    req.body = value;
    next();
  };