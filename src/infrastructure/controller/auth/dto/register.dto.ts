import { IsString, Length } from 'class-validator';

export class RegisterDto {
    @IsString()
    @Length(3)
    username: string;

    @Length(6)
    password: string;
}
