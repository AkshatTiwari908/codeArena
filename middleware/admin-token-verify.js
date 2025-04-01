import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.token 
        console.log(token)

        if (!token) {
            return res.status(403).json({ message: "Token is required" }) 
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET) 
        
        req.user = verified  
        next() 
    } catch (error) {
        console.error(error) 
        return res.status(401).json({ error: "Invalid token" })
    }
}

export default userAuth
