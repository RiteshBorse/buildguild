import mongoose from "mongoose";

const administrationSchema = new mongoose.Schema(
    {
        main_info:{
             type : mongoose.Schema.Types.ObjectId,
             ref : "Information"
        },
        address:{
             type : mongoose.Schema.Types.ObjectId,
             ref : "Address"
        },
        contact:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Contact"
        },
        attachment:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Attachment"
        },
        extra_info:{
             type : mongoose.Schema.Types.ObjectId,
             ref : "ExtraInfo "
        }

    }
)

export const Administration=mongoose.model("Administration" , administrationSchema);