import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import {
    GetRoundsIntractor,
    RoundLifecycleIntractor,
} from '@/domain/intractor/staking-round/round-lifecycle.intractor';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as moment from 'moment';
import { StakingRound } from '@/infrastructure/db/entities/staking-round.entity';

@Injectable()
export class RoundUseCase
    implements RoundLifecycleIntractor, OnModuleInit, GetRoundsIntractor
{
    constructor(
        private readonly stakingRoundRepository: StakingRoundRepository,
    ) {}
    getMany(): Promise<StakingRound[]> {
        return this.stakingRoundRepository.findMany();
    }

    async onModuleInit() {
        const stakingRound = await this.stakingRoundRepository.findOpenRound();
        if (stakingRound) {
            return;
        }
        await this.stakingRoundRepository.save(
            moment().startOf('month').format('YYYY-MM-DD'),
        );
    }

    async startStakingRound(date: string): Promise<void> {
        const startDayOfMonth = moment(date, 'YYYY-MM-DD')
            .startOf('month')
            .format('YYYY-MM-DD');
        const stakingRound = await this.stakingRoundRepository.findWithDate(
            startDayOfMonth,
        );
        if (stakingRound) {
            return;
        }
        await this.stakingRoundRepository.save(startDayOfMonth);
    }
}
