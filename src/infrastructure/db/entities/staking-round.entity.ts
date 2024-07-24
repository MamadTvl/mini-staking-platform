import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StakingRoundBalance } from './staking-round-balance.entity';

export enum StakingRoundStatus {
    Open = 'open',
    Calculated = 'calculated',
    Closed = 'closed',
}

@Entity({ name: 'staking_rounds' })
export class StakingRound {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'date', unique: true })
    date: string; // first of every month

    @Column({
        unsigned: true,
        nullable: true,
        type: 'float',
        name: 'rate_percentage',
    })
    ratePercentage: number;

    @Column({ enum: StakingRoundStatus, default: StakingRoundStatus.Open })
    status: StakingRoundStatus;

    @OneToMany(() => StakingRoundBalance, (srb) => srb.data)
    userBalances: StakingRoundBalance[];
}
