import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseInput, Expense } from './expense.model';


@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(Expense)
        private expensesRepository: Repository<Expense>
    ) {}
    
    findAll(): Promise<Expense[]> {
        return this.expensesRepository.find({loadRelationIds: true});
    }
    
    findOne(id: string): Promise<Expense> {
        return this.expensesRepository.findOne(id, {loadRelationIds: true});
    }

    findByIds(ids: string[]): Promise<Expense[]> {
        return this.expensesRepository.findByIds(ids, {loadRelationIds: true})
    }

    create(expense: ExpenseInput): Promise<Expense> {
        return this.expensesRepository.save(expense)
    }
}
