import { log } from "console";
import mongoose from "mongoose";


export async function connect() {
    try {
       mongoose.connect(process.env.MONGO_URI!) 
        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("MongoDB connected");
            
        })

        connection.on("connection",(err)=>{
           console.log("mongoDB connection error , please make sure bd is up to running" + err);
           process.exit()
        })
       
    } catch (error) {
        console.log(" Something went wrong in connecting to DB");
        console.log(error);
        
    }
}