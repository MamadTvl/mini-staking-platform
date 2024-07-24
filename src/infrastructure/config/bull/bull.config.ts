import { DefaultJobOptions, WorkerOptions } from 'bullmq';
import IORedis from 'ioredis';
import * as dotenv from 'dotenv';
import config from '../env/config';
dotenv.config();
const conf = config();

export const bullRedisConnection = new IORedis({
    host: conf.redis.host,
    port: conf.redis.port,
    password: conf.redis.password,
    db: 0,
    maxRetriesPerRequest: null,
});

export const defaultJobOptions: DefaultJobOptions = {
    removeOnComplete: {
        age: 120,
        count: 1000,
    },
    removeOnFail: {
        age: 380,
        count: 5000,
    },
    attempts: 25,
    backoff: {
        type: 'fixed',
        delay: 180 * 1000,
    },
    keepLogs: 10,
};

export const defaultWorkerOptions: WorkerOptions = {
    connection: bullRedisConnection,
    removeOnComplete: {
        age: 120,
        count: 1000,
    },
    removeOnFail: {
        age: 380,
        count: 5000,
    },
};
