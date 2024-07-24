import { balanceSnapshot, profitDistribution } from '@/domain/constant/queue';
import { QueueService } from '@/infrastructure/job/queue.service';
import { SnapshotJobData } from '@/infrastructure/job/snapshot.processor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnapshotQueueService {
    constructor(private readonly queueService: QueueService) {}

    addJob(data: SnapshotJobData) {
        return this.queueService.balanceSnapshotQueue.add(
            balanceSnapshot,
            data,
        );
    }
}
