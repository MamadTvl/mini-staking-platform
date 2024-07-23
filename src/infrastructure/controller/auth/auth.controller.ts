import { LoginUseCase } from '@/use-case/auth/login.use-case';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ReqUser } from '@/infrastructure/common/decorators/req-user.decorator';
import { User } from '@/infrastructure/db/entities/user.entity';
import { LoginGuard } from '@/infrastructure/common/guards/login.guard';
import { RegisterUseCase } from '@/use-case/auth/register.use-case';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
    ) {}

    @Post('login')
    @UseGuards(LoginGuard)
    async login(@Body() _: LoginDto, @ReqUser() user: User) {
        return await this.loginUseCase.getJwtToken(user.id);
    }

    @Post('register')
    async register(@Body() { username, password }: LoginDto) {
        return this.registerUseCase.execute(username, password);
    }
}
