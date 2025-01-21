import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: 
        {
         type: String,
          required: true
         },
    description: 
        { 
        type: String,
         required: true 
        },
    createdAt:
        {
         type: Date,
          default: Date.now()
        },
  });

  export const Resource =  mongoose.model("Resource", resourceSchema)
  