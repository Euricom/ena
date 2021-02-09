import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/common/services/crud.service';
import { TransactionalRepositoryProvider } from 'src/common/services/transactionalRepository.provider';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { UpdateUserInput } from './models/inputs/updateUser.input';
import { CreateUserInput } from './models/inputs/createUser.input';

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
