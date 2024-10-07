import mongoose from "mongoose";

const exploreSchema = new mongoose.Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

export const Explore = mongoose.model('Explore' , exploreSchema)