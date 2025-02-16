import mongoose from "mongoose";
export const Problem= mongoose.Schema({
    title:String,
    statement:String,
    inputFormat:String,
    outputFormat:String,
    sampleInput:String,
    sampleOutput:String,
    testCases:[{
        input:String,
        output:String
    }]
})
