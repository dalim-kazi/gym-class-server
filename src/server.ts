import app from '@/app';
import envConfig from '@/configs/envConfig';
import connectDB from '@/db';
import logger from '@/libs/logger';

const port = envConfig.PORT || 5000;

// Database Connection
connectDB();
app.get('/', (req, res) => {
    res.send('Running server');
});
app.listen(port, () => {
    console.log(port);
    logger.info(`GYM CLASS is running on port:${port}`);
});
