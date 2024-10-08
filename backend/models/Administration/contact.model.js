import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  effective_from: Date,
});

export const Contact = mongoose.model("Contact", contactSchema);
