import mongoose from 'mongoose';

const changeHistorySchema = new mongoose.Schema({
  changed_by: { type: String },
  changed_time: { type: Date, default: Date.now },
  changed_section: {type: String}
})
export const FChangeHistory = mongoose.model("FChangeHistory",changeHistorySchema);