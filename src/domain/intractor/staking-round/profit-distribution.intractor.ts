export interface ProfitDistributionIntractor {
    distribute(stakingRoundId: number): Promise<void>;
}
