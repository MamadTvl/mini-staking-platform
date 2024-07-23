export interface RegisterIntractor {
    execute(username: string, password: string): Promise<string>;
}
