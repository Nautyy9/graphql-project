import mongoose from 'mongoose';
import colors from "colors/safe"

export const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI!)

    console.log( colors.bgCyan(`MongoDb Connected to ${conn.connection.host}`));
}
