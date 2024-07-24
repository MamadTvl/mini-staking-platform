import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { RoundLifecycleIntractor } from './../../domain/intractor/staking-round/round-lifecycle.intractor';
import { Injectable, OnModuleInit } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class RoundLifecycleUseCase
    implements RoundLifecycleIntractor, OnModuleInit
{
    constructor(
        private readonly stakingRoundRepository: StakingRoundRepository,
    ) {}

    async onModuleInit() {
        const stakingRound = await this.stakingRoundRepository.findOpenRound();
        if (stakingRound) {
            return;
        }
        await this.startStakingRound(
            moment().startOf('month').format('YYYY-MM-DD'),
        );
    }

    async startStakingRound(date: string): Promise<void> {
        await this.stakingRoundRepository.save(date);
    }
}
