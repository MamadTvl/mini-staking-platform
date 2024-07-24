import { Moment } from 'moment';

export interface SnapshotIntractor {
    snapshotBalances(
        date: string,
        stakingRoundId: number,
        withAverageCalculation: boolean,
    ): Promise<void>;
}

export interface SnapshotJobIntractor {
    addSnapshotJob(date: Moment): Promise<void>;
}
