import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { StatusService } from 'src/statuses/status.service';
import { TransactionalRepositoryProvider } from 'src/unit-of-work/transactional-repository.provider';
import { Repository } from 'typeorm';
import {
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput,
} from './expense.model';

@Injectable()
export class ExpenseService extends CrudService<
  Expense,
  CreateExpenseInput,
  UpdateExpenseInput
> {
  get expenseRepository(): Repository<Expense> {
    return this.transactionalRepository.getRepository(Expense);
  }

  constructor(
    private transactionalRepository: TransactionalRepositoryProvider,
    private statusService: StatusService,
  ) {
    super(transactionalRepository.getRepository(Expense), Expense);
  }

  async create(createData: CreateExpenseInput): Promise<Expense> {
    const expense = new Expense(createData);
    const savedExpense = await this.expenseRepository.save(expense);

    await this.statusService.create({
      userId: savedExpense.user.id,
      expenseId: savedExpense.id,
    });

    return this.findOne(savedExpense.id);
  }
}
