import { StakingRoundBalance } from './../db/entities/staking-round-balance.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoundBalanceRepository {
    constructor(
        @InjectRepository(StakingRoundBalance)
        private readonly srBalanceRepository: Repository<StakingRoundBalance>,
    ) {}

    findRoundBalances(stakingRoundId: number) {
        return this.srBalanceRepository.find({
            where: { stakingRoundId },
        });
    }

    updateBalances(stakingRoundId: number, year: string, month: string) {
        return this.srBalanceRepository.query(`
        insert
            into
            staking_round_has_balance (user_id,
            staking_round_id,
            average_balance,
            snapshot_count)	
        select
            user_id,
            ${stakingRoundId} as staking_round_id,
            avg(bs.balance) as average_balance,
            count(id) as snapshot_count
        from
            balance_snapshots bs
        where
            extract(month from bs.date) = '${month}' and extract(year from bs.date) = '${year}'
        group by
            bs.user_id 
        on conflict (user_id,staking_round_id) do
        update
        set
            average_balance = excluded.average_balance,
            snapshot_count = excluded.snapshot_count`);
    }

    // the idea of this was to incrementally calculate the balances instead of getting average at the end but maybe later !
    incrementBalances(stakingRoundId: number) {
        return this.srBalanceRepository.query(`
        insert
            into
            staking_round_has_balance (user_id,
            staking_round_id,
            average_balance, snapshot_count)	
        select
            u.id as user_id,
            ${stakingRoundId} as staking_round_id,
            case 
                when srb.staking_round_id is not null then (srb.average_balance * srb.snapshot_count + u.balance ) / (srb.snapshot_count + 1)
                else u.balance 
            end as average_balance,
            case 
                when srb.staking_round_id is not null then srb.snapshot_count + 1
                else 1
            end as snapshot_count 
        from
            users u
        left join staking_round_has_balance srb on
            u.id = srb.user_id
            and srb.staking_round_id = ${stakingRoundId}
        on conflict (user_id, staking_round_id) do update set average_balance = excluded.average_balance, snapshot_count= excluded.snapshot_count`);
    }
}
