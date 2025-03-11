import mongoose  from "mongoose";
export const Contest= mongoose.Schema({
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    problems: [new mongoose.Types.ObjectId()], 
    leaderboard: [{
      userId: new mongoose.Types.ObjectId(),
      username: String,
      score: Number,
      submissions: Number
    }]
  })
  