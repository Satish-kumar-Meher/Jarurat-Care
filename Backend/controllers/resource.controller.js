import { Resource } from "../models/resource.model.js";


// Create Resource Function
export const createResource = async (req, res) => {
    const { title, description } = req.body;
    try {
      const newResource = new Resource({ title, description });
      await newResource.save();
      res.status(201).json(newResource);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
// Fetching All Resources Function

  export const getAllResources = async (req, res) => {
    try {
      const resources = await Resource.find();
      res.status(200).json({
        success: true,
        message: "Resources fetch successfully",
        resources,
    });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred while fatching the resources",
          error: err.message,
        });
    }
  };
  
  // Fetching Resource by id Function
  export const getResourceById = async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      res.status(200).json({
        success: true,
        message: "Resource fetch successfully",
        resource,
    });
    } catch (err) {

        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred while fatching the resource",
          error: err.message,
        });
    }
  };
  
  // Update Resource by id Function
  export const updateResource = async (req, res) => {
    try {
      const { id } = req.params; // Extract resource ID from URL params
  
      // Check if the resource exists before trying to update it
      const existingResource = await Resource.findById(id);
      if (!existingResource) {
        return res.status(404).json({ success: false, message: "Resource not found" });
      }
  
      // Proceed with the update if the resource is found
      const updatedResource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
  
      // Respond with the updated resource
      return res.status(200).json({
        success: true,
        message: "Resource updated successfully",
        data: updatedResource,
      });
    } catch (err) {
      // Handle potential errors
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the resource",
        error: err.message,
      });
    }
  };
  

  // Delete resource By Id Function
  
  export const deleteResource = async (req, res) => {
    try {
      const { id } = req.params; // Extract resource ID from URL params
  
      // Check if the resource exists before attempting to delete
      const existingResource = await Resource.findById(id);
      if (!existingResource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }
  
      // Proceed with the deletion
      await Resource.findByIdAndDelete(id);
  
      // Respond with a success message after deletion
      return res.status(200).json({
        success: true,
        message: "Resource deleted successfully",
      });
    } catch (err) {
      // Handle potential errors
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the resource",
        error: err.message,
      });
    }
  };
  