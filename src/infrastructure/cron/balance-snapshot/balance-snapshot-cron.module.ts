import { Module } from '@nestjs/common';
import { BalanceSnapshotCron } from './balance-snapshot.cron';
import { BalanceModule } from '@/use-case/balance/balance.module';

@Module({
    imports: [BalanceModule],
    providers: [BalanceSnapshotCron],
})
export class BalanceSnapshotCronModule {}
