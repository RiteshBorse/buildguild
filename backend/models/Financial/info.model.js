import mongoose from "mongoose";

const financialinfoSchema = new mongoose.Schema(
    {
        business_unit : String,
        document_type : String,
        document_no : String,
        bank :  {
            type: String,
          
        },
        financial_year :  {
            type: String,
          
        },
        document_date :  {
            type: Date,
            
        },
        narration : String,
        status : {type : String , default : "Not Approved"}

    }
)

export const FMainInfo = mongoose.model("FMainInfo" , financialinfoSchema);