import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';
import { forwardRef, Module } from '@nestjs/common';
import { ProfitDistributionUseCase } from './profit-distribution.use-case';
import { ProfitRateUseCase } from './profit-rate.use-case';
import { RoundLifecycleUseCase } from './round-lifecycle.use-case';
import { TransactionModule } from '../transaction/transaction.module';
import { JobsModule } from '@/infrastructure/job/job.module';
import { ProfitQueueService } from '@/infrastructure/services/bull/profit-queue.service';
import { BullQueueModule } from '@/infrastructure/services/bull/bull-queue.module';

@Module({
    imports: [
        RepositoriesModule,
        TransactionModule,
        forwardRef(() => BullQueueModule),
    ],
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
