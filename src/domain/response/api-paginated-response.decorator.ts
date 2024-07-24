import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '@/infrastructure/common/pagination/dto/pagination.dto';
import { ResponseStatus } from './response.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiExtraModels(PaginationDto, model),
        ApiOkResponse({
            description: `'Successfully received ${
                model.name || 'model'
            } list'`,
            schema: {
                allOf: [
                    {
                        properties: {
                            data: {
                                $ref: getSchemaPath(PaginationDto),
                            },
                            status: {
                                type: 'enum',
                                enum: [
                                    ResponseStatus.Success,
                                    ResponseStatus.Error,
                                ],
                            },
                            message: {
                                type: 'string',
                            },
                        },
                    },
                    {
                        properties: {
                            data: {
                                properties: {
                                    rows: {
                                        type: 'array',
                                        items: { $ref: getSchemaPath(model) },
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
