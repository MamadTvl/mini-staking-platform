import { Module } from '@nestjs/common';
import { OrmModule } from '../config/orm/orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [OrmModule, TypeOrmModule.forFeature([])],
    providers: [],
    exports: [],
})
export class RepositoriesModule {}
