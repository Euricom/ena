import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/services/transactionalRepository.provider';
import { Expense } from './models/expense.model';
import { ExpensesPaginated } from './models/expensesPaginated.model';
import { UpdateExpenseInput } from './models/inputs/updateExpense.input';
import { CreateExpenseInput } from './models/inputs/createExpense.input';
import { StatusType } from 'src/status/status.enum';
import { ExpenseRepository } from './expense.repository';
import { Status } from 'src/status/models/status.model';
import { PaginationInput } from 'src/common/models/inputs/pagination.input';

@Injectable()
export class ExpenseService extends CrudService<
  Expense,
  CreateExpenseInput,
  UpdateExpenseInput
> {
  get expenseRepository(): ExpenseRepository {
    return this.transactionalRepository.getCustomRepository(ExpenseRepository);
  }

  constructor(
    private transactionalRepository: TransactionalRepositoryProvider,
  ) {
    super(
      transactionalRepository.getCustomRepository(ExpenseRepository),
      Expense,
    );
  }

  async create(createData: CreateExpenseInput): Promise<Expense> {
    const expense = new Expense(createData);
    const status = new Status();
    status.user = expense.user;
    expense.statuses = [status];
    return await this.expenseRepository.save(expense);
  }

  async findByStatusType(statusType: StatusType): Promise<Expense[]> {
    return await this.expenseRepository.findByStatusType(statusType);
  }

  async findByStatusTypePaginated(
    statusType: StatusType,
    paginationData: PaginationInput,
  ): Promise<ExpensesPaginated> {
    return this.expenseRepository.findByStatusTypeAndCount(statusType, {
      skip: paginationData.skip,
      take: paginationData.take,
    });
  }
}
