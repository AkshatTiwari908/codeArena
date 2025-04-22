import User from "../../models/user-model.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import generateTokenAndSetCookies from "../../utils/generateTokenAndSetCookies.js"
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
} from "../../mailtrap/email.js"

export const signup = async (req, res) => {
  const { email, password, name, phone } = req.body
  try {
    if (!email || !password || !name || !phone) {
      throw new Error("All fields are required")
    }
    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exists" })
    }
    const hashedPassword = await bcryptjs.hash(password, 10)

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })

    await user.save()
    await sendVerificationEmail(email, verificationToken)

    res.status(201).json({
      success: true,
      message: "User Created successfully",
      user: Object.assign({}, user._doc, { password: undefined }),
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // token is not expired
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired verification code",
      })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined

    await user.save()
    await sendWelcomeEmail(user.email, user.name)

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: Object.assign({}, user._doc, { password: undefined }),
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" })
    }

    const isPasswordValid = bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid Password" })
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, message: "First verify your email" })
    }

    generateTokenAndSetCookies(res, user._id)

    user.lastLogin = new Date()
    await user.save()

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: Object.assign({}, user._doc, { password: undefined }),
    })
  } catch (error) {
    console.log("Error in login ", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie("jwToken")
  res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const forgetPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }

    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiresAt = resetTokenExpiresAt
    await user.save()

    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    })
  } catch (error) {
    console.log("Error in forgetPassword ", error)
    res.status(400).json({ success: false, message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()

    await sendResetSuccessEmail(user.email)
    res.status(200).json({ success: true, message: "Password reset successful" })
  } catch (error) {
    console.log("Error in resetPassword ", error)
    res.status(400).json({ success: false, message: error.message })
  }
}
 