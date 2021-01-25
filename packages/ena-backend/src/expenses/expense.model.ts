import { ArgsType, Field, Float, ID, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Status } from "src/statuses/status.model";
import { Category } from "src/categories/category.model";
import { User, CreateUserInput } from "src/users/user.model";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

const DEFAULT_REASON = '';

@Entity()
@ObjectType()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;

    @Column()
    @Field()
    date: Date;

    @Column('decimal')
    @Field(type => Float)
    amount: number;

    @Column({default: DEFAULT_REASON})
    @Field()
    reason: string;

    @OneToMany(type => Status, status => status.expense)
    @Field(type => [Status])
    statuses: Status[];

    @ManyToOne(type => Category, category => category.expenses)
    @Field()
    category: Category;

    @ManyToOne(type => User, user => user.expenses)
    @Field(type => User)
    user: User;
}

@InputType()
export class ExpenseInput {
    @Field()
    date: Date;

    @Field(type => Float)
    amount: number;

    @Field({defaultValue: DEFAULT_REASON})
    reason?: string;

    @Field(type => ID)
    categoryId: string;

    @Field(type => ID)
    userId: string;
}