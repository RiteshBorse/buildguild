import mongoose from "mongoose";

const administrationinfoSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  type_info: {
    type: String,
  },
  segment: String,
  start_fin_year: String,
  description: String,
  belongs_to: String,
  zone: String,
  start_date: String,
});

export const AMainInfo = mongoose.model(
  "AMainInfo",
  administrationinfoSchema
);
