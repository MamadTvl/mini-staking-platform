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

    async findByUsernameWithPassword(username: string): Promise<User> {
        return this.userDatabaseRepository.findOne({
            where: { username },
            select: { password: true, id: true, username: true },
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
}
