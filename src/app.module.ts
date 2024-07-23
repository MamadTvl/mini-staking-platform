import { Module } from '@nestjs/common';
import { HelloControllerModule } from './infrastructure/controller/hello/hello-controller.module';
import { MikroOrmInterceptor } from './infrastructure/common/interceptor/mikro-orm.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [HelloControllerModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: MikroOrmInterceptor,
        },
    ],
})
export class AppModule {}
