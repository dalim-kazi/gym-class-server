import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import envConfig from '../configs/envConfig';

// Define log directory
const logDir = path.join(__dirname, '..', 'logs');

// Check if the logs directory exists, if not, create it
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
        )
    ),
    transports: [
        // Separate file for error logs
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'error-%DATE%.log'),
            level: 'error',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),

        // Separate file for info logs (and all higher levels)
        new winston.transports.DailyRotateFile({
            filename: path.join(logDir, 'info-%DATE%.log'),
            level: 'info',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        })
    ]
});

// If we're not in production, log to the `console` with a colorized format.
if (envConfig.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ level, message }) => {
                    return `[${level}]: ${message}`;
                })
            )
        })
    );
}

export default logger;
