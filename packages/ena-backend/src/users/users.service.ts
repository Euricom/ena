import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
import { Repository } from 'typeorm';
import { User, CreateUserInput, UpdateUserInput } from './user.model';

@Injectable()
export class UserService extends CrudService<User, CreateUserInput, UpdateUserInput>{
    constructor(
        @InjectRepository(User)
        userRepository: Repository<User>,
    ) {
        super(userRepository)
    }
}
