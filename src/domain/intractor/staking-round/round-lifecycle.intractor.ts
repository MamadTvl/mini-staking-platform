import { StakingRound } from '@/infrastructure/db/entities/staking-round.entity';

export interface RoundLifecycleIntractor {
    startStakingRound(date: string): Promise<void>;
}

export interface GetRoundsIntractor {
    getMany(): Promise<StakingRound[]>;
}
