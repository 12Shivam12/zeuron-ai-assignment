import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const connectDatabase = async() => {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('database connected')
        })
        .catch((err) => {
            console.log(err);
        })
}

export default connectDatabase;