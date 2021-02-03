import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersResolver } from './users/users.resolver';
import { ExpensesResolver } from './expenses/expenses.resolver';
import { StatusesResolver } from './statuses/statuses.resolver';
import { CategoriesResolver } from './categories/categories.resolve';
import { AzureADStrategy } from './authentication/azure-ad.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersResolver,
    CategoriesResolver,
    ExpensesResolver,
    StatusesResolver,
    AzureADStrategy,
  ],
})
export class AppModule {}
