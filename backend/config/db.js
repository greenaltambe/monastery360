import mongoose from "mongoose";
import logger from "../utils/logger.js";
import colors from "colors";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info(`MongoDB connected: ${colors.blue(process.env.MONGODB_URI)}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${colors.red(error.message)}`);
        process.exit(1);
    }
}

export default connectDB;