import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Role } from './role.enum';
import { StatusType } from './status.enum';
import { Status, StatusInput } from './status.model';
// import { createUserArgs, User } from './user.model';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusesRepository: Repository<Status>,
    ) {}
    
    findAll(): Promise<Status[]> {
        return this.statusesRepository.find({loadRelationIds: true});
    }
    
    findOne(id: string): Promise<Status> {
        return this.statusesRepository.findOne(id, {loadRelationIds: true});
    }

    findByIds(ids: string[]): Promise<Status[]> {
        return this.statusesRepository.findByIds(ids, {loadRelationIds: true});
    }

    create(status: StatusInput): Promise<Status> {
        return this.statusesRepository.save(
            {
                ...status, 
                user: {
                    id: status.userId
                },
                expense: {
                    id: status.expenseId
                }
            }
        );
    }
}
