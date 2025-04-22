import mongoose from "mongoose"

const problemSchema = new mongoose.Schema({
    contestId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Contest" 
    },
    title: { 
        type: String, 
        required: true 
    },
    statement: { 
        type: String, 
        required: true 
    },
    inputFormat: { 
        type: String, 
        required: true
    },
    outputFormat: { 
        type: String, 
        required: true 
    },
    sampleInput: { 
        type: String, 
        required: true 
    },
    sampleOutput: { 
        type: String, 
        required: true 
    },
    testCases: [{ 
        input: { 
            type: String, 
            required: true 
        },
        output: { 
            type: String, 
            required: true 
        }
    }]
});

export default mongoose.model("Problem", problemSchema)
