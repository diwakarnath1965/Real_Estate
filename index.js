import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import userRoute from "./backend/routes/user.route.js";
import authRoute from "./backend/routes/auth.route.js";
import listingRoute from "./backend/routes/listing.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
dbConnect();

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/listing",listingRoute)

app.listen(process.env.PORT, () => {
  console.log("App is listening on 4000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
