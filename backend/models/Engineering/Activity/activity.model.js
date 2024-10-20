import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    code: {
        type: String,
    },
    description: {
        type: String,
    },
    long_desc: {
        type: String,
    },
    uom: {
        type: String,
    },
    belongs_to: {
        type: String,
    },
    equip_activity: {
        type: String,
    },
});
export const Activity = mongoose.model("Activity", activitySchema);
