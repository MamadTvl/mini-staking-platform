export interface WithdrawalIntractor {
    withdrawRequest(userId: number, amount: number): Promise<void>;
}
