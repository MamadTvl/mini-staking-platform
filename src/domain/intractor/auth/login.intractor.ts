import { User } from '@/infrastructure/db/entities/user.entity';

export interface LoginIntractor {
    validateUserForJwtStrategy(id: number): Promise<User | null>;
    validateUserForLocalStrategy(
        username: string,
        password: string,
    ): Promise<Omit<User, 'password'> | null>;
    getJwtToken(id: number): Promise<string>;
}
