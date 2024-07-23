import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
        .setTitle('Iran Academy')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth(
            {
                bearerFormat: 'Bearer ',
                type: 'http',
                name: 'authorization',
                in: 'header',
            },
            'user-auth',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    });

    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: false,
            forbidUnknownValues: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
