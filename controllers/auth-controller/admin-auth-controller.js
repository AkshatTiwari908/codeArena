import generateAdminTokenAndCookies from "../../utils/generateAdminTokenAndSetCookies.js"
import Admin from "../../models/admin-model.js"
import bcrypt from "bcrypt"

export const adminLogin= async(req,res)=>{
    try {
       const {email,password}= req.body
       const admin =await Admin.findOne({email})
       if(!admin){
           return res.status(404).json({message:'Admin not found'})
       }
       
       const isMatch = await bcrypt.compare(password,admin.password)
       if(!isMatch){
           return res.status(403).json({message:"Invalid credentials"})
       }
       generateAdminTokenAndCookies(res,admin._id)
       await admin.save()
       res.status(200).json({
           success: true,
           message: "Login successful"
       })
    } catch (error) {
       console.error(error);
       return res.status(500).json({ error: "Login error" })
    }
}

export const adminLogout = async(req,res)=>{
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "Logged out successfully" })
}