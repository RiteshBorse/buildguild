import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    uploaded_on: { type: Date },
    size: { type: String },
    view: { type: String },
    action: { type: String },
    remark: { type: String },
    document_date: { type: Date },
    document_no: { type: String }
  });

  export const MAttachment = mongoose.model(
    "MAttachment",
    attachmentSchema
  );
  

  