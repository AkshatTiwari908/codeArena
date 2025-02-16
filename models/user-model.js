import mongoose from "mongoose";
export const User= new mongoose.Schema(
    {
        username: {type:String,Unique:true},
        name:String,
        email:String,
        password:String,
        constests:[new mongoose.Types.ObjectId()]
    }
)
