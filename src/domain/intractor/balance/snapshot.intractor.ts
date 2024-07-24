export interface SnapshotIntractor {
    snapshotBalances(date: string): Promise<void>;
}
