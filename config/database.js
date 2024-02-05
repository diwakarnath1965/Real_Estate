import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log(`Database is connected to ${conn.connection.host}`);
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1)
    })
}

export default dbConnect;