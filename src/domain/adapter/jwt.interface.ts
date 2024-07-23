export interface JwtPayload {
    userId: number;
}

export interface JwtAdapter {
    checkToken(token: string): Promise<JwtPayload>;
    createToken(payload: JwtPayload): Promise<string>;
}
