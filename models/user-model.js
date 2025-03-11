import mongoose from "mongoose";
const userSchema= new mongoose.Schema(
    {
        username: {type:String,Unique:true},
        name:String,
        email:String,
        password:String,
        resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
        lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
        contests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contest" }] 
    }
)
export default mongoose.model('User',userSchema)
