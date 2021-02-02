import { EntityRepository, Repository } from 'typeorm';
import { StatusType } from './status.enum';
import { Status } from './status.model';

@EntityRepository(Status)
export class StatusRepository extends Repository<Status> {
  findLatestByIds(ids: string[]): Promise<Status> {
    return this.createQueryBuilder()
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

  findByType(type: StatusType, onlyIfLatest: boolean): Promise<Status[]> {
    let query = this.createQueryBuilder().where({
      type,
    });

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

    return query.loadAllRelationIds().getMany();
  }
}
