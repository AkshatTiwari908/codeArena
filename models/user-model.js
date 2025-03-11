import mongoose from "mongoose";
const userSchema= new mongoose.Schema(
    {
        username: {type:String,Unique:true},
        name:String,
        email:String,
        password:String,
        contests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contest" }] 
    }
)
export default mongoose.model('User',userSchema)
