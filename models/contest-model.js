import mongoose  from "mongoose";
 const contestSchema= mongoose.Schema({
    title: String,
   
    startTime: {type:Date,Required:true},
    endTime: {type:Date,Required:true},
    totalProblems: Number,
    maxParticipants:Number,
    difficultyLevel:String,
    duration:String,
    problems: [{type: mongoose.Types.ObjectId,ref:"Problem"}], 
    leaderboard: [{
      userId:  mongoose.Types.ObjectId,
      username: String,
      score: Number,
      submissions: Number
    }],
  })
  export default mongoose.model("Contest", contestSchema)