import mongoose, { Types } from "mongoose";

const dailywagesSchema = new mongoose.Schema(
    {
        name :String,
        date : String,
        wages : String,
        working_hr :String,
        status : {type : String},

    }
)

export const DailyWages = mongoose.model("DailyWages", dailywagesSchema);