import { IsNumber, IsPositive, Max } from 'class-validator';

export class ApproveTransactionDto {
    @IsNumber()
    @IsPositive()
    transactionId: number;

    @IsNumber()
    @IsPositive()
    @Max(1)
    taxPercentage: number;
}

export class RejectTransactionDto {
    @IsNumber()
    @IsPositive()
    transactionId: number;
}
