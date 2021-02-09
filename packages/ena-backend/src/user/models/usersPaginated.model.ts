import { ObjectType } from '@nestjs/graphql';
import { PaginationResultClass } from 'src/common/models/pagination.model';
import { User } from './user.model';

@ObjectType()
export class UsersPaginated extends PaginationResultClass(User) {}
