import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Crud, UpdateCrudInput } from './crud.model';

@Injectable()
// TODO: kan doorgeven van types beter gedaan worden?
export class CrudService<T extends Crud, C, U extends UpdateCrudInput> {
  constructor(
    private repository: Repository<T>,
    private type: new (args?: any) => T,
  ) {}

  findAll(): Promise<T[]> {
    return this.repository.find({ loadRelationIds: true });
  }

  findOne(id: string): Promise<T> {
    return this.repository.findOne(id, { loadRelationIds: true });
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.repository.findByIds(ids, { loadRelationIds: true });
  }

  create(createData: C): Promise<T> {
    const entity = new this.type(createData);
    return this.repository.save(entity as any);
  }

  async update(updateData: U): Promise<T> {
    const entity = await this.repository.findOneOrFail(updateData.id);
    entity.update(updateData);
    return this.repository.save(entity as any);
  }

  async delete(id: string): Promise<string> {
    await this.repository.softDelete(id);
    return id;
  }

  async restore(id: string): Promise<T> {
    await this.repository.restore(id);
    return this.repository.findOne(id, { loadRelationIds: true });
  }
}
