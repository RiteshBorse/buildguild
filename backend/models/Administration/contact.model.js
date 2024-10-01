import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
name :{
    type: String,
    required :true
},
email :{
    type: String,
    required :true,
    unique: true
},
contact_number :String,
mobile_number :{
    type: String,
    required :true,
    unique:true
},
effective_from :{
    type: Date,
},
})

export const Contact = mongoose.model("Contact",contactSchema);