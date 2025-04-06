import User from "../../models/user-model.js"
import Contest from "../../models/contest-model.js"

export const joinContest = async (req, res) => {
    try {
      const { contestId,userId } = req.body
     // const userId = req.user.id
  
      const user = await User.findById(userId)
      const contest = await Contest.findById(contestId)
  
      if (!user || !contest) {
        return res.status(404).json({ message: "User or Contest not found" })
      }
  
      
      const currentTime = new Date()
      if (currentTime >= contest.startTime) {
        return res.status(400).json({ message: "Contest has already started. Joining is closed." })
      }
  
     
      const alreadyJoined = user.contests.some(
        (c) => c.toString() === contestId
      )
      if (alreadyJoined) {
        return res.status(400).json({ message: "User already joined this contest" })
      }

      user.contests.push(contest._id)
      await user.save()
  
      contest.leaderboard.push({
        userId: user._id,
        username: user.username,
        score: 0,
        submissions: 0,
        rank: 0
      })
  
      await contest.save()
  
      return res.status(200).json({ message: "Successfully joined the contest" })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  export const seeProblems = async (req, res) => {
    try {
      const { contestId, userId } = req.body 
  
      if (!contestId || !userId) {
        return res.status(400).json({ message: "Contest ID and User ID are required" })
      }
  
      const contest = await Contest.findById(contestId).populate("problems")
      if (!contest) {
        return res.status(404).json({ message: "Contest not found" })
      }
  
      
      const now = new Date()
      if (now < new Date(contest.startTime)) {
        return res.status(403).json({ message: "Contest hasn't started yet" })
      }
  
      
      const isParticipant = contest.leaderboard.some(
        (entry) => entry.userId.toString() === userId
      )
  
      if (!isParticipant) {
        return res.status(403).json({ message: "You are not a participant in this contest" })
      }
  
      return res.status(200).json({ problems: contest.problems })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
  
  