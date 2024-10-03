import { z } from "zod";

export const addProject = z.object({
  name: z.string().min(4, { message: "Project name must have at least 4 characters" }),
  location: z.string().min(8, { message: "Location must have at least 8 characters" }),
  // displayImage: z
  //   .instanceof(File, { message: "Please upload a valid image file" }), // Validate as a File instance
  displayImage: z.string().optional(), 
});