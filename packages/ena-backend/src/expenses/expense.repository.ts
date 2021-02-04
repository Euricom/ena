import { StatusType } from 'src/statuses/status.enum';
import { Status } from 'src/statuses/status.model';
import { EntityRepository, Repository } from 'typeorm';
import { Expense } from './expense.model';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {
  findByStatusType(statusType: StatusType): Promise<Expense[]> {
    return this.createQueryBuilder('expense')
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
      .loadAllRelationIds()
      .getMany();
  }
}
