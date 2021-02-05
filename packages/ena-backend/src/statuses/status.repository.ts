import {
  ICustomQueryOptions,
  setCustomQueryOptions,
} from 'src/common/custom-query-options';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { StatusType } from './status.enum';
import { Status } from './status.model';

@EntityRepository(Status)
export class StatusRepository extends Repository<Status> {
  async findLatestByIds(ids: string[]): Promise<Status> {
    return await this.createQueryBuilder()
      .whereInIds(ids)
      .andWhere((qb) => {
        const query = qb
          .subQuery()
          .from(Status, 'Status')
          .select('MAX(Status.createdAt) as createdAt')
          .whereInIds(ids)
          .getQuery();
        return 'Status.createdAt in ' + query;
      })
      .loadAllRelationIds()
      .getOneOrFail();
  }

  async findByType(
    type: StatusType,
    onlyIfLatest: boolean,
    queryOptions?: ICustomQueryOptions,
  ): Promise<Status[]> {
    const query = this.createFindByTypeQuery(type, onlyIfLatest, queryOptions);
    return await query.getMany();
  }

  async findByTypeAndCount(
    type: StatusType,
    onlyIfLatest: boolean,
    queryOptions?: ICustomQueryOptions,
  ): Promise<[Status[], number]> {
    const query = this.createFindByTypeQuery(type, onlyIfLatest, queryOptions);
    return await query.getManyAndCount();
  }

  private createFindByTypeQuery(
    type: StatusType,
    onlyIfLatest: boolean,
    queryOptions?: ICustomQueryOptions,
  ): SelectQueryBuilder<Status> {
    let query = this.createQueryBuilder()
      .where({
        type,
      })
      .loadAllRelationIds();

    if (onlyIfLatest) {
      query = query.innerJoinAndSelect(
        (qb) => {
          return qb
            .subQuery()
            .from(Status, 'Status')
            .select(
              'MAX(Status.createdAt) as createdAt, Status.expense as expense',
            )
            .groupBy('Status.expense');
        },
        'joined',
        'Status.expense = joined.expense and Status.createdAt = joined.createdAt',
      );
    }

    return setCustomQueryOptions(query, queryOptions);
  }
}
