import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Category } from "src/categories/category.model";
import { Status } from "src/statuses/status.model";
import { Expense } from "./expense.model";

@Resolver(of => Expense)
export class ExpensesResolver {
  constructor(
  ) {}

  @Query(retuns => [Expense], {name: 'expenses', nullable: 'items'})
  async getExpenses() {
    return [
      {
        id: 1,
    },
    {
      id: 2,
    }
    ]
  }

  @Query(returns => Expense, {name: 'expense'})
  async getExpense(@Args('id', { type: () => Int }) id: number) {
    return {
        id: id,
    };
  }

  @ResolveField('status', returns => Status)
  async getStatus(@Parent() expense: Expense) {
    const { id } = expense;
    return {id}
  }

  @ResolveField('category', returns => Category)
  async getCategory(@Parent() expense: Expense) {
    const { id } = expense;
    return {id}
  }
}