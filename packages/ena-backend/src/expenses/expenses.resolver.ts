import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Category } from "src/categories/category.model";
import { CategoryService } from "src/categories/category.service";
import { Status } from "src/statuses/status.model";
import { StatusService } from "src/statuses/status.service";
import { User } from "src/users/user.model";
import { UserService } from "src/users/users.service";
import { Connection } from "typeorm";
import { ExpenseInput, Expense } from "./expense.model";
import { ExpenseService } from "./expense.service";

@Resolver(of => Expense)
export class ExpensesResolver {
  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    ) {}

  @Query(retuns => [Expense], {name: 'expenses', nullable: 'items'})
  async getExpenses() {
    return this.expenseService.findAll()
  }

  @Query(returns => Expense, {name: 'expense'})
  async getExpense(@Args('id', { type: () => Int }) id: string) {
    return this.expenseService.findOne(id)
  }

  @ResolveField('user', returns => User)
  async getUser(@Parent() expense: Expense) {
    return this.userService.findOne(expense.user as unknown as string)
  }

  @ResolveField('category', returns => Category)
  async getCategory(@Parent() expense: Expense) {
    return this.categoryService.findOne(expense.category as unknown as string)
  }

  @ResolveField('statuses', returns => [Status], {nullable: 'items'})
  async getStatuses(@Parent() expense: Expense) {
    return this.statusService.findByIds(expense.statuses as unknown as string[])
  }

  @Mutation(returns => Expense)
  async createExpense(@Args('data') expense: ExpenseInput) {
    const e = await this.expenseService.create(expense)
    await this.statusService.create({
      userId: expense.userId,
      expenseId: e.id
    })

    return this.expenseService.findOne(e.id)
  }
}