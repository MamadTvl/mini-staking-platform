export interface Config {
    env: 'local' | 'dev' | 'prod';
    db: {
        host: string;
        port: number;
        name: string;
        user: string;
        password: string;
        logger: boolean;
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
    jwt: {
        secret: string;
        expireTime: string;
    };
    admin: {
        username: string;
        password: string;
    };
}
