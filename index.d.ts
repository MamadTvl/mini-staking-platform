import { Role } from './infrastructure/db/entities/user.entity';

declare global {
    namespace Express {
        export interface User {
            id: number;
            username: string;
            role: Role;
        }
    }
}

export {};
