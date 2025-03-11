import express from "express"
import { createContest,updateContest } from "../../controllers/admin-controller.js/contest-controller"
const router = express.Router()
router.post('/create-contest',createContest)
router.put('/update-contest',updateContest)
router.get('/all-contest')
//Deleting Contest
//Get All contest sorted by startTime