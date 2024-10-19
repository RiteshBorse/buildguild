import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
    main_info: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FMainInfo"
    }],
    attachment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FAttachment"

    }],
    change_history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FChangeHistory"
    }],
    approval_history:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "FApprovalHistory"
        }]
})
export const Receipt = mongoose.model("Receipt", receiptSchema);