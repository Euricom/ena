import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Category } from "./category.model";

@Resolver(of => Category)
export class CategoriesResolver {
  constructor(
  ) {}

  @Query(returns => [Category], {name: 'categories', nullable: 'items'})
  async getCategories() {
    return [
      {
        id: 1,
    },
    {
      id: 2,
    }
    ]
  }

  @Query(returns => Category, {name: 'category'})
  async getCategory(@Args('id', { type: () => Int }) id: number) {
    return {
        id: id,
    };
  }
}