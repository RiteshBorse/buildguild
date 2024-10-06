import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Image from "../models/imageModel.js";
import asyncHandler from "express-async-handler";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  console.log("Uploaded file path:", req.file.path);

  const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
  console.log("Cloudinary Response:", cloudinaryResponse);

  const newImage = new Image({ Image_Url: cloudinaryResponse.secure_url });
  await newImage.save();
  console.log("Image URL saved to MongoDB");

  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error("Error deleting local file:", err);
    } else {
      console.log("Local file deleted successfully");
    }
  });

  res.send({
    message: "File uploaded successfully",
    imageUrl: { url: cloudinaryResponse.secure_url },
  });
});
