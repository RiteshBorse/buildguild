import mongoose from "mongoose";

const attachmentSchema = new mongoose.model({
logo:{
    Type : Image,
    required : true
},

qr_code : Image
})

export const AdministrationAttachment = mongoose.model("AdministrationAttachment" , attachmentSchema)