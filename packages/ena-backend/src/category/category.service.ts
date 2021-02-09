import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/services/transactionalRepository.provider';
import { Repository } from 'typeorm';
import { Category } from './models/category.model';
import { CreateCategoryInput } from './models/inputs/createCategory.input';
import { UpdateCategoryInput } from './models/inputs/updateCategory.input';

@Injectable()
export class CategoryService extends CrudService<
  Category,
  CreateCategoryInput,
  UpdateCategoryInput
> {
  get categoryRepository(): Repository<Category> {
    return this.transactionalRepository.getRepository(Category);
  }

  constructor(
    private transactionalRepository: TransactionalRepositoryProvider,
  ) {
    super(transactionalRepository.getRepository(Category), Category);
  }
}
