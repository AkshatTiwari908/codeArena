import Contest  from "../../models/contest-model.js" 
 
 export const createContest  = async(req,res)=>{
    try{
      const {title,startTime,endTime,totalProblems,
        difficultyLevel}=req.body

        if (!title || !startTime || !endTime || !totalProblems || !difficultyLevel) {
          return res.status(400).json({ message: "All fields are required" })
        }

        const allowedLevels = ["Easy", "Medium", "Hard"]
        if (!allowedLevels.includes(difficultyLevel)) {
          return res.status(400).json({ message: "Difficulty level must be one of: Easy, Medium, Hard" })
        } 

        const start = new Date(startTime)
        const end = new Date(endTime)
        if (end <= start) {
          return res.status(400).json({ message: "End time must be greater than start time" })
        }

        const durationMs = end - start
        const durationSec = Math.floor(durationMs / 1000)
        const hours = Math.floor(durationSec / 3600).toString().padStart(2, '0')
        const minutes = Math.floor((durationSec % 3600) / 60).toString().padStart(2, '0')
        const seconds = (durationSec % 60).toString().padStart(2, '0')
        const duration = `${hours}:${minutes}:${seconds}`

        const newContest = new Contest({
          title,
          startTime,
          endTime,
          totalProblems,
          difficultyLevel,
          duration
        })
    
      await newContest.save()
      res.status(201).json({message:"New contest scheduled"})

    }catch(error){
      console.error(error)
      res.status(500).json({error:"Error in scheduling contest"})
    }

}

export const updateContest = async (req, res) => {
  try {
    const { contestId, title, startTime, endTime,totalProblems,
      difficultyLevel } = req.body

    if (!contestId) {
      return res.status(400).json({ message: "Contest ID is required" })
    }

    const contest = await Contest.findById(contestId)
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" })
    }

    const allowedLevels = ["Easy", "Medium", "Hard"]
        if (!allowedLevels.includes(difficultyLevel)) {
          return res.status(400).json({ message: "Difficulty level must be one of: Easy, Medium, Hard" })
        } 


    const start = new Date(startTime)
    const end = new Date(endTime)
    if (end <= start) {
      return res.status(400).json({ message: "End time must be greater than start time" })
    }

    const durationMs = end - start
    const durationSec = Math.floor(durationMs / 1000)
    const hours = Math.floor(durationSec / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((durationSec % 3600) / 60).toString().padStart(2, '0')
    const seconds = (durationSec % 60).toString().padStart(2, '0')
    const duration = `${hours}:${minutes}:${seconds}`

    const updatedContest = await Contest.findByIdAndUpdate(
      contestId,
      {
        title,
        startTime,
        endTime,
        duration,
        totalProblems,
        difficultyLevel,

      },
      { new: true } 
    )

    return res.status(200).json({ message: "Contest updated successfully", updatedContest })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error in updating contest" })
  }
}


export const deleteContest=async(req,res)=>{
 try{
 const {contestId} = req.body
 const contestDeleted = await Contest.findByIdAndDelete(contestId)
 if(!contestDeleted){
  return res.status(404).json({message:"Constest not found"})
 }
 return res.status(200).json({message:"Contest deleted successfully"})
}catch(error){
  console.log(error)
  return res.status(500).json({ error: "Error deleting contest" })
}
}

export const upcommingContest = async(req,res)=>{
      try {
        const currentTime = new Date()
        const contests= await Contest.find({startTime:{$gt:currentTime}}).sort({startTime:-1})
        return res.status(200).json(contests)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error fetching contests" })
      }
}

export const heldContest = async (req, res) => {
  try {
      const currentTime = new Date()
      const contests = await Contest.find({ endTime: { $lt: currentTime } }).sort({ endTime: -1 })

      return res.status(200).json(contests)
  } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Error fetching held contests" })
  }
}
