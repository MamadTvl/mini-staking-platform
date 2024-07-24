export interface AverageBalanceIntractor {
    calculate(stakingRoundId: number): Promise<void>;
}
// ((prv_count) * prv_avg + new_num) / n + 1
