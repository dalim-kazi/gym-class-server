export default {
    MONGODB_URI: process.env.MONGODB_URI,
    BASE_API_URL: process.env.BASE_API,
    API_VERSION: process.env.API_VERSION,
    PORT: process.env.PORT,

    // Production or Development Environment
    NODE_ENV: process.env.NODE_ENV,

    // json web token env
    JWT_SECRET: process.env.JWT_SECRET
};
