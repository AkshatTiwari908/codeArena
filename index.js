import express from "express"
import connectDB from "./connectDB/connectDB.js"
import authRoute from "./routes/auth-routes/auth-route.js"
import adminContestRoute from "./routes/admin-routes/contest-route.js"
import contestProblemRoute from "./routes/admin-routes/problem-route.js"
import adminAuthRouth from "./routes/auth-routes/admin-auth-route.js"
import executeCodeRoute from "./routes/code-routes/code-execute-route.js"
import cors from "cors"

const app = express()
app.use(express.json())

const corsOptions = {
    origin: [
      'https://codearena-1jev.onrender.com',
      'http://localhost:5173',
      'http://170.70.0.87:5173',
      'http://192.168.137.1:5173'                   
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  app.use(cors(corsOptions))

app.use('/auth/v1',authRoute)
app.use('/contest',adminContestRoute)
app.use('/problem',contestProblemRoute)
app.use('/admin/auth',adminAuthRouth)
app.use('/code',executeCodeRoute)

const port = process.env.PORT
app.listen(port,()=>{
    connectDB()
    console.log(`Server Listening ${port}`)
    
})