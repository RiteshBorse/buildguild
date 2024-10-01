import mongoose from "mongoose";

const approvalhistorySchema = new mongoose.Schema(
    {
        approval_name : {
            type: String,
            required: true
        },
        level : String,
        status :  {
            type: String,
            required: true
        },
        approval_date :  {
            type: Date,
            required: true
        },
        approval_time : String,
        remark :  {
            type: String,
            required: true
        },
        creater_name :  {
            type: String,
            required: true
        },

})

export const ApprovalHistory = mongoose.model("ApprovalHistory" , approvalhistorySchema);