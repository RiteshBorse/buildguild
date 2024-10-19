import mongoose from "mongoose";

const approvalhisSchema = new mongoose.Schema({
  code: { type: String },
  description: { type: String },
  amount:{type:Number},
  created_by:{type :String},
  approved_by: { type :String},
  approval_date: {type: String},
});

export const MApprovalHistory = mongoose.model(
  "MApprovalHistory",
  approvalhisSchema
);
