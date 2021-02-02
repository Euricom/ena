import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
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
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository, Category);
  }
}
