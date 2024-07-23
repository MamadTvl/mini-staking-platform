import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StakingRoundBalance } from './staking-round-balance.entity';

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

    @OneToMany(() => StakingRoundBalance, (srb) => srb.data)
    userBalances: StakingRoundBalance[];
}
