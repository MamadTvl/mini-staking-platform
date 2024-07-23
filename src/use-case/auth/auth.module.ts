import { Module } from '@nestjs/common';
import { LoginUseCase } from './login.use-case';
import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';
import { BcryptModule } from '@/infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from '@/infrastructure/services/jwt/jwt.module';

@Module({
    imports: [RepositoriesModule, BcryptModule, JwtModule],
    providers: [LoginUseCase],
    exports: [LoginUseCase],
})
export class AuthModule {}
