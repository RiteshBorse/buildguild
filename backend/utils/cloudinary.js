import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Image from "../models/image/image.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

cloudinary.config({
  cloud_name: "dyx5palzq",  
  api_key: "475368171827547",  
  api_secret: "pMZxsWVC8aZDuHhBxlURFYY3y5Y"  
});

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  console.log(req.file.path);

  const x = await cloudinary.uploader.upload(req.file.path);
  // console.log("Cloudinary Response:", x);

  const newImage = new Image({ Image_Url: x.secure_url });
  await newImage.save();
  console.log("Image URL saved to MongoDB");

  fs.unlink(req.file.path, (err) => {
    if (err) console.error("Error deleting local file:", err);
    else console.log("Local file deleted");
  });

  res.send({
    msg: "File uploaded successfully",
    your_url: { image_url: x.secure_url },
  });
});
