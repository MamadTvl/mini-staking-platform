import { RoundUseCase } from '@/use-case/staking-round/round.use-case';
import { openStakingRound } from '@/domain/constant/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { defaultWorkerOptions } from '../config/bull/bull.config';
import { Job, UnrecoverableError } from 'bullmq';

export type StakingRoundJobData = { date: string };

@Processor(openStakingRound, defaultWorkerOptions)
export class StakingRoundProcessor extends WorkerHost {
    constructor(private readonly roundUseCase: RoundUseCase) {
        super();
    }

    async process(job: Job<StakingRoundJobData>): Promise<any> {
        const { date } = job.data;
        try {
            await this.roundUseCase.startStakingRound(date);
        } catch (err) {
            if (err instanceof Error) {
                throw new UnrecoverableError();
            }
        }
    }
}
