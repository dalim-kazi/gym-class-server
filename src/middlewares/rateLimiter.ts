import { NextFunction, Request, Response } from 'express';
import rateLimit, { Options } from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 50,
    handler: (_req: Request, res: Response, _next: NextFunction, _options: Options) => {
        res.status(429).json({
            isSuccess: false,
            message: 'Too many requests! Try again later..'
        });
    }
});

export default rateLimiter;
