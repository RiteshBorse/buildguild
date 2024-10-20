import mongoose from "mongoose";

const engineeringSchema = new mongoose.Schema({
    activity : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Activity'
    }]
})

export const Engineering = mongoose.model('Engineering' , engineeringSchema)