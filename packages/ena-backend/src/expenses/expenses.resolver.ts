import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Category } from 'src/categories/category.model';
import { CategoryService } from 'src/categories/category.service';
import { Status } from 'src/statuses/status.model';
import { StatusService } from 'src/statuses/status.service';
import { UnitOfWorkProvider } from 'src/unit-of-work/unit-of-work.provider';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';
import {
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput,
} from './expense.model';
import { ExpenseService } from './expense.service';

@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    private uow: UnitOfWorkProvider,
  ) {}

  @Query(() => [Expense], { name: 'expenses', nullable: 'items' })
  async getExpenses() {
    return this.expenseService.findAll();
  }

  @Query(() => Expense, { name: 'expense' })
  async getExpense(@Args('id', { type: () => ID }) id: string) {
    return this.expenseService.findOne(id);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() expense: Expense) {
    return this.userService.findOne((expense.user as unknown) as string);
  }

  @ResolveField('category', () => Category)
  async getCategory(@Parent() expense: Expense) {
    return this.categoryService.findOne(
      (expense.category as unknown) as string,
    );
  }

  @ResolveField('latestStatus', () => Status)
  async getLatestStatus(@Parent() expense: Expense) {
    return this.statusService.findLatestFrom(
      (expense.statuses as unknown) as string[],
    );
  }

  @ResolveField('statuses', () => [Status], { nullable: 'items' })
  async getStatuses(@Parent() expense: Expense) {
    return this.statusService.findByIds(
      (expense.statuses as unknown) as string[],
    );
  }

  @Mutation(() => Expense)
  async createExpense(@Args('data') expense: CreateExpenseInput) {
    return this.uow.withTransaction(() => {
      return this.expenseService.create(expense);
    });
  }

  @Mutation(() => Expense)
  async updateExpense(@Args('data') expense: UpdateExpenseInput) {
    return this.expenseService.update(expense);
  }
}
