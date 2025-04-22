import Problem from '../../models/problems-model.js'
import Contest from '../../models/contest-model.js'


export const createProblemForContest = async (req, res) => {
    try {

        const { contestId, title,
            statement, inputFormat,
            outputFormat, sampleInput,
            sampleOutput, testCases } = req.body

        if (!contestId || !title || !statement || !inputFormat || !outputFormat || !sampleInput || !sampleOutput || !testCases) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ error: "Contest not found" });
        }

        if (!Array.isArray(testCases) || !testCases.every(testCase => testCase.input && testCase.output)) {
            return res.status(400).json({ error: "testCases must be an array of objects with 'input' and 'output' properties" });
        }

        const newProblem = new Problem({
            title,
            statement,
            inputFormat,
            outputFormat,
            sampleInput,
            sampleOutput,
            testCases,
        })
        await newProblem.save()
        await Contest.findByIdAndUpdate(contestId, { $push: { problems: newProblem._id } })
        return res.status(201).json({ message: "Problem added to contest successfully" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating problem" })
    }
}


export const updateProblem = async (req, res) => {
    try {
        const { problemId, title, statement, inputFormat, outputFormat, sampleInput, sampleOutput, testCases } = req.body

        const updatedProblem = await Problem.findByIdAndUpdate(problemId, {
            title,
            statement,
            inputFormat,
            outputFormat,
            sampleInput,
            sampleOutput,
            testCases,
        }, { new: true })

        if (!updatedProblem) {
            return res.status(404).json({ error: "Problem not found" })
        }

        res.status(200).json({ message: "Problem updated successfully", updatedProblem })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Error updating problem" })
    }
}

export const deleteProblem = async (req, res) => {
    try {
        const { contestId, problemId } = req.body
        const removeProblem = await Problem.findByIdAndDelete(problemId)
        if (!removeProblem) {
            return res.status(404).json({ message: 'Problem not found' })
        }
        await Contest.findByIdAndUpdate(contestId, { $pull: { problems: problemId } })
        return res.status(200).json({ message: 'Problem deleted successfully' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error deleting problem" })
    }
}

export const getAllProblems = async (req, res) => {
    try {
        const { contestId } = req.params
        const contest = await Contest.findById(contestId).populate("problems");

        if (!contest) {
            return res.status(404).json({ error: "Contest not found" });
        }

        return res.status(200).json({ problems: contest.problems });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error in getting problem" })
    }
}