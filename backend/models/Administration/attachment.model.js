import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  logo: {
    type: String,
    
  },
  qr_code: String,
});

export const Attachment = mongoose.model("Attachment", attachmentSchema);
