import { Contest } from "../../models/contest-model" 
 
 export const createContest  = async(req,res)=>{
    try{
      const {title,description,startTime,endTime}=req.body
      const newContest= new Contest({
          title:title,
          description:description,
          startTime:startTime,
          endTime:endTime, 
      })
      await newContest.save()
      res.status(201).json({message:"New contest scheduled"})

    }catch(error){
      console.error(error)
      res.status(500).json({error:"Error in scheduling contest"})
    }

}

export const updateContest=async(req,res)=>{
try{  const {contestId,title,description,startTime,endTime}= req.body
  const contest = await Contest.findByIdAndUpdate(contestId)
  contest.updateOne({
    title:title,
    description:description,
    startTime:startTime,
    endTime:endTime, 
})
}catch(error){
   
}
}

export const deleteContest=async(req,res)=>{
 try{
 const contestId = req.body
 const contestDeleted = await Contest.findByIdAndDelete(contestId)
 if(!contestDeleted){
  return res.status(404).json({message:"Constest not found"})
 }
 return res.status(200).json({message:"Contest deleted successfully"})
}catch(error){
  res.status(500).json({ error: "Error deleting contest" })
}
}

export const upcommingContest = async(req,res)=>{
      try {
        const currentTime = new Date()
        const contests= await Contest.find({startTime:{$gt:currentTime}}).sort({startTime:-1})
        return res.status(200).json(contests)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error fetching contests" });
      }
}