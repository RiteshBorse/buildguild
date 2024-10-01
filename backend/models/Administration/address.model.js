import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
address :{
    Type : String,
    required : true
},
city: String,
state: String,
country: String,

postal_code: {
    Type: String,
    required : true
},

latitude:String
})

export const AdministrationAddress =("AdministrationAddres" , addressSchema);