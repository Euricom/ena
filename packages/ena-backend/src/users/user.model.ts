import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Expense } from 'src/expenses/expense.model';
import { Role } from './role.model';

@ObjectType()
export class User {
    @Field(type => ID)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    bankAccountNumber: string;

    @Field(type => Int)
    costCenter: number;

    @Field(type => Int)
    vendorAccount: number;

    @Field()
    active: boolean;

    @Field(type => [Expense], {nullable: 'items'})
    expenses: Expense[];

    @Field(type => [Role])
    roles: Role[];
}


