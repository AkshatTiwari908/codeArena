import jwt from "jsonwebtoken"

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" })
    }

    
    req.adminId = decoded.id
    next()

  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

export default adminAuth
