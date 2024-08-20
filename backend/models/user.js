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
    }
})

export const User = mongoose.model("Users" , userSchema)