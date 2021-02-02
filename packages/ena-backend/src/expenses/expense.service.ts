import { Injectable, ShutdownSignal } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/crud.service';
import { StatusRepository } from 'src/statuses/status.repository';
import { StatusService } from 'src/statuses/status.service';
import { Connection, Repository } from 'typeorm';
import { CreateExpenseInput, Expense, UpdateExpenseInput } from './expense.model';


@Injectable()
export class ExpenseService extends CrudService<Expense, CreateExpenseInput, UpdateExpenseInput> {
    constructor(
        @InjectRepository(Expense)
        private expenseRepository: Repository<Expense>,
        private statusService: StatusService,
        private connection: Connection
    ) {
        super(expenseRepository)
    }

    async create(expense: CreateExpenseInput): Promise<Expense> {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          const expenseRepository = await queryRunner.manager.getRepository(Expense);
          const statusRepository = await queryRunner.manager.getCustomRepository(StatusRepository);


          const newExpense = await expenseRepository.save({
            ...expense,
            user: {
                id: expense.userId
            },
            category: {
                id: expense.categoryId
            }
        })
        
        await this.statusService.create({
            userId: expense.userId,
            expenseId: newExpense.id
        }, statusRepository)


          await queryRunner.commitTransaction();
        } catch (err) {
          // since we have errors lets rollback the changes we made
          await queryRunner.rollbackTransaction();
        } finally {
          // you need to release a queryRunner which was manually instantiated
          await queryRunner.release();
        }




        const e = await this.expenseRepository.save({
            ...expense,
            user: {
                id: expense.userId
            },
            category: {
                id: expense.categoryId
            }
        })
        
        await this.statusService.create({
            userId: expense.userId,
            expenseId: e.id
        })

        return this.findOne(e.id)
    }

    async update(expense: UpdateExpenseInput): Promise<Expense> {
        const oldExpense = await this.expenseRepository.findOneOrFail(expense.id, {loadRelationIds: true});
        //TODO: kan beter?
        const newExpense = {
            ...oldExpense, 
            ...expense, 
            user: {
                id: expense.userId || oldExpense.user
            },
            category: {
                id: expense.categoryId || oldExpense.category
            },
        } as Expense;

        return await this.expenseRepository.save(newExpense);
    }
}
