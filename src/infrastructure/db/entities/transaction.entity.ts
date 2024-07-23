import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum TransactionType {
    Deposit = 'deposit',
    Withdrawal = 'withdrawal',
}

export enum TransactionStatus {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected',
}

@Entity({ name: 'transactions' })
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unsigned: true, type: 'float' })
    amount: number;

    @Column({ enum: TransactionType })
    type: TransactionType;

    @Column({ enum: TransactionStatus })
    status: TransactionStatus;

    @Column({
        name: 'tax_percentage',
        unsigned: true,
        nullable: true,
        type: 'float',
    })
    taxPercentage: number | null;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

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
