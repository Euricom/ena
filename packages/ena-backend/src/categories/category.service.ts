import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, CreateCategoryInput, UpdateCategoryInput } from './category.model';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) {}
    
    findAll(): Promise<Category[]> {
        return this.categoriesRepository.find({loadRelationIds: true});
    }
    
    findOne(id: string): Promise<Category> {
        return this.categoriesRepository.findOne(id, {loadRelationIds: true});
    }

    findByIds(ids: string[]): Promise<Category[]> {
        return this.categoriesRepository.findByIds(ids, {loadRelationIds: true});
    }

    create(category: CreateCategoryInput): Promise<Category> {
        return this.categoriesRepository.save(category)
    }

    async update(category: UpdateCategoryInput): Promise<Category> {
        const oldCategory = await this.categoriesRepository.findOneOrFail(category.id)
        const newCategory = {...oldCategory, ...category}
        console.log(newCategory)
        return this.categoriesRepository.save(newCategory)
    }
}
