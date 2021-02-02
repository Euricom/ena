import { EntityRepository, Repository } from 'typeorm';
import { Expense } from './expense.model';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {}
