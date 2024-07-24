import { Module } from '@nestjs/common';
import { StakingRoundController } from './staking-round.controller';
import { StakingRoundModule } from '@/use-case/staking-round/staking-round.module';

@Module({
    imports: [StakingRoundModule],
    controllers: [StakingRoundController],
})
export class StakingRoundControllerModule {}
