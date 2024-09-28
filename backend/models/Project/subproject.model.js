import mongoose from "mongoose";
const subprojectSchema = new mongoose.Schema({
    name : String,
    fields : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ProjectInsight"
    }
})

export const SubProject = mongoose.model("SubProject" , subprojectSchema);