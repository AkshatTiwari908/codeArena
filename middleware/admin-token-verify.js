import jwt from "jsonwebtoken"

const adminAuth= (req,res,next)=>{
    try {
        const token = req.cookies.token
        console.log(token)
        if(!token){
            return res.status(403).json({message:"Token is required"})
        }
        const verified =jwt.verify(token,process.env.JWT_SECRET)
        if (verified.role !== "admin") return res.status(403).json({ error: "Unauthorized" })
        req.admin=verified       
        next()
    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }
}
export default adminAuth