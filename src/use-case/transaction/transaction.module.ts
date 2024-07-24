import { Module } from '@nestjs/common';
import { DepositUseCase } from './deposit.use-case';
import { WithdrawalUseCase } from './withdrawal.use-case';
import { TransactionReviewUseCase } from './transaction-review.use-case';
import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';

@Module({
    imports: [RepositoriesModule],
    providers: [DepositUseCase, WithdrawalUseCase, TransactionReviewUseCase],
    exports: [DepositUseCase, WithdrawalUseCase, TransactionReviewUseCase],
})
export class TransactionModule {}
