import mongoose from "mongoose";

const approvalhistorySchema = new mongoose.Schema(
    {
        approved_by: { type: String },
        status: { type: String, default: "Not Approved" },
        creation_date: { type: Date , default : Date.now },
        business_unit: { type: String },
        document_no: { type: String },
        created_by: { type: String },
      });

export const FApprovalHistory = mongoose.model("FApprovalHistory" , approvalhistorySchema);