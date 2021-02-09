import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.model';
import { Expense } from './expense/models/expense.model';
import { Status } from './status/models/status.model';
import { Category } from './category/models/category.model';
import { StatusService } from './status/status.service';
import { ExpenseService } from './expense/expense.service';
import { CategoryService } from './category/category.service';
import { StatusRepository } from './status/status.repository';
import { TransactionalRepositoryProvider } from './common/services/transactionalRepository.provider';
import { UnitOfWorkProvider } from './common/services/unitOfWork.provider';
import { ConfigModule } from '@nestjs/config';
import { CategoryResolver } from './category/category.resolver';
import { ExpenseResolver } from './expense/expense.resolver';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';
import { StatusResolver } from './status/status.resolver';

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
