import mongoose  from "mongoose";
 const contestSchema= mongoose.Schema({
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    problems: [{type: mongoose.Types.ObjectId,ref:"Problem"}], 
    leaderboard: [{
      userId:  mongoose.Types.ObjectId,
      username: String,
      score: Number,
      submissions: Number
    }]
  })
  export default mongoose.model("Contest", contestSchema)