import { setCustomQueryOptions } from 'src/common/custom-query-options';
import { ICustomQueryOptions } from 'src/common/custom-query-options';
import { StatusType } from 'src/statuses/status.enum';
import { Status } from 'src/statuses/status.model';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Expense } from './expense.model';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {
  async findByStatusType(
    statusType: StatusType,
    queryOptions?: ICustomQueryOptions,
  ): Promise<Expense[]> {
    const query = this.createFindByStatusTypeQuery(statusType, queryOptions);
    return await query.getMany();
  }

  async findByStatusTypeAndCount(
    statusType: StatusType,
    queryOptions?: ICustomQueryOptions,
  ): Promise<[Expense[], number]> {
    const query = this.createFindByStatusTypeQuery(statusType, queryOptions);
    return await query.getManyAndCount();
  }

  private createFindByStatusTypeQuery(
    statusType: StatusType,
    queryOptions?: ICustomQueryOptions,
  ): SelectQueryBuilder<Expense> {
    const query = this.createQueryBuilder('expense')
      .setParameter('statusType', statusType)
      .innerJoin(
        (qb) => {
          return qb
            .subQuery()
            .from(Status, 'status')
            .select('status.type', 'type')
            .addSelect('status.expenseId', 'expenseId')
            .innerJoin(
              (qb) => {
                return qb
                  .subQuery()
                  .from(Status, 'status')
                  .select('MAX(status.createdAt)', 'latestCreatedAt')
                  .addSelect('status.expenseId', 'expenseId')
                  .groupBy('status.expenseId');
              },
              'latestStatusInfo',
              '"latestStatusInfo"."expenseId" = status.expenseId AND "latestStatusInfo"."latestCreatedAt" = status.createdAt',
            );
        },
        'latestStatuses',
        '"latestStatuses"."expenseId" = expense.id AND "latestStatuses"."type" = :statusType',
      )
      .loadAllRelationIds();

    return setCustomQueryOptions(query, queryOptions);
  }
}
