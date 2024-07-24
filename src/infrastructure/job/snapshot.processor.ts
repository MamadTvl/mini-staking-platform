import { SnapshotUseCase } from '@/use-case/balance/snapshot.use-case';
import { balanceSnapshot } from '@/domain/constant/queue';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { defaultWorkerOptions } from '../config/bull/bull.config';
import { Job } from 'bullmq';

export type SnapshotJobData = {
    date: string;
    withAverageCalculation?: boolean;
    stakingRoundId?: number;
};

@Processor(balanceSnapshot, defaultWorkerOptions)
export class SnapshotProcessor extends WorkerHost {
    constructor(private readonly snapshotUseCase: SnapshotUseCase) {
        super();
    }

    async process(job: Job<SnapshotJobData>): Promise<any> {
        const { date, withAverageCalculation, stakingRoundId } = job.data;
        await this.snapshotUseCase.snapshotBalances(
            date,
            stakingRoundId,
            withAverageCalculation,
        );
    }
}
