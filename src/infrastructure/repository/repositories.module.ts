import { Module } from '@nestjs/common';
import { OrmModule } from '../config/orm/orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [OrmModule, TypeOrmModule.forFeature([User])],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class RepositoriesModule {}
