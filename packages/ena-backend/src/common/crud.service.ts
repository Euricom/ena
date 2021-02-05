import { Injectable } from '@nestjs/common';
import { FindConditions, In, Raw, Repository } from 'typeorm';
import { Crud, UpdateCrudInput } from './crud.interface';
import { PaginationInput, PaginationResultClass } from './pagination.model';

@Injectable()
export class CrudService<T extends Crud, C, U extends UpdateCrudInput> {
  PaginationResultClass = PaginationResultClass<T>(this.type);

  constructor(
    private repository: Repository<T>,
    private type: new (...args: any) => T,
  ) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find({ loadRelationIds: true });
  }

  async findAllPaginated(
    paginationData: PaginationInput,
  ): Promise<typeof PaginationResultClass> {
    const result = await this.repository.findAndCount({
      loadRelationIds: true,
      skip: paginationData.skip,
      take: paginationData.take,
    });
    return new this.PaginationResultClass(...result);
  }

  async findOne(id: string): Promise<T> {
    return await this.repository.findOne(id, { loadRelationIds: true });
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return await this.repository.findByIds(ids, { loadRelationIds: true });
  }

  async findByIdsPaginated(
    ids: string[],
    paginationData: PaginationInput,
  ): Promise<typeof PaginationResultClass> {
    const result = await this.repository.findAndCount({
      loadRelationIds: true,
      where: { id: In(ids) },
      skip: paginationData.skip,
      take: paginationData.take,
    });
    return new this.PaginationResultClass(...result);
  }

  async findWithFilter(filter: string): Promise<T[]> {
    const filterArray = this.createFindFilterArray(filter);
    return await this.repository.find({
      where: filterArray,
      loadRelationIds: true,
    });
  }

  async findWithFilterPaginated(
    filter: string,
    paginationData: PaginationInput,
  ): Promise<typeof PaginationResultClass> {
    const filterArray = this.createFindFilterArray(filter);
    const result = await this.repository.findAndCount({
      where: filterArray,
      loadRelationIds: true,
      skip: paginationData.skip,
      take: paginationData.take,
    });
    return new this.PaginationResultClass(...result);
  }

  async create(createData: C): Promise<T> {
    const entity = new this.type(createData);
    return await this.repository.save(entity as any);
  }

  async update(updateData: U): Promise<T> {
    const entity = await this.repository.findOneOrFail(updateData.id);
    entity.update(updateData);
    return await this.repository.save(entity as any);
  }

  async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);
    return id;
  }

  async restore(id: string): Promise<T> {
    await this.repository.restore(id);
    return await this.repository.findOne(id, { loadRelationIds: true });
  }

  private createFindFilterArray(filter: string): FindConditions<any>[] {
    const entity = new this.type({});
    const filterArray = [];
    Object.getOwnPropertyNames(entity).forEach((prop) => {
      const filterObject = {
        [prop]: Raw(
          (alias) =>
            `LOWER(CAST(${alias} AS TEXT)) LIKE '%${filter.toLowerCase()}%'`,
        ),
      };
      filterArray.push(filterObject);
    });
    return filterArray;
  }
}
