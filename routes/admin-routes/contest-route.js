import express from "express"
import { createContest,updateContest,deleteContest,upcommingContest } from "../../controllers/admin-controller/contest-controller.js"

const router = express.Router()
router.post('/create-contest',createContest)
router.put('/update-contest',updateContest)
router.delete('/delete-contest',deleteContest)
router.get('/upcomming-contest',upcommingContest)

export default router
