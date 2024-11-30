import logger from '@/libs/logger';
import { NextFunction, Request, Response } from 'express';

interface Error {
    statusCode?: number;
    status?: number;
    message?: string;
}

export default function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    logger.error(error?.message);

    const status = error?.statusCode || error?.status || 500;
    const message = error?.message || 'Internal Server Error';

    res.status(status).json({
        isSuccess: false,
        statusCode: status,
        message
    });
}
