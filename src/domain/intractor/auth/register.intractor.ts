import { Role } from '@/infrastructure/db/entities/user.entity';

export interface RegisterIntractor {
    execute(username: string, password: string, role?: Role): Promise<string>;
}
