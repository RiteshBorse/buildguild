import mongoose from "mongoose";

const financialinfo = new mongoose.Schema(
    {
        business_unit : String,
        document_type : Image,
        document_number : String,
        bank : String,
        financial_year : Date,
        document_date : Date,
        narration : String

    }
)

export const FinancialInfo = mongoose.model("FinancialInfo" , financialinfo);