import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Expense, ExpenseInput } from "src/expenses/expense.model";
import { ExpenseService } from "src/expenses/expense.service";
import { Category, CreateCategoryInput, UpdateCategoryInput } from "./category.model";
import { CategoryService } from "./category.service";

@Resolver(of => Category)
export class CategoriesResolver {
  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService
  ) {}

  @Query(returns => [Category], {name: 'categories', nullable: 'items'})
  async getCategories() {
    return this.categoryService.findAll()
  }

  @Query(returns => Category, {name: 'category'})
  async getCategory(@Args('id', { type: () => Int }) id: string) {
    return this.categoryService.findOne(id)
  }

  @ResolveField('expenses', returns => [Expense], {nullable: 'items'})
  async getExpenses(@Parent() category: Category) {
    return this.expenseService.findByIds(category.expenses as unknown as string[])
  }

  @Mutation(returns => Category)
  async createCategory(@Args('data') category: CreateCategoryInput) {
    return this.categoryService.create(category)
  }

  @Mutation(returns => Category)
  async updateCategory(@Args('data') category: UpdateCategoryInput) {
    return this.categoryService.update(category)
  }
}