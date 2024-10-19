import mongoose from "mongoose";

const itemInfoSchema = new mongoose.Schema({
    code : {type:String},
    description: {type:String},
    unit: {type:String},
    quantity: {type:Number},
    rate: {type:Number},
    amount:{type:Number},
    terms: {type:String}
});


export const MItemInfo = mongoose.model(
    "MItemInfo",
    itemInfoSchema
  );