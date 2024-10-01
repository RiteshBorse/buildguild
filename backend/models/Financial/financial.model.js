import mongoose from "mongoose";

const financialSchema = new mongoose.Schema(
    {
    receipt:
     {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Receipt"
    },
    
    withdraw: String 
    }
)

export const Financial = mongoose.model("Financial" , financialSchema);