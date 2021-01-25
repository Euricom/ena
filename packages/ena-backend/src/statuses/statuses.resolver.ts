import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Expense } from "src/expenses/expense.model";
import { ExpenseService } from "src/expenses/expense.service";
import { User } from "src/users/user.model";
import { UserService } from "src/users/users.service";
import { Status, StatusInput } from "./status.model";
import { StatusService } from "./status.service";
// import { StatusType } from "./statusType.model";

@Resolver(of => Status)
export class StatusesResolver {
  constructor(
    private statusService: StatusService,
    private userService: UserService,
    private expenseService: ExpenseService
  ) {}

  @Query(retuns => [Status], {name: 'statuses', nullable: 'items'})
  async getStatuses() {
    return this.statusService.findAll()
  }

  @Query(returns => Status, {name: 'status'})
  async getStatus(@Args('id', { type: () => Int }) id: string) {
    return this.statusService.findOne(id)
  }

  @ResolveField('user', returns => User) 
  async getUser(@Parent() status: Status) {
    return this.userService.findOne(status.user as unknown as string)
  }

  @ResolveField('expense', returns => Expense) 
  async getExpense(@Parent() status: Status) {
    return this.expenseService.findOne(status.expense as unknown as string)
  }

  @Mutation(returns => Status, {name: 'status'})
  async createStatus(@Args('data') status: StatusInput) {
    return this.statusService.create(status)
  }
}