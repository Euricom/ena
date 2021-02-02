import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { TransactionalRepositoryProvider } from 'src/unit-of-work/transactional-repository.provider';
import { StatusType } from './status.enum';
import { Status, CreateStatusInput, UpdateStatusInput } from './status.model';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService extends CrudService<
  Status,
  CreateStatusInput,
  UpdateStatusInput
> {
  get statusRepository(): StatusRepository {
    return this.transactionalRepository.getCustomRepository(StatusRepository);
  }

  constructor(
    private transactionalRepository: TransactionalRepositoryProvider,
  ) {
    super(
      transactionalRepository.getCustomRepository(StatusRepository),
      Status,
    );
  }

  findLatestFrom(ids: string[]): Promise<Status> {
    return this.statusRepository.findLatestByIds(ids);
  }

  findByType(type: StatusType, onlyIfLatest: boolean): Promise<Status[]> {
    return this.statusRepository.findByType(type, onlyIfLatest);
  }
}
