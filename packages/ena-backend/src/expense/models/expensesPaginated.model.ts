import { ObjectType } from '@nestjs/graphql';
import { PaginationResultClass } from 'src/common/models/pagination.model';
import { Expense } from './expense.model';

@ObjectType()
export class ExpensesPaginated extends PaginationResultClass(Expense) {}
