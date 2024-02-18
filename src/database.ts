import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hubxcase?authSource=admin';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export const disconnectDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;