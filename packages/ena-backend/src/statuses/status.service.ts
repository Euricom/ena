import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
import { EntityManager, Repository } from 'typeorm';
import { StatusType } from './status.enum';
import { Status, CreateStatusInput, UpdateStatusInput } from './status.model';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService extends CrudService<Status, CreateStatusInput, UpdateStatusInput> {
    constructor(
        private statusRepository: StatusRepository,
    ) {
        super(statusRepository)
    }

    findLatestFrom(ids: string[]): Promise<Status> {
        return this.statusRepository.findLatestByIds(ids)
    }

    findByType(type: StatusType, onlyIfLatest: boolean): Promise<Status[]> {
        return this.statusRepository.findByType(type, onlyIfLatest)
    }

    create(createData: CreateStatusInput, repository: Repository<Status> = this.statusRepository): Promise<Status> {
        const status = new Status(createData);
        return repository.save(status)
    }

    async update(updateData: UpdateStatusInput): Promise<Status> {
        const status = await this.statusRepository.findOneOrFail(updateData.id, {loadRelationIds: true});
        status.update(updateData)
        return this.statusRepository.save(status);
    }
}
