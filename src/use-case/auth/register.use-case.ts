import { JwtPayload } from '@/domain/adapter/jwt.interface';
import { Config } from '@/domain/config/config.interface';
import { AuthException } from '@/domain/exception/auth-exception.enum';
import { RegisterIntractor } from '@/domain/intractor/auth/register.intractor';
import { Role } from '@/infrastructure/db/entities/user.entity';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { BcryptService } from '@/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/infrastructure/services/jwt/jwt.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterUseCase implements RegisterIntractor, OnModuleInit {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtTokenService,
        private readonly configService: ConfigService<Config>,
    ) {}
    async onModuleInit() {
        const isAdminExists = await this.userRepository.isAdminExists();
        if (isAdminExists) {
            return;
        }
        const data = this.configService.get('admin', { infer: true });
        await this.execute(data.username, data.password, Role.Admin);
    }

    async execute(
        username: string,
        password: string,
        role = Role.User,
    ): Promise<string> {
        const alreadyExists = await this.userRepository.isExist(username);
        if (alreadyExists) {
            throw new Error(AuthException.UsernameAlreadyExists);
        }
        const hashedPassword = await this.bcryptService.hash(password);
        const { id } = await this.userRepository.save(
            username,
            hashedPassword,
            role,
        );
        const jwtPayload: JwtPayload = { userId: id };
        return this.jwtService.createToken(jwtPayload);
    }
}
