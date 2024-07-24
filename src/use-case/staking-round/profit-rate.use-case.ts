import { ProfitRateIntractor } from '@/domain/intractor/staking-round/profit-rate.intractor';
import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class ProfitRateUseCase implements ProfitRateIntractor {
    constructor(
        private readonly stakingRoundRepository: StakingRoundRepository,
    ) {}

    async addProfitRate(id: number, percentage: number): Promise<void> {
        const stakingRound = await this.stakingRoundRepository.findOne(id);
        if (stakingRound) {
            throw new Error('NotFound');
        }
        if (moment(stakingRound.date, 'YYYY-MM-DD').isAfter(moment())) {
            throw new Error('NotYet');
        }
        if (stakingRound.ratePercentage) {
            throw new Error('AlreadyAdded');
        }
        await this.stakingRoundRepository.updateProfitRate(id, percentage);
    }
}