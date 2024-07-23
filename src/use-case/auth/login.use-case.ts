import { JwtPayload } from '@/domain/adapter/jwt.interface';
import { LoginIntractor } from '@/domain/intractor/auth/login.intractor';
import { User } from '@/infrastructure/db/entities/user.entity';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { BcryptService } from '@/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/infrastructure/services/jwt/jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase implements LoginIntractor {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtTokenService,
    ) {}

    async validateUserForJwtStrategy(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return user;
    }

    async validateUserForLocalStrategy(
        username: string,
        password: string,
    ): Promise<Omit<User, 'password'> | null> {
        const user = await this.userRepository.findByUsernameWithPassword(
            username,
        );
        if (!user) {
            return null;
        }
        const match = await this.bcryptService.compare(password, user.password);
        if (match) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async getJwtToken(id: number) {
        const payload: JwtPayload = { userId: id };
        return this.jwtService.createToken(payload);
    }
}
