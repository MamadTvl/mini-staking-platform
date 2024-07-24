import { SnapshotUseCase } from '@/use-case/balance/snapshot.use-case';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class BalanceSnapshotCron {
    constructor(private readonly snapshotUseCase: SnapshotUseCase) {}

    @Cron('* * 0 * * *', {
        utcOffset: 0,
    })
    async triggerSnapshot() {
        await this.snapshotUseCase.addSnapshotJob(moment());
    }
}
