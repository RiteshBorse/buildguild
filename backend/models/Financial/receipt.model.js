import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
    main_info: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "FinancialInfo"
    },
    attachments :{
        type: Image,
        required :true
    },
    change_history : [{
        
    }],
    approval_history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"ApprovalHistory"
         }
    ]
    


})
export const Receipt = mongoose.model("Receipt",receiptSchema);