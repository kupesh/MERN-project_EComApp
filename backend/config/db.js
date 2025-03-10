import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("Error: MONGO_URI is not defined"); // Added validation check
            process.exit(1);
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); // Fixed template literal & typo
    } catch (error) {
        console.error(`Error: ${error.message}`); // Fixed error message formatting
        process.exit(1);
    }
};
