
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN );
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw new Error('Database connection failed');
    }   
}