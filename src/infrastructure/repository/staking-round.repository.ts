import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    StakingRound,
    StakingRoundStatus,
} from '../db/entities/staking-round.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StakingRoundRepository {
    constructor(
        @InjectRepository(StakingRound)
        private readonly stakingRoundDbRepository: Repository<StakingRound>,
    ) {}

    findOne(id: number) {
        return this.stakingRoundDbRepository.findOne({ where: { id } });
    }

    findOpenRound() {
        return this.stakingRoundDbRepository.findOne({
            where: { status: StakingRoundStatus.Open },
        });
    }

    updateProfitRate(id: number, profitRate: number) {
        return this.stakingRoundDbRepository.save({
            id,
            ratePercentage: profitRate,
        });
    }

    updateStatus(id: number, status: StakingRoundStatus) {
        return this.stakingRoundDbRepository.save({ id, status });
    }

    save(date: string) {
        return this.stakingRoundDbRepository.save({ date });
    }
}
