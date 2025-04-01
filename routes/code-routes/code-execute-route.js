import express from "express"
import executeCode from "../../controllers/code-controller/code-controller.js"
import userAuth from "../../middleware/user-token-verify.js"
const router = express.Router()

router.post('/execute',userAuth,(req,res)=>{
    const {language,code}=req.body
    if(!code||!language){
        return res.status(400).json({message:"Missing code or language"})
    }
    executeCode(language,code,res)
})

export default router

