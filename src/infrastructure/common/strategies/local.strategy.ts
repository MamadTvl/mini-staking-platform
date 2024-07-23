import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUseCase } from '@/use-case/auth/login.use-case';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly loginUseCase: LoginUseCase) {
        super();
    }

    async validate(username: string, password: string) {
        if (!username || !password) {
            throw new BadRequestException();
        }
        const user = await this.loginUseCase.validateUserForLocalStrategy(
            username,
            password,
        );
        if (!user) {
            throw new BadRequestException();
        }
        return user;
    }
}
