import { LoginUseCase } from '@/use-case/auth/login.use-case';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ReqUser } from '@/infrastructure/common/decorators/req-user.decorator';
import { User } from '@/infrastructure/db/entities/user.entity';
import { LoginGuard } from '@/infrastructure/common/guards/login.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    @Post('login')
    @UseGuards(LoginGuard)
    async login(@Body() loginDto: LoginDto, @ReqUser() user: User) {
        console.log(user);
        return;
    }
}
