import { CorsOptions } from 'cors';
import envConfig from '@/configs/envConfig';

const whitelistOrigins = ['http://localhost:3000', `http://localhost:${envConfig.PORT || 5000}`];

export const corsConfigOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelistOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
