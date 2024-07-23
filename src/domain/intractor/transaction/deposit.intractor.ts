export interface DepositIntractor {
    askForDepositTransaction(userId: number, amount: number): Promise<void>;

    depositAcceptedTransaction(userId: number, amount: number): Promise<void>;
}
