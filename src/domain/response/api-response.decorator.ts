import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from './response.dto';

export const ApiSchemaResponse = <TModel extends Type<any>>(
    model: TModel,
    options: { status: number } = { status: 200 },
) => {
    return applyDecorators(
        ApiExtraModels(ResponseDto, model),
        ApiResponse({
            status: options.status,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: { $ref: getSchemaPath(model) },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiArrayResponse = <TModel extends Type<any>>(
    model: TModel,
    options: {
        status: number;
    } = { status: 200 },
) => {
    return applyDecorators(
        ApiExtraModels(ResponseDto, model),
        ApiResponse({
            status: options.status,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiBoolResponse = (
    options: { status: number } = { status: 200 },
) => {
    return applyDecorators(
        ApiExtraModels(ResponseDto),
        ApiResponse({
            status: options.status,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'boolean',
                            },
                        },
                    },
                ],
            },
        }),
    );
};

export const ApiStringResponse = (
    options: { status: number } = { status: 200 },
) => {
    return applyDecorators(
        ApiExtraModels(ResponseDto),
        ApiResponse({
            status: options.status,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'string',
                            },
                        },
                    },
                ],
            },
        }),
    );
};
