import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';
import { Module } from '@nestjs/common';
import { ProfitDistributionUseCase } from './profit-distribution.use-case';
import { ProfitRateUseCase } from './profit-rate.use-case';
import { RoundLifecycleUseCase } from './round-lifecycle.use-case';

@Module({
    imports: [RepositoriesModule],
    providers: [
        ProfitDistributionUseCase,
        ProfitRateUseCase,
        RoundLifecycleUseCase,
    ],
    exports: [
        ProfitDistributionUseCase,
        ProfitRateUseCase,
        RoundLifecycleUseCase,
    ],
})
export class StakingRoundModule {}
