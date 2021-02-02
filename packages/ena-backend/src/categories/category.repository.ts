import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.model';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
