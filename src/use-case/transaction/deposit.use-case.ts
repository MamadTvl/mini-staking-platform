import { DepositIntractor } from '@/domain/intractor/transaction/deposit.intractor';
import {
    TransactionStatus,
    TransactionType,
} from '@/infrastructure/db/entities/transaction.entity';
import { TransactionRepository } from '@/infrastructure/repository/transaction.repository';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DepositUseCase implements DepositIntractor {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async requestForDepositTransaction(
        userId: number,
        amount: number,
    ): Promise<void> {
        await this.transactionRepository.save(
            userId,
            amount,
            TransactionType.Deposit,
        );
    }

    @Transactional()
    async depositAcceptedTransaction(
        userId: number,
        amount: number,
    ): Promise<void> {
        await this.transactionRepository.save(
            userId,
            amount,
            TransactionType.Deposit,
            TransactionStatus.Accepted,
        );
        await this.userRepository.increaseBalance(userId, amount);
    }
}
