import mongoose from "mongoose";
const userSchema= new mongoose.Schema(
    {
        username: {type:String,Unique:true},
        name:String,
        email:String,
        password:String,
        constests:[new mongoose.Types.ObjectId()]
    }
)
export default mongoose.model('User',userSchema)
