import mongoose from "mongoose";

const materialsSchema = new mongoose.Schema({
  main_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MMainInfo",
  },
  item_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MItemInfo",
  },
  billing_term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MBillingTerm",
  },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MAttachment",
  },
  change_history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MChangeHistory",
  },
  approval_history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MApprovalhis",
  },
});

export const Materials = mongoose.model("Materials" , materialsSchema);