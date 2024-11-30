import app from '@/app';
import envConfig from '@/configs/envConfig';
import connectDB from '@/db';
import logger from '@/libs/logger';

const port = envConfig.PORT || 5000;

// Database Connection
connectDB();

app.listen(port, () => {
    logger.info(`ERP Construction is running on port:${port}`);
});
