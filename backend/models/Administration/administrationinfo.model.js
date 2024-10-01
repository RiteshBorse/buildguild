import mongoose from "mongoose";

const administrationinfoSchema = new mongoose.Schema({
code:{
    Type : String,
    required :true
},
type:{
    Type : String,
    required :true
},
segment : String,
Start_Fin_Year : String,
Description : String,
belongs_to : String,
Zone : String,
start_date : Date

})

export const AdministrationInfo = mongoose.model("AdministrationInfo" , administrationinfoSchema);