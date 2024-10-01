import mongoose from "mongoose";

const financialinfoSchema = new mongoose.Schema(
    {
        business_unit : String,
        document_type : String,
        document_number : String,
        bank :  {
            type: String,
            required: true
        },
        financial_year :  {
            type: String,
            required: true
        },
        document_date :  {
            type: Date,
            required: true
        },
        narration : String

    }
)

export const Information = mongoose.model("Information" , financialinfoSchema);