import mongoose  from "mongoose";
 const contestSchema= mongoose.Schema({
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    problems: [{type:new mongoose.Types.ObjectId(),ref:"Problem"}], 
    leaderboard: [{
      userId: new mongoose.Types.ObjectId(),
      username: String,
      score: Number,
      submissions: Number
    }]
  })
  export const Contest = mongoose.model("Contest", contestSchema)