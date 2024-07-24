import { IsNumber, IsPositive, Max, Min } from 'class-validator';

export class AddProfitRateDto {
    @IsNumber()
    @IsPositive()
    stakingRoundId: number;

    @IsNumber()
    @Min(0)
    @Max(1)
    percentage: number;
}
