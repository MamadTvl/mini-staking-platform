import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from '@/use-case/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [AuthModule, PassportModule],
    controllers: [AuthController],
})
export class AuthControllerModule {}
