import { Roles } from '@/infrastructure/common/decorators/role.decorator';
import { ProfitRateUseCase } from '@/use-case/staking-round/profit-rate.use-case';
import { RoundUseCase } from '@/use-case/staking-round/round.use-case';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AddProfitRateDto } from './dto/profit-rate.dto';

@ApiSecurity('user-auth')
@ApiTags('Staking Round')
@Roles()
@Controller('staking-round')
export class StakingRoundController {
    constructor(
        private readonly roundUseCase: RoundUseCase,
        private readonly profitRateUseCase: ProfitRateUseCase,
    ) {}

    @Get()
    async getMany() {
        return this.roundUseCase.getMany();
    }

    @Patch('profit-rate')
    async addProfitRate(@Body() dto: AddProfitRateDto) {
        await this.profitRateUseCase.addProfitRate(
            dto.stakingRoundId,
            dto.percentage,
        );
        return true;
    }
}
