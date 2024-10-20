import mongoose from "mongoose";

const changehisSchema = new mongoose.Schema({
    changed_by: { type: String },
    changed_time: { type: Date, default: Date.now },
    changed_section: {type: String}
  });

  export const EChangeHistory = mongoose.model(
    "EChangeHistory",
    changehisSchema
  );
  
