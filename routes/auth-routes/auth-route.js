import express from 'express'
import {signup,verifyEmail,login,logout,forgetPassword,resetPassword} from '../../controllers/auth-controller/auth-controller.js'
const router = express.Router()

router.post('/signup',signup)
router.post('/verify-email',verifyEmail)
router.post('/login',login)
router.get('/logout',logout)
router.post('/forget-password',forgetPassword)
router.put('/reset-password/:token',resetPassword)
// Google Auth To be added 

router.post('/verify-phone',()=>{

})
export default router