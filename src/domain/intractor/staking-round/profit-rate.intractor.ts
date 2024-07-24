export interface ProfitRateIntractor {
    addProfitRate(id: number, percentage: number): Promise<void>;
}
