import mongoose from "mongoose";
export const Submission=mongoose.Schema({
    constestId: mongoose.Types.ObjectId,
    problemId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    language:String,
    code:String,
    status:{type:String,enum:['Accepted','Runtime Error','Wrong Answer','Time Limit Exceded']},
    score: Number,
    submittedAt: Date
})