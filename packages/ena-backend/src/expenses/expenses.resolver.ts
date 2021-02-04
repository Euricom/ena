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
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';
import {
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput,
} from './expense.model';
import { ExpenseService } from './expense.service';
import { StatusType } from 'src/statuses/status.enum';

@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private statusService: StatusService,
  ) {}

  @Query(() => [Expense], { name: 'expenses', nullable: 'items' })
  async getExpenses() {
    return this.expenseService.findAll();
  }

  @Query(() => Expense, { name: 'expense' })
  async getExpense(@Args('id', { type: () => ID }) id: string) {
    return this.expenseService.findOne(id);
  }

  @Query(() => [Expense], { nullable: 'items' })
  async getExpensesByStatusType(
    @Args('statusType', { type: () => StatusType }) type: StatusType,
  ) {
    return this.expenseService.findByStatusType(type);
  }

  @Query(() => [Expense], { nullable: 'items' })
  getExpensesByFilter(@Args('filter', { type: () => String }) filter: string) {
    return this.expenseService.findWithFilter(filter);
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
    return this.expenseService.create(expense);
  }

  @Mutation(() => Expense)
  async updateExpense(@Args('data') expense: UpdateExpenseInput) {
    return this.expenseService.update(expense);
  }
}
