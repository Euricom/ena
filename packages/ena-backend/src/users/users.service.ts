import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/transactional-repository.provider';
import { Repository } from 'typeorm';
import { User, CreateUserInput, UpdateUserInput } from './user.model';

@Injectable()
export class UserService extends CrudService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  get userRepository(): Repository<User> {
    return this.transactionalRepository.getRepository(User);
  }

  constructor(
    private transactionalRepository: TransactionalRepositoryProvider,
  ) {
    super(transactionalRepository.getRepository(User), User);
  }
}
