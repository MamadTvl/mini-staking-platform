export interface ProfitDistributionIntractor {
    calculateAverageBalances(stakingRoundId: number);

    distribute(stakingRoundId: number): Promise<void>;
}
