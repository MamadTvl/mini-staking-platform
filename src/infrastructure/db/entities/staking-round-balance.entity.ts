import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { StakingRound } from './staking-round.entity';

@Entity({ name: 'staking_round_has_balance' })
export class StakingRoundBalance {
    @Column({ nullable: false, primary: true, name: 'user_id' })
    userId: number;

    @Column({ nullable: false, primary: true, name: 'staking_round_id' })
    stakingRoundId: number;

    @Column({ unsigned: true, type: 'float' })
    averageBalance: number;

    @ManyToOne(() => User, (user) => user.stakingRounds)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => StakingRound, (sr) => sr.userBalances)
    @JoinColumn({ name: 'staking_round_id' })
    data: StakingRound;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp without time zone',
    })
    updatedAt: Date;
}
