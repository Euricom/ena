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
  ExpensesPaginated,
  UpdateExpenseInput,
} from './expense.model';
import { ExpenseService } from './expense.service';
import { StatusType } from 'src/statuses/status.enum';
import { PaginationInput } from 'src/common/pagination.model';

@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private statusService: StatusService,
  ) {}

  //#region queries

  @Query(() => [Expense], { nullable: 'items' })
  async getExpenses(): Promise<Expense[]> {
    return await this.expenseService.findAll();
  }

  @Query(() => ExpensesPaginated)
  async getExpensesPaginated(
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<ExpensesPaginated> {
    return await this.expenseService.findAllPaginated(paginationData);
  }

  @Query(() => Expense)
  async getExpense(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Expense> {
    return await this.expenseService.findOne(id);
  }

  @Query(() => [Expense], { nullable: 'items' })
  async getExpensesByStatusType(
    @Args('statusType', { type: () => StatusType })
    type: StatusType,
  ): Promise<Expense[]> {
    return await this.expenseService.findByStatusType(type);
  }

  @Query(() => ExpensesPaginated)
  async getExpensesByStatusTypePaginated(
    @Args('statusType', { type: () => StatusType })
    type: StatusType,
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<ExpensesPaginated> {
    return await this.expenseService.findByStatusTypePaginated(
      type,
      paginationData,
    );
  }

  @Query(() => [Expense], { nullable: 'items' })
  async getExpensesByFilter(
    @Args('filter', { type: () => String })
    filter: string,
  ): Promise<Expense[]> {
    return await this.expenseService.findWithFilter(filter);
  }

  @Query(() => ExpensesPaginated)
  async getExpensesByFilterPaginated(
    @Args('filter', { type: () => String })
    filter: string,
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<ExpensesPaginated> {
    return await this.expenseService.findWithFilterPaginated(
      filter,
      paginationData,
    );
  }

  //#endregion

  //#region field resolvers

  @ResolveField('user', () => User)
  async getUser(
    @Parent()
    expense: Expense,
  ): Promise<User> {
    return await this.userService.findOne((expense.user as unknown) as string);
  }

  @ResolveField('category', () => Category)
  async getCategory(
    @Parent()
    expense: Expense,
  ): Promise<Category> {
    return await this.categoryService.findOne(
      (expense.category as unknown) as string,
    );
  }

  @ResolveField('latestStatus', () => Status)
  async getLatestStatus(
    @Parent()
    expense: Expense,
  ): Promise<Status> {
    return await this.statusService.findLatestFrom(
      (expense.statuses as unknown) as string[],
    );
  }

  @ResolveField('statuses', () => [Status], { nullable: 'items' })
  async getStatuses(
    @Parent()
    expense: Expense,
  ): Promise<Status[]> {
    return await this.statusService.findByIds(
      (expense.statuses as unknown) as string[],
    );
  }

  //#endregion

  //#region mutations

  @Mutation(() => Expense)
  async createExpense(
    @Args('data')
    expense: CreateExpenseInput,
  ): Promise<Expense> {
    return await this.expenseService.create(expense);
  }

  @Mutation(() => Expense)
  async updateExpense(
    @Args('data')
    expense: UpdateExpenseInput,
  ): Promise<Expense> {
    return await this.expenseService.update(expense);
  }

  @Mutation(() => Expense)
  async deleteExpense(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<string> {
    return await this.expenseService.delete(id);
  }

  @Mutation(() => Expense)
  async restoreExpense(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Expense> {
    return await this.expenseService.restore(id);
  }

  //#endregion
}
