import express from "express"
import executeCode from "../../controllers/code-controller/code-controller.js"

const router = express.Router()

router.post('/execute',(req,res)=>{
    const {language,code}=req.body
    if(!code||!language){
        return res.status(400).json({message:"Missing code or language"})
    }
    executeCode(language,code,res)
})

export default router

