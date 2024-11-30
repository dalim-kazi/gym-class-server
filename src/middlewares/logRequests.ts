import { Request, Response, NextFunction } from 'express';
import logger from '@/libs/logger';

// Middleware to log every request and response
const logRequests = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, body } = req;
    const startTime = Date.now();

    // Log the incoming request details
    logger.info(`Incoming Request: ${method} ${url}`);
    logger.info(`Request Body: ${JSON.stringify(body)}`);

    // Create a temporary variable to store the original send method
    const originalSend = res.send.bind(res); // Bind 'res' to the original send function

    // Override res.send to log response details
    res.send = function (data) {
        const responseTime = Date.now() - startTime;

        // Log response details
        logger.info(`Response Status: ${res.statusCode}`);
        logger.info(`Response Time: ${responseTime}ms`);
        // logger.info(`Response Body: ${data}`);

        // Call the original send function with the proper context (res) and data
        return originalSend(data); // Pass 'data' to the original 'send' function
    };

    next();
};

export default logRequests;
