import { JwtPayload } from '@/domain/adapter/jwt.interface';
import { AuthException } from '@/domain/exception/auth-exception.enum';
import { RegisterIntractor } from '@/domain/intractor/auth/register.intractor';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { BcryptService } from '@/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from '@/infrastructure/services/jwt/jwt.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase implements RegisterIntractor {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtTokenService,
    ) {}

    async execute(username: string, password: string): Promise<string> {
        const alreadyExists = await this.userRepository.isExist(username);
        if (alreadyExists) {
            throw new Error(AuthException.UsernameAlreadyExists);
        }
        const hashedPassword = await this.bcryptService.hash(password);
        const { id } = await this.userRepository.save(username, hashedPassword);
        const jwtPayload: JwtPayload = { userId: id };
        return this.jwtService.createToken(jwtPayload);
    }
}
