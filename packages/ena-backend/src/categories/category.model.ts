import { Field, ID, InputType, Int, ObjectType, PartialType } from "@nestjs/graphql";
import { Expense } from "src/expenses/expense.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

const  DEFAULT_ACTIVE = true;

@Entity()
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;

    // @Column()
    // @Field()
    // icon: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field(type => Int)
    generalLedgerAccount: number;

    @Column({default: DEFAULT_ACTIVE})
    @Field()
    active: boolean;

    @OneToMany(type => Expense, expense => expense.category)
    @Field(type => [Expense], {nullable: 'items'})
    expenses: Expense[]
}

@InputType()
export class CreateCategoryInput {
    @Field()
    name: string;

    @Field(type => Int)
    generalLedgerAccount: number;

    @Field({nullable: true})
    active?: boolean;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
    @Field(type => ID)
    id: string;
}
