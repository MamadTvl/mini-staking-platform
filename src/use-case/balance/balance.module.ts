import { RepositoriesModule } from '@/infrastructure/repository/repositories.module';
import { Module } from '@nestjs/common';
import { SnapshotUseCase } from './snapshot.use-case';
import { AverageBalanceUseCase } from './average-balance.use-case';
import { BullQueueModule } from '@/infrastructure/services/bull/bull-queue.module';

@Module({
    imports: [RepositoriesModule, BullQueueModule],
    providers: [SnapshotUseCase, AverageBalanceUseCase],
    exports: [SnapshotUseCase],
})
export class BalanceModule {}
