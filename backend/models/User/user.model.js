import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    city: String,
    state: String,
    country: String,
    password: {
        type: String,
        required: true
    },
    otp : String,
    verified : {
        type : Boolean,
        default : false
    },
    projects : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Project"
        }
    ],
    position : {
        type : String,
    },
    profileImage : String
})

export const User = mongoose.model("User" , userSchema)