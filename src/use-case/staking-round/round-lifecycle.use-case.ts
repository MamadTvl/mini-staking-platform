import { StakingRoundRepository } from '@/infrastructure/repository/staking-round.repository';
import { RoundLifecycleIntractor } from './../../domain/intractor/staking-round/round-lifecycle.intractor';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as moment from 'moment';
import { InjectQueue } from '@nestjs/bullmq';
import { openStakingRound } from '@/domain/constant/queue';

@Injectable()
export class RoundLifecycleUseCase
    implements RoundLifecycleIntractor, OnModuleInit
{
    constructor(
        private readonly stakingRoundRepository: StakingRoundRepository,
    ) {}

    async onModuleInit() {
        await this.startStakingRound();
    }

    async startStakingRound(): Promise<void> {
        const stakingRound = await this.stakingRoundRepository.findOpenRound();
        if (stakingRound) {
            return;
        }
        await this.stakingRoundRepository.save(
            moment().startOf('month').format('YYYY-MM-DD'),
        );
    }
}
