import express from "express"
import adminAuth from "../../middleware/admin-token-verify.js"
import { adminLogin,adminLogout } from "../../controllers/auth-controller/admin-auth-controller.js"

const router = express.Router()
router.post('/admin-login',adminLogin)
router.get('/admin-logout',adminLogout)

export default router