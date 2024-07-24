import { IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
    @IsNumber()
    @IsPositive()
    amount: number;
}
