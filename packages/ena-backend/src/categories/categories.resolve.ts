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
import {
  Category,
  CreateCategoryInput,
  CategoriesPaginated,
  UpdateCategoryInput,
} from './category.model';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
  ) {}

  //#region queries

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Query(() => CategoriesPaginated)
  async getCategoriesPaginated(
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<CategoriesPaginated> {
    return await this.categoryService.findAllPaginated(paginationData);
  }

  @Query(() => Category)
  async getCategory(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Query(() => [Category], { nullable: 'items' })
  getCategoriesByFilter(
    @Args('filter', { type: () => String })
    filter: string,
  ): Promise<Category[]> {
    return this.categoryService.findWithFilter(filter);
  }

  @Query(() => CategoriesPaginated)
  getCategoriesByFilterPaginated(
    @Args('filter', { type: () => String })
    filter: string,
    @Args('pagination')
    paginationData: PaginationInput,
  ): Promise<CategoriesPaginated> {
    return this.categoryService.findWithFilterPaginated(filter, paginationData);
  }

  //#endregion

  //#region field resolvers

  @ResolveField('expenses', () => [Expense], { nullable: 'items' })
  async getExpenses(
    @Parent()
    category: Category,
  ): Promise<Expense[]> {
    return await this.expenseService.findByIds(
      (category.expenses as unknown) as string[],
    );
  }

  //#endregion

  //#region mutations

  @Mutation(() => Category)
  async createCategory(
    @Args('data')
    category: CreateCategoryInput,
  ): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('data')
    category: UpdateCategoryInput,
  ): Promise<Category> {
    return await this.categoryService.update(category);
  }

  @Mutation(() => ID)
  async deleteCategory(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<string> {
    return await this.categoryService.delete(id);
  }

  @Mutation(() => Category)
  async restoreCategory(
    @Args('id', { type: () => ID })
    id: string,
  ): Promise<Category> {
    return await this.categoryService.restore(id);
  }

  //#endregion
}
