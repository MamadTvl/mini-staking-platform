import { SnapshotIntractor } from '@/domain/intractor/balance/snapshot.intractor';
import { BalanceSnapshotRepository } from '@/infrastructure/repository/balance-snapshot.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnapshotUseCase implements SnapshotIntractor {
    constructor(
        private readonly snapshotRepository: BalanceSnapshotRepository,
    ) {}

    async snapshotBalances(date: string): Promise<void> {
        await this.snapshotRepository.takeSnapshot(date);
    }
}
