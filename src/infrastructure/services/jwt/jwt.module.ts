import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/domain/config/config.interface';

@Module({
    imports: [
        Jwt.registerAsync({
            inject: [ConfigService],
            useFactory(configService: ConfigService<Config>) {
                const conf = configService.get('jwt', { infer: true });
                return {
                    secret: conf.secret,
                    signOptions: { expiresIn: conf.expireTime },
                };
            },
        }),
    ],
    providers: [JwtTokenService],
    exports: [JwtTokenService],
})
export class JwtModule {}
