import { RoundBalanceRepository } from '@/infrastructure/repository/staking-round-balance.repository';
import { ProfitDistributionIntractor } from '@/domain/intractor/staking-round/profit-distribution.intractor';
import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { Injectable } from '@nestjs/common';
import { DepositUseCase } from '../transaction/deposit.use-case';
import { StakingRoundStatus } from '@/infrastructure/db/entities/staking-round.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ProfitDistributionUseCase implements ProfitDistributionIntractor {
    constructor(
        private readonly roundBalanceRepository: RoundBalanceRepository,
        private readonly stakingRoundRepository: StakingRoundRepository,
        private readonly depositUseCase: DepositUseCase,
    ) {}

    @Transactional()
    async distribute(stakingRoundId: number): Promise<void> {
        const stakingRound = await this.stakingRoundRepository.findOne(
            stakingRoundId,
        );
        if (!stakingRound) {
            throw new Error('StakingRoundMissing');
        }
        if (!stakingRound.ratePercentage) {
            throw new Error('RatePercentageMissing');
        }
        const stakingRoundBalances =
            await this.roundBalanceRepository.findRoundBalances(stakingRoundId);

        await Promise.all(
            stakingRoundBalances.map((item) =>
                this.depositUseCase.depositAcceptedTransaction(
                    item.userId,
                    item.averageBalance * stakingRound.ratePercentage,
                ),
            ),
        );
        await this.stakingRoundRepository.updateStatus(
            stakingRoundId,
            StakingRoundStatus.Closed,
        );
    }
}
