import mongoose from "mongoose";

const approvalhistorySchema = new mongoose.Schema(
    {
        approval_name : String,
        level : String,
        status : String,
        approval_date : Date,
        approval_time : String,
        remark : String,
        creater_name : String

})

export const ApprovalHistory = mongoose.model("ApprovalHistory" , approvalhistorySchema);