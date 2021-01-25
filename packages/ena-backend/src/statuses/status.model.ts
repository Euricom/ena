import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Expense } from "src/expenses/expense.model";
import { User } from "src/users/user.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusType } from './status.enum'

const DEFAULT_STATUS_TYPE = StatusType.SUBMITTED;
const DEFAULT_REASON = '';

@Entity()
@ObjectType()
export class Status {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID)
    id: string;
    
    @CreateDateColumn()
    @Field()
    date: Date;

    @Column({default: DEFAULT_REASON})
    @Field()
    reason: string;

    @ManyToOne(type => Expense, expense => expense.statuses)
    @Field(type => Expense)
    expense: Expense;

    @Column({
        type: "enum",
        enum: StatusType,
        default: DEFAULT_STATUS_TYPE
    })
    @Field(type => StatusType)
    type: StatusType
    
    @ManyToOne(type => User, user => user.statuses)
    @Field(type => User)
    user: User;
}

@InputType()
export class StatusInput {
    @Field({defaultValue: DEFAULT_REASON})
    reason?: string;

    @Field(type => ID)
    expenseId: string;
    
    @Field(type => StatusType, {
        defaultValue: DEFAULT_STATUS_TYPE
    })
    type?: StatusType
    
    @Field(type => ID)
    userId: string;
}