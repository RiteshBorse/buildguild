import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    uploaded_on: { type: Date },
    remark: { type: String },
    document_date: { type: Date },
    document_no: { type: String }
   // document : { type: String}
  });

  export const MAttachment = mongoose.model(
    "MAttachment",
    attachmentSchema
  );
  

  