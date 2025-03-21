import express from 'express'
import {createProblemForContest,updateProblem,deleteProblem,getAllProblems}from '../../controllers/admin-controller/problem-controller.js'

const router = express.Router()
router.post('/create-problem',createProblemForContest)
router.get('/all-problem/:contestId',getAllProblems)
router.put('/update-problem',updateProblem)
router.delete('/delete-problem',deleteProblem)

export default router