import { AverageBalanceIntractor } from '@/domain/intractor/balance/average-balance.intractor';
import { StakingRoundStatus } from '@/infrastructure/db/entities/staking-round.entity';
import { RoundBalanceRepository } from '@/infrastructure/repository/staking-round-balance.repository';
import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AverageBalanceUseCase implements AverageBalanceIntractor {
    constructor(
        private readonly roundBalanceRepository: RoundBalanceRepository,
        private readonly stakingRoundRepository: StakingRoundRepository,
    ) {}

    @Transactional()
    async calculate(stakingRoundId: number): Promise<void> {
        const stakingRound = await this.stakingRoundRepository.findOne(
            stakingRoundId,
        );
        if (!stakingRound) {
            throw new Error('StakingRoundMissing');
        }
        const [year, month] = stakingRound.date.split('-');
        await this.roundBalanceRepository.updateBalances(
            stakingRoundId,
            year,
            month,
        );
        await this.stakingRoundRepository.updateStatus(
            stakingRoundId,
            StakingRoundStatus.Calculated,
        );
    }
}
