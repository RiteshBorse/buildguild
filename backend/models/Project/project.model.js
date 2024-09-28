import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : String,
    location : String , 
    insights : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ProjectInsight"
    },
    sub_project : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubProject"
        }
    ]
})

export const Project = mongoose.model("Project" , projectSchema);