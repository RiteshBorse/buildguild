import mongoose from "mongoose";

const billingTermSchema = new mongoose.Schema({
  basic: { type: Number },
  igst: { type: Number },
  discount: { type: Number },
  round_of: { type: Number },
  gross: { type: Number },
  net: { type: Number }
  
  });

  export const MBillingTerm = mongoose.model(
    "MBillingTerm",
    billingTermSchema
  );
  

  