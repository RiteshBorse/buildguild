import mongoose from "mongoose";

const administrationSchema = new mongoose.Schema(
    {
        main_info:{
             type : mongoose.Schema.Types.ObjectId,
             ref : "AdministrationInfo"
        },
        address:{
             type : mongoose.Schema.Types.ObjectId,
             ref : "AdministrationAddress"
        },
        contact:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "AdministrationContact"
        },
        attachment:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "AdministrationAttachment"
        },
        extra_info:{
             type : mongoose.Schema.Types.ObjectId,
            ref : "AdministrationExtraInfo "
        }

    }
)

export const Administration=mongoose.model("Administration" , administrationSchema)