import { ProfitDistributionUseCase } from '../../use-case/staking-round/profit-distribution.use-case';
import { profitDistribution } from '@/domain/constant/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { defaultWorkerOptions } from '../config/bull/bull.config';
import { Job, UnrecoverableError } from 'bullmq';

export type ProfitProcessorJobData = { stakingRoundId: number };

@Processor(profitDistribution, defaultWorkerOptions)
export class ProfitProcessor extends WorkerHost {
    constructor(
        private readonly profitDistributionUseCase: ProfitDistributionUseCase,
    ) {
        super();
    }

    async process(job: Job<ProfitProcessorJobData>): Promise<any> {
        const stakingRoundId = job.data.stakingRoundId;
        await this.profitDistributionUseCase.distribute(stakingRoundId);
    }
}
