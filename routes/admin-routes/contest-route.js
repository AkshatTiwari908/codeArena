import express from "express"
import adminAuth from "../../middleware/admin-token-verify.js"
import { createContest,updateContest,deleteContest,upcommingContest,heldContest } from "../../controllers/admin-controller/contest-controller.js"

const router = express.Router()
router.post('/create-contest',adminAuth,createContest)
router.put('/update-contest',adminAuth,updateContest)
router.delete('/delete-contest',adminAuth,deleteContest)
router.get('/upcomming-contest',adminAuth,upcommingContest)
router.get('/held-contest',adminAuth,heldContest)

export default router
