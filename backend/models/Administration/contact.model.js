import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
name :{
    Type: String,
    required :true
},
email :{
    Type: String,
    required :true,
    unique: true
},
contact_number :String,
mobile_number :{
    Type: String,
    required :true,
    unique:true
},
effective_from :{
    Type: Date,
},
})

export const AdministrationContact =("AdministrationContact",contactSchema);