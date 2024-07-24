import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDto, PageMetaDtoParameters } from './page-meta.dto';

export class PaginationDto<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly rows: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;

    constructor(data: T[], options: PageMetaDtoParameters) {
        this.rows = data;
        this.meta = new PageMetaDto(options);
    }
}
