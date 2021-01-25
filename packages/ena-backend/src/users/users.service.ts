import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/expenses/expense.model';
import { In, Repository } from 'typeorm';
import { Role } from './role.enum';
import { User, CreateUserInput, UpdateUserInput } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    
    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id, {loadRelationIds: true});
    }

    findByIds(ids: string[]): Promise<User[]> {
        return this.usersRepository.findByIds(ids, {loadRelationIds: true});
    }

    create(user: CreateUserInput): Promise<User> {
        return this.usersRepository.save(user)
    }

   async update(user: UpdateUserInput): Promise<User> {
        const userOld = await this.usersRepository.findOneOrFail(user.id);
        const userNew = {...userOld, ...user}
        return this.usersRepository.save(userNew) 
    }
    
    async delete(id: string): Promise<void> {
        await this.usersRepository.softDelete(id);
    }

    async restore(id: string): Promise<void> {
        await this.usersRepository.restore(id)
    }
}
