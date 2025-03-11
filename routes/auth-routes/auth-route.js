import express from 'express'
import {signup,verifyEmail,login,logout,forgetPassword,resetPassword} from '../controllers/disciple-auth-controller'
const router = express.Router()

router.post('/signup',signup)
router.post('/verify-email',verifyEmail)
router.post('/login',login)
router.post('/logout',logout)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)
// Google Auth To be added 

router.post('/verify-phone',()=>{

})