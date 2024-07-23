import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();
import { DataSource } from 'typeorm';
const isDevelop = process.env.NODE_ENV === 'local';

const migrations = isDevelop
    ? ['src/infrastructure/db/migrations/*.ts']
    : ['dist/infrastructure/db/migrations/*.js'];
const entities = isDevelop
    ? ['src/infrastructure/db/entities/*.entity.ts']
    : ['dist/infrastructure/db/entities/*.entity.js'];

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
    synchronize: false,
    logging: true,
    migrations,
    entities,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: true,
});
export default dataSource;
