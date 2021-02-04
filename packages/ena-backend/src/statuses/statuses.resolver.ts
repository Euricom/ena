import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Expense } from 'src/expenses/expense.model';
import { ExpenseService } from 'src/expenses/expense.service';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';
import { StatusType } from './status.enum';
import { Status, CreateStatusInput, UpdateStatusInput } from './status.model';
import { StatusService } from './status.service';

@Resolver(() => Status)
export class StatusesResolver {
  constructor(
    private statusService: StatusService,
    private userService: UserService,
    private expenseService: ExpenseService,
  ) {}

  @Query(() => [Status], { name: 'statuses', nullable: 'items' })
  async getStatuses() {
    return this.statusService.findAll();
  }

  @Query(() => Status, { name: 'status' })
  async getStatus(@Args('id', { type: () => ID }) id: string) {
    return this.statusService.findOne(id);
  }

  @Query(() => [Status], { name: 'statusesByType', nullable: 'items' })
  async getStatusesByType(
    @Args('type', { type: () => StatusType }) type: StatusType,
    @Args('onlyIfLatest', { type: () => Boolean, defaultValue: false })
    onlyIfLatest?: boolean,
  ) {
    return this.statusService.findByType(type, onlyIfLatest);
  }

  @Query(() => [Status], { nullable: 'items' })
  getStatusesByFilter(@Args('filter', { type: () => String }) filter: string) {
    return this.statusService.findWithFilter(filter);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() status: Status) {
    return this.userService.findOne((status.user as unknown) as string);
  }

  @ResolveField('expense', () => Expense)
  async getExpense(@Parent() status: Status) {
    return this.expenseService.findOne((status.expense as unknown) as string);
  }

  @Mutation(() => Status)
  async createStatus(@Args('data') status: CreateStatusInput) {
    return this.statusService.create(status);
  }

  @Mutation(() => Status)
  async updateStatus(@Args('data') status: UpdateStatusInput) {
    return this.statusService.update(status);
  }
}
