import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { StatusType } from './status.enum';
import { Status, CreateStatusInput, UpdateStatusInput } from './status.model';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService extends CrudService<
  Status,
  CreateStatusInput,
  UpdateStatusInput
> {
  constructor(private statusRepository: StatusRepository) {
    super(statusRepository, Status);
  }

  findLatestFrom(ids: string[]): Promise<Status> {
    return this.statusRepository.findLatestByIds(ids);
  }

  findByType(type: StatusType, onlyIfLatest: boolean): Promise<Status[]> {
    return this.statusRepository.findByType(type, onlyIfLatest);
  }
}
