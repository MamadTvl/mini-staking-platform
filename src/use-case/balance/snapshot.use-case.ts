import {
    SnapshotIntractor,
    SnapshotJobIntractor,
} from '@/domain/intractor/balance/snapshot.intractor';
import { BalanceSnapshotRepository } from '@/infrastructure/repository/balance-snapshot.repository';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AverageBalanceUseCase } from './average-balance.use-case';
import { SnapshotQueueService } from '@/infrastructure/services/bull/snapshot-queue.service';
import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';

@Injectable()
export class SnapshotUseCase
    implements SnapshotIntractor, SnapshotJobIntractor
{
    constructor(
        private readonly snapshotRepository: BalanceSnapshotRepository,
        private readonly stakingRoundRepository: StakingRoundRepository,
        private readonly averageBalanceUseCase: AverageBalanceUseCase,
        private readonly snapshotQueueService: SnapshotQueueService,
    ) {}

    async addSnapshotJob(date: moment.Moment): Promise<void> {
        const snapshotMoment = date.utcOffset(0).subtract(5, 'minute');
        const firstDayOfMonthDate = snapshotMoment
            .clone()
            .startOf('month')
            .format('YYYY-MM-DD');
        const endDayOfMonthDate = snapshotMoment
            .clone()
            .endOf('month')
            .format('YYYY-MM-DD');
        const snapshotDate = snapshotMoment.format('YYYY-MM-DD');
        const stakingRound = await this.stakingRoundRepository.findWithDate(
            firstDayOfMonthDate,
        );
        if (!stakingRound) {
            throw new Error('StakingRoundNotFound');
        }
        await this.snapshotQueueService.addJob({
            date: snapshotDate,
            withAverageCalculation: snapshotDate === endDayOfMonthDate,
            stakingRoundId: stakingRound.id,
        });
    }

    async snapshotBalances(
        date: string,
        stakingRoundId: number,
        withAverageCalculation: boolean,
    ): Promise<void> {
        await this.snapshotRepository.takeSnapshot(date);
        if (withAverageCalculation) {
            await this.averageBalanceUseCase.calculate(stakingRoundId);
        }
    }
}
