import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from './user.entity';

@Unique('user_date_balance_unique', ['user', 'date'])
@Entity({ name: 'balance_snapshots' })
export class BalanceSnapshot {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unsigned: true, type: 'float' })
    balance: number;

    @ManyToOne(() => User, (user) => user.balanceSnapshots)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'date' })
    date: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
    })
    createdAt: Date;
}
