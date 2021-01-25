import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Expense } from "src/expenses/expense.model";
import { ExpenseService } from "src/expenses/expense.service";
import { Status } from "src/statuses/status.model";
import { StatusService } from "src/statuses/status.service";
import { User, CreateUserInput, UpdateUserInput } from "./user.model";
import { UserService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
    private statusService: StatusService
  ) {}

  @Query(retuns => [User], {name: 'users', nullable: 'items'})
  getUsers() {
    return this.userService.findAll()
  }

  @Query(returns => User, {name: 'user'})
  async getUser(@Args('id', { type: () => Int }) id: string) {
    const user = this.userService.findOne(id);
    return user;
  }

  @ResolveField('expenses', returns => [Expense], {nullable: 'items'})
  async getExpenses(@Parent() user: User) {
    return this.expenseService.findByIds(user.expenses as unknown as string[])
  }

  @ResolveField('statuses', returns => [Status], {nullable: 'items'})
  async getStatuses(@Parent() user: User) {
    return this.statusService.findByIds(user.statuses as  unknown as string[])
  }

  @Mutation(returns => User)
  async createUser(@Args('data') user: CreateUserInput) {
    return this.userService.create(user)
  }

  @Mutation(returns => User)
  async updateUser(@Args('data') user: UpdateUserInput) {
    return this.userService.update(user)
  }

  @Mutation(returns => User, {nullable: true})
  deleteUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.delete(id)
  }
  
  @Mutation(returns => User, {nullable: true})
  restoreUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.restore(id)
  }
}