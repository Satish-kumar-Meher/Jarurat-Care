
import express from "express";
import { validate } from "../middlewares/validate-middleware.js"; // Validation middleware
import { createResource, 
         deleteResource, 
        getAllResources, 
        getResourceById, 
        updateResource } 
    from "../controllers/resource.controller.js"; // Resource controller functions
import { authMiddleware } from "../middlewares/auth-middleware.js"; // Authentication middleware
import { isAdminUser } from "../middlewares/admin-middleware.js"; // Admin role check middleware
import { ResourceSchema } from "../utils/validator.js";

const router = express.Router();

// POST /create - Validate input, authenticate, check admin role, and create a resource
router.post('/create', validate(ResourceSchema), authMiddleware, isAdminUser, createResource);

// GET /all - Authenticate user and get all resources
router.get('/all', authMiddleware, getAllResources);

// GET /byId/:id - Authenticate user and get a resource by ID
router.get('/byId/:id', authMiddleware, getResourceById);

// PUT /update/:id - Authenticate, check admin role, and update a resource by ID
router.put('/update/:id', authMiddleware, isAdminUser, updateResource);

// DELETE /delete/:id - Authenticate, check admin role, and delete a resource by ID
router.delete('/delete/:id', authMiddleware, isAdminUser, deleteResource);

export default router; // Export the router for use in the main app
