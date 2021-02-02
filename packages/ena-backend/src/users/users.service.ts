import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { User, CreateUserInput, UpdateUserInput } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends CrudService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(private userRepository: UserRepository) {
    super(userRepository, User);
  }
}
