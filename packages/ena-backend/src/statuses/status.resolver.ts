import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationInput } from 'src/common/pagination.model';
import { Expense } from 'src/expenses/expense.model';
import { ExpenseService } from 'src/expenses/expense.service';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/user.service';
import { StatusType } from './status.enum';
import {
  Status,
  CreateStatusInput,
  UpdateStatusInput,
  StatusesPaginated,
} from './status.model';
import { StatusService } from './status.service';

@Resolver(() => Status)
export class StatusResolver {
  constructor(
    private statusService: StatusService,
    private userService: UserService,
    private expenseService: ExpenseService,
  ) {}

  //#region queries

  @Query(() => [Status], { nullable: 'items' })
  async getStatuses(): Promise<Status[]> {
    return await this.statusService.findAll();
  }

  @Query(() => StatusesPaginated)
  async getStatusesPaginated(
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<StatusesPaginated> {
    return await this.statusService.findAllPaginated(paginationData);
  }

  @Query(() => Status)
  async getStatus(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Status> {
    return await this.statusService.findOne(id);
  }

  @Query(() => [Status], { nullable: 'items' })
  async getStatusesByType(
    @Args('type', { type: () => StatusType })
    type: StatusType,
    @Args('onlyIfLatest', { type: () => Boolean, defaultValue: false })
    onlyIfLatest?: boolean,
  ): Promise<Status[]> {
    return await this.statusService.findByType(type, onlyIfLatest);
  }

  @Query(() => StatusesPaginated)
  async getStatusesByTypePaginated(
    @Args('type', { type: () => StatusType })
    type: StatusType,
    @Args('pagination')
    paginationData: PaginationInput,
    @Args('onlyIfLatest', { type: () => Boolean, defaultValue: false })
    onlyIfLatest?: boolean,
  ): Promise<StatusesPaginated> {
    return await this.statusService.findByTypePaginated(
      type,
      onlyIfLatest,
      paginationData,
    );
  }

  @Query(() => [Status], { nullable: 'items' })
  async getStatusesByFilter(
    @Args('filter', { type: () => String })
    filter: string,
  ): Promise<Status[]> {
    return await this.statusService.findWithFilter(filter);
  }

  @Query(() => StatusesPaginated)
  async getStatusesByFilterPaginated(
    @Args('filter', { type: () => String })
    filter: string,
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<StatusesPaginated> {
    return await this.statusService.findWithFilterPaginated(
      filter,
      paginationData,
    );
  }

  //#endregion

  //#region field resolvers

  @ResolveField('user', () => User)
  async getUser(
    @Parent()
    status: Status,
  ): Promise<User> {
    return await this.userService.findOne((status.user as unknown) as string);
  }

  @ResolveField('expense', () => Expense)
  async getExpense(
    @Parent()
    status: Status,
  ): Promise<Expense> {
    return await this.expenseService.findOne(
      (status.expense as unknown) as string,
    );
  }

  //#endregion

  //#region mutations

  @Mutation(() => Status)
  async createStatus(
    @Args('data')
    status: CreateStatusInput,
  ): Promise<Status> {
    return await this.statusService.create(status);
  }

  @Mutation(() => Status)
  async updateStatus(
    @Args('data')
    status: UpdateStatusInput,
  ): Promise<Status> {
    return await this.statusService.update(status);
  }

  @Mutation(() => Status)
  async deleteStatus(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<string> {
    return await this.statusService.delete(id);
  }

  @Mutation(() => Status)
  async restoreStatus(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Status> {
    return await this.statusService.restore(id);
  }

  //#endregion
}
