import { TransactionReviewIntractor } from '@/domain/intractor/transaction/transaction-review.intractor';
import {
    Transaction,
    TransactionStatus,
    TransactionType,
} from '@/infrastructure/db/entities/transaction.entity';
import { TransactionRepository } from '@/infrastructure/repository/transaction.repository';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class TransactionReviewUseCase implements TransactionReviewIntractor {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async getPendingTransactions(
        limit: number,
        offset: number,
    ): Promise<[Transaction[], number]> {
        return this.transactionRepository.findPendingTransactions(
            limit,
            offset,
        );
    }

    @Transactional()
    async approveTransaction(id: number, taxPercentage: number): Promise<void> {
        const transaction =
            await this.transactionRepository.updatePendingTransaction(
                id,
                TransactionStatus.Accepted,
                taxPercentage,
            );
        const taxAmount = transaction.amount * taxPercentage;
        let amountLeft = transaction.amount;
        if (transaction.type === TransactionType.Deposit) {
            amountLeft = transaction.amount - taxAmount;
            await this.userRepository.increaseBalance(
                transaction.owner.id,
                amountLeft,
            );
            return;
        }
        await this.userRepository.decreaseBalance(
            transaction.owner.id,
            amountLeft,
        );
    }

    async rejectTransaction(id: number): Promise<void> {
        await this.transactionRepository.updatePendingTransaction(
            id,
            TransactionStatus.Rejected,
        );
    }
}
