import express from "express"
import connectDB from "./connectDB/connectDB.js"
import authRoute from "./routes/auth-routes/auth-route.js"
const app = express()
app.use(express.json())
app.use('/auth/v1',authRoute)
const port = process.env.PORT
app.listen(port,()=>{
    connectDB()
    console.log(`Server Listening ${port}`)
    
})