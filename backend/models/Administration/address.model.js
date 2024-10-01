import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  country: String,

  postal_code: {
    type: String,
    required: true,
  },

  latitude: String,
});

export const Address = mongoose.model("Address", addressSchema);
