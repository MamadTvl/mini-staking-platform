import { Config } from '@/domain/config/config.interface';

export default (): Config => ({
    env: process.env.NODE_ENV as Config['env'],
    db: {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        logger: process.env.DB_LOGGER === 'true',
        password: process.env.DB_PASSWORD,
    },
    redis: {
        host: process.env.REDIS_HOST,
        db: parseInt(process.env.REDIS_DB, 10) || 0,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expireTime: process.env.JWT_EXPIRE_TIME,
    },
    admin: {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    },
});
