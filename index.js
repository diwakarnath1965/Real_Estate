import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/database.js"
dotenv.config()

const app = express()
dbConnect()


app.listen(process.env.PORT,()=>{
    console.log("App is listening on 4000");
})