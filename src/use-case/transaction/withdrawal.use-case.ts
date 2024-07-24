import { TransactionException } from '@/domain/exception/transaction-exception.enum';
import { WithdrawalIntractor } from '@/domain/intractor/transaction/withdrawal.intractor';
import { TransactionType } from '@/infrastructure/db/entities/transaction.entity';
import { TransactionRepository } from '@/infrastructure/repository/transaction.repository';
import { UserRepository } from '@/infrastructure/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WithdrawalUseCase implements WithdrawalIntractor {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async withdrawRequest(userId: number, amount: number): Promise<void> {
        const { balance } = await this.userRepository.findById(userId);
        const totalWithdrawRequests =
            await this.transactionRepository.findTotalPendingWithdrawalAmount(
                userId,
            );
        if (balance - totalWithdrawRequests < amount) {
            throw new Error(TransactionException.InsufficientBalance);
        }
        await this.transactionRepository.save(
            userId,
            amount,
            TransactionType.Withdrawal,
        );
    }
}
