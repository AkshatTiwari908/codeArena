import jwt from "jsonwebtoken"
const generateAdminTokenAndCookies=(res,adminId)=>{
    const token = jwt.sign({ id: adminId, role: "admin" }, 
        process.env.JWT_SECRET, { expiresIn: "1h" })
    console.log(token) 
    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"None",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    return token   
 }

 export default generateAdminTokenAndCookies