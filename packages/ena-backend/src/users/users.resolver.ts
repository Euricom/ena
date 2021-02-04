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
import { Status } from 'src/statuses/status.model';
import { StatusService } from 'src/statuses/status.service';
import { User, CreateUserInput, UpdateUserInput } from './user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
    private statusService: StatusService,
  ) {}

  @Query(() => [User], { name: 'users', nullable: 'items' })
  getUsers() {
    return this.userService.findAll();
  }

  @Query(() => [User], { nullable: 'items' })
  getUsersByFilter(@Args('filter', { type: () => String }) filter: string) {
    return this.userService.findWithFilter(filter);
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @ResolveField('expenses', () => [Expense], { nullable: 'items' })
  async getExpenses(@Parent() user: User) {
    return this.expenseService.findByIds(
      (user.expenses as unknown) as string[],
    );
  }

  @ResolveField('statuses', () => [Status], { nullable: 'items' })
  async getStatuses(@Parent() user: User) {
    return this.statusService.findByIds((user.statuses as unknown) as string[]);
  }

  @Mutation(() => User)
  async createUser(@Args('data') user: CreateUserInput) {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  async updateUser(@Args('data') user: UpdateUserInput) {
    return this.userService.update(user);
  }

  @Mutation(() => ID)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  restoreUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.restore(id);
  }
}
