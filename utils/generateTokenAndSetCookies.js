import jwt from 'jsonwebtoken'
const generateTokenAndSetCookies = (res,userId)=>{
    const jwToken = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "3d"
    })
    console.log(jwToken)
    res.cookie("jwToken",jwToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"None",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })
    return jwToken;
}
export default generateTokenAndSetCookies