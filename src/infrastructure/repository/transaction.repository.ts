import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Transaction,
    TransactionStatus,
    TransactionType,
} from '../db/entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionException } from '@/domain/exception/transaction-exception.enum';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionDbRepository: Repository<Transaction>,
    ) {}

    save(
        userId: number,
        amount: number,
        type: TransactionType,
        status: TransactionStatus = TransactionStatus.Pending,
    ) {
        return this.transactionDbRepository.save({
            owner: { id: userId },
            amount,
            type,
            taxPercentage: status === TransactionStatus.Accepted ? 0 : null,
            status,
        });
    }

    async updatePendingTransaction(
        id: number,
        status: TransactionStatus,
        taxPercentage?: number,
    ) {
        const transaction = await this.transactionDbRepository.findOne({
            where: { id, status: TransactionStatus.Pending },
            relations: ['owner'],
        });
        if (!transaction) {
            throw new Error(TransactionException.TransactionNotFound);
        }
        await this.transactionDbRepository.save({ id, status, taxPercentage });
        return transaction;
    }

    async findTotalPendingWithdrawalAmount(userId: number) {
        return this.transactionDbRepository
            .sum('amount', {
                owner: { id: userId },
                status: TransactionStatus.Pending,
                type: TransactionType.Withdrawal,
            })
            .then((res) => res || 0);
    }

    async findPendingTransactions(limit: number, offset: number) {
        return this.transactionDbRepository.findAndCount({
            where: { status: TransactionStatus.Pending },
            relations: ['owner'],
            take: limit,
            skip: offset,
            order: {
                createdAt: 'ASC',
            },
        });
    }
}
