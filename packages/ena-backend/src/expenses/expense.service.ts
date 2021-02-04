import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/transactional-repository.provider';
import {
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput,
} from './expense.model';
import { StatusType } from 'src/statuses/status.enum';
import { ExpenseRepository } from './expense.repository';
import { Status } from 'src/statuses/status.model';

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

  create(createData: CreateExpenseInput): Promise<Expense> {
    const expense = new Expense(createData);
    const status = new Status();
    status.user = expense.user;
    expense.statuses = [status];
    return this.expenseRepository.save(expense);
  }

  async findByStatusType(statusType: StatusType): Promise<Expense[]> {
    return await this.expenseRepository.findByStatusType(statusType);
  }
}
