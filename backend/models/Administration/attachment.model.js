import mongoose from "mongoose";

const attachmentSchema = new mongoose.model({
logo:{
    type : String,
    required : true
},

qr_code : String
})

export const Attachment = mongoose.model("Attachment" , attachmentSchema);