import mongoose from "mongoose";

const materialsInfoSchema = new mongoose.Schema({
    business_unit: { type: String },
    financial_year: { type: Date },
    document_type: { type: String },
    document_date: { type: Date },
    document_no: { type: String },
    supplier: { type: String },
    parent_account: { type: String },
    quotation_no: { type: String },
    quotation_date: { type: Date },
    party_ref_no: { type: String },
    rate_basis: { type: String },
    credit_period: { type: String },
    days_from: { type: Date },
    approval_note: { type: String },
    remark: { type: String },
  });

  export const MMainInfo = mongoose.model(
    "MMainInfo",
    materialsInfoSchema
  );
  

  