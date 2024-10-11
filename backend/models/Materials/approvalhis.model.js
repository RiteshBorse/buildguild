import mongoose from "mongoose";

const approvalhisSchema = new mongoose.Schema({
    approved_by: { type: String },
    level: { type: String },
    status: { type: String },
    date: { type: Date },
    time: { type: String },
    remark: { type: String },
    created_by: { type: String }
    
  });

  export const MApprovalhis = mongoose.model(
    "MApprovalhis",
    approvalhisSchema
  );
  
