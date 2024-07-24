import { Role } from '@/infrastructure/db/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    private getRoles(context: ExecutionContext): Role[] {
        const handlerRoles = this.reflector.get<Role[]>(
            'roles',
            context.getHandler(),
        );
        const classRoles = this.reflector.get<Role[]>(
            'roles',
            context.getClass(),
        );
        return [
            ...new Set([
                ...(Array.isArray(classRoles) ? classRoles : []),
                ...(Array.isArray(handlerRoles) ? handlerRoles : []),
            ]),
        ];
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const user = req.user;
        if (!user) {
            return false;
        }
        const roles = this.getRoles(context);
        return roles.includes(user.role);
    }
}
