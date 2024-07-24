import { RoundLifecycleUseCase } from '@/use-case/staking-round/round-lifecycle.use-case';
import { openStakingRound } from '@/domain/constant/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { defaultWorkerOptions } from '../config/bull/bull.config';
import { UnrecoverableError } from 'bullmq';

@Processor(openStakingRound, defaultWorkerOptions)
export class StakingRoundProcessor extends WorkerHost {
    constructor(private readonly roundLifecycleUseCase: RoundLifecycleUseCase) {
        super();
    }

    async process(): Promise<any> {
        try {
            await this.roundLifecycleUseCase.startStakingRound();
        } catch (err) {
            if (err instanceof Error) {
                throw new UnrecoverableError();
            }
        }
    }
}
