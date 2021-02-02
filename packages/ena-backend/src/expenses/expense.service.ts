import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
import { StatusService } from 'src/statuses/status.service';
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
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private statusService: StatusService,
  ) {
    super(expenseRepository, Expense);
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
