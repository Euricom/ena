import { GraphQLModule } from '@nestjs/graphql';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { UsersResolver } from './users/users.resolver';
import { ExpensesResolver } from './expenses/expenses.resolver';
import { StatusesResolver } from './statuses/statuses.resolver';
import { CategoriesResolver } from './categories/categories.resolve';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver, CategoriesResolver, ExpensesResolver, StatusesResolver],
})
export class AppModule {}
