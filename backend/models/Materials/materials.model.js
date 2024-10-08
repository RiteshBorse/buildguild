import mongoose from "mongoose";

const materialsSchema = new mongoose.Schema({
  main_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainInfo",
  },
  item_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemInfo",
  },
  billing_term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BillingTerm",
  },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
  change_history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChangeHistory",
  },
  approval_history: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ApprovalHistory",
  },
});

export const Materials=mongoose.model("Materials" , materialsSchema);