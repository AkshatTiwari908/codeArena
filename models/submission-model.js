import mongoose from "mongoose";
export const Submission=mongoose.Schema({
    constestId:new mongoose.Types.ObjectId(),
    problemId:new mongoose.Types.ObjectId(),
    userId:new mongoose.Types.ObjectId(),
    language:String,
    code:String,
    status:{type:String,enum:['Accepted','Runtime Error','Wrong Answer','Time Limit Exceded']},
    score: Number,
    submittedAt: Date
})