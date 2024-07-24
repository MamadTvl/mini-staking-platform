import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';
import { forwardRef, Module } from '@nestjs/common';
import { ProfitDistributionUseCase } from './profit-distribution.use-case';
import { ProfitRateUseCase } from './profit-rate.use-case';
import { RoundUseCase } from './round.use-case';
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
        RoundUseCase,
    ],
    exports: [
        ProfitDistributionUseCase,
        ProfitRateUseCase,
        RoundUseCase,
    ],
})
export class StakingRoundModule {}
