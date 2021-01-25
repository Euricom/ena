import { Field, ID, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql'
import { Expense } from 'src/expenses/expense.model';
import { Status } from 'src/statuses/status.model';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

const DEFAULT_ROLES = [Role.USER];
const DEFAULT_ACTIVE = true;

@Entity()
@ObjectType()
export class User { 
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    bankAccountNumber: string;

    @Column()
    @Field(type => Int)
    costCenter: number;

    @Column()
    @Field(type => Int)
    vendorAccount: number;

    @Column({default: DEFAULT_ACTIVE})
    @Field()
    active: boolean;

    @OneToMany(type => Expense, expense => expense.user)
    @Field(type => [Expense], {nullable: 'items'})
    expenses: Expense[];

    @OneToMany(type => Status, status => status.user)
    @Field(type => [Status], {nullable: 'items'})
    statuses: Status[]

    @Column({
        type: "enum",
        enum: Role,
        array: true,
        default: DEFAULT_ROLES
    })
    @Field(type => [Role])
    roles: Role[]

    @DeleteDateColumn()
    deletedAt?: Date
}

@InputType()
export class CreateUserInput {
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

    @Field(type => [Role], {nullable: 'itemsAndList'})
    roles?: Role[];

    @Field({nullable: true})
    active?: boolean;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(type => ID)
    id: string
}
