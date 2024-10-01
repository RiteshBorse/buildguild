import mongoose from "mongoose";

const extrainfoSchema = new mongoose.Schema({
company_status:String,
cst_no:String,
pan_no:String,
registration_number:{
    Type: String,
    unique:true
},
gst_in:{
    Type: String,
    unique:true
},
gst_type : String,
gstin_reg_date : Date,
gstin_effective_date : Date,
rera_registration_no : String

})

export const AdministrationExtraInfo =("AdministrationExtraInfo",extrainfoSchema);