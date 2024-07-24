import { JobsModule } from '@/infrastructure/job/job.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProfitQueueService } from './profit-queue.service';
import { SnapshotQueueService } from './snapshot-queue.service';
import { StakingRoundQueueService } from './staking-round-queue.service';

@Module({
    imports: [forwardRef(() => JobsModule)],
    providers: [
        ProfitQueueService,
        SnapshotQueueService,
        StakingRoundQueueService,
    ],
    exports: [
        ProfitQueueService,
        SnapshotQueueService,
        StakingRoundQueueService,
    ],
})
export class BullQueueModule {}
