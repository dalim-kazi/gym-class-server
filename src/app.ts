import dotenv from 'dotenv';
dotenv.config();

import express, { Response } from 'express';
import cors from 'cors';
import errorHandler from '@/middlewares/errorHandler';
import { corsConfigOptions } from '@/configs/corsConfig';
import logRequests from '@/middlewares/logRequests';
import router from '@/routes/router';
import envConfig from '@/configs/envConfig';
import rateLimiter from '@/middlewares/rateLimiter';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import path from 'path';

// Initializing the app
const app = express();
// app.use(express.static(path.join(__dirname, 'public')));
// middlewares
app.use(express.json());
app.use(cors(corsConfigOptions));
// app.use(logRequests);
// app.use(helmet());
// app.use(rateLimiter);
app.use(ExpressMongoSanitize());

// Health Route
app.get('/api/v1/construction/health', (_req, res: Response) => {
    res.status(200).json({ status: 'Up', message: 'construction server is online' });
});

// All Routes
app.use(`${envConfig.API_VERSION as string}`, router);

// error handler
app.use(errorHandler);

export default app;
