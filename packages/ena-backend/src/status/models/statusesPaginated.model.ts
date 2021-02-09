import { ObjectType } from '@nestjs/graphql';
import { PaginationResultClass } from 'src/common/models/pagination.model';
import { Status } from './status.model';

@ObjectType()
export class StatusesPaginated extends PaginationResultClass(Status) {}
