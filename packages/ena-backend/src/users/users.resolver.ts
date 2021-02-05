import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationInput } from 'src/common/pagination.model';
import { Expense } from 'src/expenses/expense.model';
import { ExpenseService } from 'src/expenses/expense.service';
import { Status } from 'src/statuses/status.model';
import { StatusService } from 'src/statuses/status.service';
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  UsersPaginated,
} from './user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
    private statusService: StatusService,
  ) {}

  //#region queries

  @Query(() => [User], { nullable: 'items' })
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => UsersPaginated)
  async getUsersPaginated(
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<UsersPaginated> {
    return await this.userService.findAllPaginated(paginationData);
  }

  @Query(() => [User], { nullable: 'items' })
  async getUsersByFilter(
    @Args('filter', { type: () => String })
    filter: string,
  ): Promise<User[]> {
    return await this.userService.findWithFilter(filter);
  }

  @Query(() => UsersPaginated)
  async getUsersByFilterPaginated(
    @Args('filter', { type: () => String })
    filter: string,
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<UsersPaginated> {
    return await this.userService.findWithFilterPaginated(
      filter,
      paginationData,
    );
  }

  @Query(() => User)
  async getUser(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<User> {
    return await this.userService.findOne(id);
  }

  //#endregion

  //#region field resolvers

  @ResolveField('expenses', () => [Expense], { nullable: 'items' })
  async getExpenses(
    @Parent()
    user: User,
  ): Promise<Expense[]> {
    return await this.expenseService.findByIds(
      (user.expenses as unknown) as string[],
    );
  }

  @ResolveField('statuses', () => [Status], { nullable: 'items' })
  async getStatuses(
    @Parent()
    user: User,
  ): Promise<Status[]> {
    return this.statusService.findByIds((user.statuses as unknown) as string[]);
  }

  //#endregion

  //#region mutations

  @Mutation(() => User)
  async createUser(
    @Args('data')
    user: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('data')
    user: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.update(user);
  }

  @Mutation(() => ID)
  deleteUser(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<string> {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  restoreUser(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<User> {
    return this.userService.restore(id);
  }

  //#endregion
}
