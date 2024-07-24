import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userDatabaseRepository: Repository<User>,
    ) {}

    async findById(id: number): Promise<User> {
        return this.userDatabaseRepository.findOne({ where: { id } });
    }

    async isAdminExists() {
        return this.userDatabaseRepository.exists({
            where: { role: Role.Admin },
        });
    }

    async findByUsernameWithPassword(username: string): Promise<User> {
        return this.userDatabaseRepository.findOne({
            where: { username },
            select: { password: true, id: true, username: true, role: true },
        });
    }

    async isExist(username: string) {
        return this.userDatabaseRepository.exists({ where: { username } });
    }

    async save(
        username: string,
        hashedPassword: string,
        role: Role = Role.User,
    ) {
        return this.userDatabaseRepository.save({
            username,
            password: hashedPassword,
            role,
        });
    }

    async increaseBalance(userId: number, amount: number) {
        return this.userDatabaseRepository
            .createQueryBuilder('user')
            .update()
            .set({
                balance: () => `balance + ${amount}`,
            })
            .where('id = :userId', { userId })
            .execute();
    }

    async decreaseBalance(userId: number, amount: number) {
        return this.userDatabaseRepository
            .createQueryBuilder('user')
            .update()
            .set({
                balance: () => `GREATEST(balance - ${amount}, 0)`,
            })
            .where('id = :userId', { userId })
            .execute();
    }
}
