import { openStakingRound } from '@/domain/constant/queue';
import { QueueService } from '@/infrastructure/job/queue.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StakingRoundQueueService {
    constructor(private readonly queueService: QueueService) {}

    addJob(date: string) {
        return this.queueService.openStakingRoundQueue.add(openStakingRound, {
            date,
        });
    }
}
