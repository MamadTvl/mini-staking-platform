export interface DepositIntractor {
    requestForDepositTransaction(userId: number, amount: number): Promise<void>;

    depositAcceptedTransaction(userId: number, amount: number): Promise<void>;
}
