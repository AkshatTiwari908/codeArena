import express from "express"
import connectDB from "./connectDB/connectDB.js"
const app = express()
app.use(express.json())
const port = process.env.PORT
app.listen(port,()=>{
    connectDB()
    console.log(`Server Listening ${port}`)
    
})