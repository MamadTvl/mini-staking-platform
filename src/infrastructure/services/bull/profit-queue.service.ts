import { profitDistribution } from '@/domain/constant/queue';
import { QueueService } from '@/infrastructure/job/queue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfitQueueService {
    constructor(private readonly queueService: QueueService) {}

    addJob(stakingRoundId: number) {
        return this.queueService.profitDistributionQueue.add(
            profitDistribution,
            { stakingRoundId: stakingRoundId },
        );
    }
}
