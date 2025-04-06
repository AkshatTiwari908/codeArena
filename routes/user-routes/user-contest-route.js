import express from "express"
import userAuth from "../../middleware/user-token-verify.js"
import { joinContest,seeProblems } from "../../controllers/user-controller/user-contest-controller.js"

const router = express.Router()

router.post('/join-contest',joinContest)
router.get('/contest-problems',seeProblems)
export default router