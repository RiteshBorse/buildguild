import mongoose from "mongoose";

const administrationinfoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  type_info: {
    type: String,
    required: true,
  },
  segment: String,
  start_fin_Year: String,
  description: String,
  belongs_to: String,
  zone: String,
  start_date: Date,
});

export const Information = mongoose.model(
  "Information",
  administrationinfoSchema
);
