import mongoose from "mongoose";
export const Submission=new mongoose.Schema({
    contestId: { type: mongoose.Types.ObjectId, ref: "Contest" },
    problemId: { type: mongoose.Types.ObjectId, ref: "Problem" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    language: { type: String, enum: ['cpp', 'java', 'python'], required: true },
    code: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Accepted', 'Runtime Error', 'Wrong Answer', 'Time Limit Exceeded', 'Compilation Error'], 
        default: 'Wrong Answer'
    },
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now }
})