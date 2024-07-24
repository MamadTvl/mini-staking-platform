import {
    balanceSnapshot,
    profitDistribution,
} from './../../domain/constant/queue';
import { openStakingRound } from '@/domain/constant/queue';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ProfitProcessorJobData } from './profit.processor';
import { SnapshotJobData } from './snapshot.processor';
import { StakingRoundJobData } from './staking-round.processor';

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue(openStakingRound)
        public openStakingRoundQueue: Queue<StakingRoundJobData>,
        @InjectQueue(balanceSnapshot)
        public balanceSnapshotQueue: Queue<SnapshotJobData>,
        @InjectQueue(profitDistribution)
        public profitDistributionQueue: Queue<ProfitProcessorJobData>,
    ) {}
}
