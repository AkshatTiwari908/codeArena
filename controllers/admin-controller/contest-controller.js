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
  const contest = await Contest.findByIdAnd(contestId)
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
 const contestId = req.body
 await Contest.findByIdAndDelete(contestId)
}
