import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationInput } from 'src/common/models/inputs/pagination.input';
import { Expense } from 'src/expense/models/expense.model';
import { ExpenseService } from 'src/expense/expense.service';
import { Status } from 'src/status/models/status.model';
import { StatusService } from 'src/status/status.service';
import { User } from './models/user.model';
import { UsersPaginated } from './models/usersPaginated.model';
import { UpdateUserInput } from './models/inputs/updateUser.input';
import { CreateUserInput } from './models/inputs/createUser.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
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
