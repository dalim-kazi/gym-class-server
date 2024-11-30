export default {
    MONGODB_URI: process.env.MONGODB_URI,
    RABBITMQ_URL: process.env.RABBITMQ_URL, // For Microservices
    BASE_API_URL: process.env.BASE_API,
    API_VERSION: process.env.API_VERSION,
    PORT: process.env.PORT,
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,

    // Production or Development Environment
    NODE_ENV: process.env.NODE_ENV,

    // json web token env
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

    // smtp env file
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_FROM: process.env.SMTP_FROM,

    // Redis configuration
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    // Services
    AUTH_SERVICE: process.env.AUTH_SERVICE
};
