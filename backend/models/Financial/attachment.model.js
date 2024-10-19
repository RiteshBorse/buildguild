import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  uploaded_on: { type: Date },
  remark: { type: String },
  document_date: { type: Date },
  document_no: { type: String },
  display_file:{type:String}

});

export const FAttachment = mongoose.model("FAttachment", attachmentSchema);
