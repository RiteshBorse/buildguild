import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address_info: {
    type: String,
  },
  city: String,
  state: String,
  country: String,

  postal_code: {
    type: String,
  },

  location: String,
});

export const Address = mongoose.model("Address", addressSchema);
