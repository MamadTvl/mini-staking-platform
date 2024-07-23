import { Module } from '@nestjs/common';
import { OrmModule } from '../config/orm/orm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { UserRepository } from './user.repository';
import { Transaction } from '../db/entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Module({
    imports: [OrmModule, TypeOrmModule.forFeature([User, Transaction])],
    providers: [UserRepository, TransactionRepository],
    exports: [UserRepository, TransactionRepository],
})
export class RepositoriesModule {}
