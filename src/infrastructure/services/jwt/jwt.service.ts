import { JwtAdapter, JwtPayload } from '@/domain/adapter/jwt.interface';
import { Config } from '@/domain/config/config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements JwtAdapter {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<Config>,
    ) {}

    async checkToken(token: string): Promise<JwtPayload> {
        return this.jwtService.verifyAsync(token);
    }

    async createToken(payload: JwtPayload): Promise<string> {
        const conf = this.configService.get('jwt', { infer: true });
        return this.jwtService.signAsync(payload, {
            secret: conf.secret,
            expiresIn: conf.expireTime,
        });
    }
}
