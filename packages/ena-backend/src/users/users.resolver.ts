import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AzureADGuard } from 'src/authentication/azure-ad.guard';
import { Expense } from 'src/expenses/expense.model';
import { Role } from './role.model';
import { User } from './user.model';

@Resolver((of) => User)
@UseGuards(AzureADGuard)
export class UsersResolver {
  constructor() {}

  @Query((retuns) => [User], { name: 'users', nullable: 'items' })
  async getUsers() {
    return [
      {
        id: 1,
        firstName: 'Mathias',
        lastName: 'Samyn',
      },
      {
        id: 2,
        firstName: 'Mathias',
        lastName: 'Samyn',
      },
    ];
  }

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return {
      id: id,
      firstName: 'Mathias',
      lastName: 'Samyn',
    };
  }

  @ResolveField('expenses', (returns) => [Expense])
  async getExpenses(@Parent() user: User) {
    const { id } = user;
    return { id };
  }

  @ResolveField('roles', (returns) => [Role])
  async getRoles(@Parent() user: User) {
    const { id } = user;
    return { id };
  }
}
