import mongoose from "mongoose";
const problemSchema = mongoose.Schema({
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
export default mongoose.model("Problem",problemSchema)