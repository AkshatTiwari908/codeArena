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
		language:{type:String,enum:['Java','C++','Python']},
		contestsParticipated : Number,
		rank :Number,
		contestNumber:Number,
		problemsSolved:Number,
        contests: [{ type: mongoose.Schema.Types.ObjectId,
			ref: "Contest",
			contestRank:Number,
			score:Number,
			timeTaken:String,
			problemsSolved:Number
		 }]
    }
)
export default mongoose.model('User',userSchema)
