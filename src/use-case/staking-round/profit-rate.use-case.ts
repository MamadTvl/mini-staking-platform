import { StakingRoundException } from '@/domain/exception/staking-round-exception.enum';
import { ProfitRateIntractor } from '@/domain/intractor/staking-round/profit-rate.intractor';
import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { ProfitQueueService } from '@/infrastructure/services/bull/profit-queue.service';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class ProfitRateUseCase implements ProfitRateIntractor {
    constructor(
        private readonly stakingRoundRepository: StakingRoundRepository,
        private readonly profitQueueService: ProfitQueueService,
    ) {}

    async addProfitRate(id: number, percentage: number): Promise<void> {
        const stakingRound = await this.stakingRoundRepository.findOne(id);
        if (stakingRound) {
            throw new Error(StakingRoundException.StakingRoundNotFound);
        }
        if (moment(stakingRound.date, 'YYYY-MM-DD').isAfter(moment())) {
            throw new Error('NotYet');
        }
        if (stakingRound.ratePercentage) {
            throw new Error('AlreadyAdded');
        }
        await this.stakingRoundRepository.updateProfitRate(id, percentage);
        await this.profitQueueService.addJob(id);
    }
}
