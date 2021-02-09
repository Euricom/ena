import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.model';
import { Expense } from './expenses/expense.model';
import { Status } from './statuses/status.model';
import { Category } from './categories/category.model';
import { StatusService } from './statuses/status.service';
import { ExpenseService } from './expenses/expense.service';
import { CategoryService } from './categories/category.service';
import { StatusRepository } from './statuses/status.repository';
import { TransactionalRepositoryProvider } from './common/transactional-repository.provider';
import { UnitOfWorkProvider } from './common/unit-of-work.provider';
import { ConfigModule } from '@nestjs/config';
import { CategoryResolver } from './categories/category.resolver';
import { ExpenseResolver } from './expenses/expense.resolver';
import { UserResolver } from './users/user.resolver';
import { UserService } from './users/user.service';
import { StatusResolver } from './statuses/status.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Expense, Status, Category],
        synchronize: process.env.ENV === 'development',
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Expense,
      Status,
      Category,
      StatusRepository,
    ]),
  ],
  providers: [
    UserResolver,
    CategoryResolver,
    ExpenseResolver,
    StatusResolver,
    UserService,
    StatusService,
    ExpenseService,
    CategoryService,
    TransactionalRepositoryProvider,
    UnitOfWorkProvider,
  ],
})
export class AppModule {}
