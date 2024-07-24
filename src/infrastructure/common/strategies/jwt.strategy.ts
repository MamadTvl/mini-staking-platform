import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/domain/config/config.interface';
import { LoginUseCase } from '@/use-case/auth/login.use-case';
import { JwtPayload } from '@/domain/adapter/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        configService: ConfigService<Config>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('jwt', { infer: true }).secret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = this.loginUseCase.validateUserForJwtStrategy(
            payload.userId,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
