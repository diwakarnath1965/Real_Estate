import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/database.js"
import userRoute from "./backend/routes/user.route.js"
import authRoute from "./backend/routes/auth.route.js"
dotenv.config()

const app = express()
dbConnect()

app.use(express.json())

app.use("/api/v1/user",userRoute)
app.use("/api/v1/auth",authRoute)


app.listen(process.env.PORT,()=>{
    console.log("App is listening on 4000");
})

