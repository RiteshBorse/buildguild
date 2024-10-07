import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    displayImage: {
        type: String, 
    },
    insights: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectInsight"
    },
    published : {
        type : Boolean,
        default : false
    },
    sub_project: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubProject"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const Project = mongoose.model("Project", projectSchema);
