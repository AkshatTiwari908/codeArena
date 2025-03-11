import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config('./.env')
const connectDB = async () => {
    try{   
       if(!process.env.MONGO_URI ){
        return console.log('Connection BD URI not found')
       }     
        const conn = await mongoose.connect(process.env.MONGO_URI) 
            
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(err){
        console.log("error to connect to db");
    }
};
export default connectDB