import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import {
    bullRedisConnection,
    defaultJobOptions,
} from '../config/bull/bull.config';
import {
    balanceSnapshot,
    openStakingRound,
    profitDistribution,
} from '@/domain/constant/queue';
import { SnapshotProcessor } from './snapshot.processor';
import { StakingRoundProcessor } from './staking-round.processor';
import { ProfitProcessor } from './profit.processor';
import { BalanceModule } from '@/use-case/balance/balance.module';
import { StakingRoundModule } from '@/use-case/staking-round/staking-round.module';
import { QueueService } from './queue.service';

@Module({
    imports: [
        BullModule.forRoot({
            connection: bullRedisConnection,
            defaultJobOptions: defaultJobOptions,
            prefix: 'MINI_STAKING',
        }),
        BullModule.registerQueue(
            {
                name: openStakingRound,
                defaultJobOptions: defaultJobOptions,
            },
            {
                name: balanceSnapshot,
                defaultJobOptions: defaultJobOptions,
            },
            {
                name: profitDistribution,
                defaultJobOptions: defaultJobOptions,
            },
        ),
        forwardRef(() => BalanceModule),
        forwardRef(() => StakingRoundModule),
    ],
    providers: [
        SnapshotProcessor,
        StakingRoundProcessor,
        ProfitProcessor,
        QueueService,
    ],
    exports: [QueueService],
})
export class JobsModule {}
