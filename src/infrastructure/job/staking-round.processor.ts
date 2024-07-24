import { RoundLifecycleUseCase } from '@/use-case/staking-round/round-lifecycle.use-case';
import { openStakingRound } from '@/domain/constant/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { defaultWorkerOptions } from '../config/bull/bull.config';
import { Job, UnrecoverableError } from 'bullmq';

export type StakingRoundJobData = { date: string };

@Processor(openStakingRound, defaultWorkerOptions)
export class StakingRoundProcessor extends WorkerHost {
    constructor(private readonly roundLifecycleUseCase: RoundLifecycleUseCase) {
        super();
    }

    async process(job: Job<StakingRoundJobData>): Promise<any> {
        const { date } = job.data;
        try {
            await this.roundLifecycleUseCase.startStakingRound(date);
        } catch (err) {
            if (err instanceof Error) {
                throw new UnrecoverableError();
            }
        }
    }
}
