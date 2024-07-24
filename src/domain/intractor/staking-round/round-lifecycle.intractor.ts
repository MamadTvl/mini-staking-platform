export interface RoundLifecycleIntractor {
    startStakingRound(date: string): Promise<void>;
}
