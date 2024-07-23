import {
    Transaction,
    TransactionStatus,
} from '@/infrastructure/db/entities/transaction.entity';

export interface TransactionReviewIntractor {
    getPendingTransactions(
        limit: number,
        offset: number,
    ): Promise<[Transaction[], number]>;

    approveTransaction(id: number, taxPercentage: number): Promise<void>;

    rejectTransaction(id: number): Promise<void>;
}
