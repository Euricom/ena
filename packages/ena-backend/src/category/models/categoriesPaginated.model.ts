import { ObjectType } from '@nestjs/graphql';
import { PaginationResultClass } from 'src/common/models/pagination.model';
import { Category } from './category.model';

@ObjectType()
export class CategoriesPaginated extends PaginationResultClass(Category) {}
