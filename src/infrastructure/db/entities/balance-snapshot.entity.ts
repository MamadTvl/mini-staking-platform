import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'balance_snapshots' })
export class BalanceSnapshot {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unsigned: true, type: 'float' })
    balance: number;

    @ManyToOne(() => User, (user) => user.balanceSnapshots)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'date', unique: true })
    date: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
    })
    createdAt: Date;
}
