import { Module } from '@nestjs/common';
import { EnvConfigModule } from './infrastructure/config/env/env.module';
import { AuthControllerModule } from './infrastructure/controller/auth/auth-controller.module';
import { AuthModule } from './use-case/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { JobsModule } from './infrastructure/job/job.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BalanceSnapshotCronModule } from './infrastructure/cron/balance-snapshot/balance-snapshot-cron.module';
import { TransactionControllerModule } from './infrastructure/controller/transaction/transaction-controller.module';
import { StakingRoundControllerModule } from './infrastructure/controller/staking-round/staking-round-controller.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        EnvConfigModule,
        AuthModule,
        PassportModule,
        AuthControllerModule,
        TransactionControllerModule,
        StakingRoundControllerModule,
        JobsModule,
        BalanceSnapshotCronModule,
    ],
    providers: [JwtStrategy, LocalStrategy],
})
export class AppModule {}
