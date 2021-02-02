import { Field, ID, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Expense } from 'src/expenses/expense.model';
import { User } from 'src/users/user.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusType } from './status.enum';

const DEFAULT_STATUS_TYPE = StatusType.SUBMITTED;
const DEFAULT_REASON = '';

@InputType()
export class CreateStatusInput {
  @Field({ nullable: true })
  reason?: string;

  @Field(() => ID)
  expenseId: string;

  @Field(() => StatusType, { nullable: true })
  type?: StatusType;

  @Field(() => ID)
  userId: string;
}

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {
  @Field(() => ID)
  id: string;
}

@Entity()
@ObjectType()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column({ default: DEFAULT_REASON })
  @Field()
  reason: string;

  @ManyToOne(() => Expense, (expense) => expense.statuses)
  @Field(() => Expense)
  expense: Expense;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: DEFAULT_STATUS_TYPE,
  })
  @Field(() => StatusType)
  type: StatusType;

  @ManyToOne(() => User, (user) => user.statuses)
  @Field(() => User)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(status?: CreateStatusInput) {
    if (!status) {
      return;
    }

    this.reason = status.reason;
    this.type = status.type;

    this.user = new User();
    this.user.id = status.userId;

    this.expense = new Expense();
    this.expense.id = status.expenseId;
  }

  update(status: UpdateStatusInput): void {
    this.reason = status.reason || this.reason;
    this.type = status.type || this.type;

    if (status.userId) {
      this.user = new User();
      this.user.id = status.userId;
    }

    if (status.expenseId) {
      this.expense = new Expense();
      this.expense.id = status.expenseId;
    }
  }
}
