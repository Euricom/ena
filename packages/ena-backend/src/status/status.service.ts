import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services/crud.service';
import { PaginationInput } from 'src/common/models/inputs/pagination.input';
import { TransactionalRepositoryProvider } from 'src/common/services/transactionalRepository.provider';
import { StatusType } from './status.enum';
import { Status } from './models/status.model';
import { CreateStatusInput } from './models/inputs/createStatus.input';
import { UpdateStatusInput } from './models/inputs/updateStatus.input';
import { StatusesPaginated } from './models/statusesPaginated.model';
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

  findByTypePaginated(
    type: StatusType,
    onlyIfLatest: boolean,
    paginationData: PaginationInput,
  ): Promise<StatusesPaginated> {
    return this.statusRepository.findByTypeAndCount(type, onlyIfLatest, {
      take: paginationData.take,
      skip: paginationData.skip,
    });
  }
}
