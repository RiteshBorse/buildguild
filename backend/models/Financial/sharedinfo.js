import mongoose from 'mongoose';

const sharedinfoSchema = new mongoose.Schema({
    main_info: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FinancialInfo"
    },
    attachments :Image,
    change_history : String,
    approval_history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"ApprovalHistory"
         }
    ]
    


})
export const SharedInfo = mongoose.model("SharedInfo",sharedinfoSchema);