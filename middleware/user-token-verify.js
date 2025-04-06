import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwToken 

        if (!token) {
            return res.status(403).json({ message: "Token is required" })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is missing in environment variables" })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" })
            }
            req.user = user
            next()
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export default userAuth
