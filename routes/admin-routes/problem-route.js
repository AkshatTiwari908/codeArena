import express from 'express'
import {createProblemForContest,updateProblem,deleteProblem,getAllProblems}from '../../controllers/admin-controller/problem-controller.js'
import adminAuth from '../../middleware/admin-token-verify.js'
const router = express.Router()
router.post('/create-problem',adminAuth,createProblemForContest)
router.get('/all-problem/:contestId',adminAuth,getAllProblems)
router.put('/update-problem',adminAuth,updateProblem)
router.delete('/delete-problem',adminAuth,deleteProblem)

export default router