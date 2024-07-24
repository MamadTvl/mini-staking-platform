import { TransactionModule } from '@/use-case/transaction/transaction.module';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';

@Module({
    imports: [TransactionModule],
    controllers: [TransactionController],
})
export class TransactionControllerModule {}
