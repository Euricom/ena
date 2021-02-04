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
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './category.model';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
  ) {}

  @Query(() => [Category], { name: 'categories', nullable: 'items' })
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  async getCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.findOne(id);
  }

  @Query(() => [Category], { nullable: 'items' })
  getCategoriesByFilter(
    @Args('filter', { type: () => String }) filter: string,
  ) {
    return this.categoryService.findWithFilter(filter);
  }

  @ResolveField('expenses', () => [Expense], { nullable: 'items' })
  async getExpenses(@Parent() category: Category) {
    return this.expenseService.findByIds(
      (category.expenses as unknown) as string[],
    );
  }

  @Mutation(() => Category)
  async createCategory(@Args('data') category: CreateCategoryInput) {
    return this.categoryService.create(category);
  }

  @Mutation(() => Category)
  async updateCategory(@Args('data') category: UpdateCategoryInput) {
    return this.categoryService.update(category);
  }

  @Mutation(() => ID)
  deleteCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.delete(id);
  }

  @Mutation(() => Category)
  restoreCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.restore(id);
  }
}
