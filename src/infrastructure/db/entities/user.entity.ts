import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { BalanceSnapshot } from './balance-snapshot.entity';
import { StakingRoundBalance } from './staking-round-balance.entity';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column({ enum: Role })
    role: Role;

    @Column({ unsigned: true, type: 'float', default: 0 })
    balance: number;

    @OneToMany(() => Transaction, (t) => t.owner)
    transactions: Transaction[];

    @OneToMany(() => BalanceSnapshot, (b) => b.user)
    balanceSnapshots: BalanceSnapshot[];

    @OneToMany(() => StakingRoundBalance, (srb) => srb.user)
    stakingRounds: StakingRoundBalance[];

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
