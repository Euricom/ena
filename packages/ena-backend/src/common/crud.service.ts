import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Crud, UpdateCrudInput } from "./crud.model";

@Injectable()
    // TODO: kan type beter gedaan worden?
export class CrudService<T, C, U extends UpdateCrudInput> {
    constructor(
        private repository: Repository<T>,
    ) {}

    findAll(): Promise<T[]> {
        return this.repository.find({loadRelationIds: true});
    }
    
    findOne(id: string): Promise<T> {
        return this.repository.findOne(id, {loadRelationIds: true});
    }

    findByIds(ids: string[]): Promise<T[]> {
        return this.repository.findByIds(ids, {loadRelationIds: true});
    }

    create(item: C): Promise<T> {
        return this.repository.save(item)
    }

    async update(item: U): Promise<T> {
        const oldItem = await this.repository.findOneOrFail(item.id, {loadRelationIds: true})
        const newItem = {...oldItem, ...item}
        return this.repository.save(newItem)
    }

    async delete(id: string): Promise<string> {
        await this.repository.softDelete(id);
        return id;
    }

    async restore(id: string): Promise<T> {
        await this.repository.restore(id)
        return this.repository.findOne(id, {loadRelationIds: true})
    }
}