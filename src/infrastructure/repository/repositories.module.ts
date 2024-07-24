import { Module } from '@nestjs/common';
import { OrmModule } from '../config/orm/orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { UserRepository } from './user.repository';
import { Transaction } from '../db/entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { BalanceSnapshot } from '../db/entities/balance-snapshot.entity';
import { StakingRound } from '../db/entities/staking-round.entity';
import { StakingRoundBalance } from '../db/entities/staking-round-balance.entity';
import { StakingRoundRepository } from './staking-round.repository';
import { RoundBalanceRepository } from './staking-round-balance.repository';
import { BalanceSnapshotRepository } from './balance-snapshot.repository';

@Module({
    imports: [
        OrmModule,
        TypeOrmModule.forFeature([
            User,
            Transaction,
            BalanceSnapshot,
            StakingRound,
            StakingRoundBalance,
        ]),
    ],
    providers: [
        UserRepository,
        TransactionRepository,
        StakingRoundRepository,
        RoundBalanceRepository,
        BalanceSnapshotRepository,
    ],
    exports: [
        UserRepository,
        TransactionRepository,
        StakingRoundRepository,
        RoundBalanceRepository,
        BalanceSnapshotRepository,
    ],
})
export class RepositoriesModule {}
