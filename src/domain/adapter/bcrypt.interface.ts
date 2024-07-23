export interface BcryptAdapter {
    hash(hashString: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}
