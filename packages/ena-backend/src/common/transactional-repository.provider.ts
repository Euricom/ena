import { Injectable, Scope } from '@nestjs/common';
import {
  getRepository,
  Repository,
  EntityTarget,
  ObjectType,
  getCustomRepository,
} from 'typeorm';
import { UnitOfWorkProvider } from './unit-of-work.provider';

@Injectable({ scope: Scope.REQUEST })
export class TransactionalRepositoryProvider {
  constructor(private uow: UnitOfWorkProvider) {}

  /**
   * Gets a repository bound to the current transaction manager
   * or defaults to the current connection's call to getRepository().
   */
  getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity> {
    const transactionManager = this.uow.getTransactionManager();
    if (transactionManager) {
      return transactionManager.getRepository(target);
    }

    return getRepository(target);
  }

  /**
   * Gets a custom repository bound to the current transaction manager
   * or defaults to the current connection's call to getCustomRepository().
   */
  getCustomRepository<CustomRepository>(
    target: ObjectType<CustomRepository>,
  ): CustomRepository {
    const transactionManager = this.uow.getTransactionManager();
    if (transactionManager) {
      return transactionManager.getCustomRepository(target);
    }

    return getCustomRepository(target);
  }
}
