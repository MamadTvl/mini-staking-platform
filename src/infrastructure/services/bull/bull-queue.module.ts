import { JobsModule } from '@/infrastructure/job/job.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProfitQueueService } from './profit-queue.service';
import { SnapshotQueueService } from './snapshot-queue.service';

@Module({
    imports: [forwardRef(() => JobsModule)],
    providers: [ProfitQueueService, SnapshotQueueService],
    exports: [ProfitQueueService, SnapshotQueueService],
})
export class BullQueueModule {}
