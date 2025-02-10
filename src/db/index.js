import mongoose from "mongoose";
import {DB_NAME} from './../constants.js'

const connectDB = async () => {
    console.log("HI");
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI2}`)
        console.log(`\nMOGODB COnnected !\n`)
    } catch (error) {
        console.log("MONGODB Connection Error ", process.env.MONGO_URI2, "\n", error);
        process.exit(1);
    }
}

export default connectDB
