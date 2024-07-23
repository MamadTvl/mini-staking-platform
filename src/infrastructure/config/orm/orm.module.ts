import { Config } from '@/domain/config/config.interface';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            async useFactory(configService: ConfigService<Config>) {
                const conf = configService.get('db', { infer: true });
                return {
                    type: 'postgres',
                    logging: conf.logger,
                    host: conf.host,
                    port: conf.port,
                    username: conf.user,
                    password: conf.password,
                    database: conf.name,
                    entities: ['infrastructure/db/entities/*.entity.{js,ts}'],
                    synchronize: false,
                };
            },
        }),
    ],
})
export class OrmModule {}
