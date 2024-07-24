import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceSnapshot } from '../db/entities/balance-snapshot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceSnapshotRepository {
    constructor(
        @InjectRepository(BalanceSnapshot)
        private readonly balanceSDatabaseRepository: Repository<BalanceSnapshot>,
    ) {}

    takeSnapshot(date: string) {
        return this.balanceSDatabaseRepository.query(`
            insert
                into
                balance_snapshots(
                balance,
                user_id,
                date)
            select
                balance,
                id as user_id,
                '${date}' as date
            from
                users 
            on conflict do nothing`);
    }
}
