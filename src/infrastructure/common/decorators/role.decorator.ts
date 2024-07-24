import { Role } from '@/infrastructure/db/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) =>
    SetMetadata('roles', [Role.Admin, ...roles]);
