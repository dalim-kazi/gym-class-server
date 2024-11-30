import mongoose from 'mongoose';
import envConfig from '@/configs/envConfig';
import logger from '@/libs/logger';

export default async function connectDB() {
    try {
        await mongoose.connect(envConfig.MONGODB_URI!);
        logger.info('Connected to MongoDB');
    } catch (err) {
        logger.error('Database Connection Error:', err);
        process.exit(1);
    }
}
