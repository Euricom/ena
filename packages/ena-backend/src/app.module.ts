import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersResolver } from './users/users.resolver';
import { ExpensesResolver } from './expenses/expenses.resolver';
import { StatusesResolver } from './statuses/statuses.resolver';
import { CategoriesResolver } from './categories/categories.resolve';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.model';
import { Expense } from './expenses/expense.model';
import { Status } from './statuses/status.model';
import { Category } from './categories/category.model';
import { UserService } from './users/users.service';
import { StatusService } from './statuses/status.service';
import { ExpenseService } from './expenses/expense.service';
import { CategoryService } from './categories/category.service';
import { StatusRepository } from './statuses/status.repository';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: [User, Expense, Status, Category],
      synchronize: true //disable voor productie
    }),
    TypeOrmModule.forFeature([User, Expense, Status, Category, StatusRepository])
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver, CategoriesResolver, ExpensesResolver, StatusesResolver, UserService, StatusService, ExpenseService, CategoryService],
})
export class AppModule {}
