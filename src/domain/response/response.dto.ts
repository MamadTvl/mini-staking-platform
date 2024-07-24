import { ApiProperty } from '@nestjs/swagger';

export enum ResponseStatus {
    Success = 'success',
    Error = 'error',
}

export class ResponseDto<T> {
    @ApiProperty()
    data: T;

    @ApiProperty()
    message: string;

    @ApiProperty()
    status: ResponseStatus;

    constructor(
        data: T,
        message: string,
        status: ResponseStatus = ResponseStatus.Success,
    ) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
