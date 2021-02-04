import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/transactional-repository.provider';
import { Repository } from 'typeorm';
import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './category.model';

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
