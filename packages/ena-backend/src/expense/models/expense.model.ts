import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Status } from 'src/status/models/status.model';
import { Category } from 'src/category/models/category.model';
import { User } from 'src/user/models/user.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from '../currency.enum';
import { CreateExpenseInput } from './inputs/createExpense.input';
import { UpdateExpenseInput } from './inputs/updateExpense.input';

const DEFAULT_REASON = '';
const DEFAULT_CURRENCY = Currency.EUR;
const DEFAULT_EXCHANGE_RATE = 1;

@Entity()
@ObjectType()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  date: Date;

  @Column('decimal')
  @Field(() => Float)
  amount: number;

  @Column({
    type: 'enum',
    enum: Currency,
    default: DEFAULT_CURRENCY,
  })
  @Field(() => Currency)
  currency: Currency;

  @Column('decimal', { default: DEFAULT_EXCHANGE_RATE })
  @Field(() => Float)
  exchangeRate: number;

  @Column({ default: DEFAULT_REASON })
  @Field()
  reason: string;

  @OneToMany(() => Status, (status) => status.expense, { cascade: ['insert'] })
  @Field(() => [Status])
  statuses: Status[];

  @Field(() => Status)
  latestStatus: Status;

  @ManyToOne(() => Category, (category) => category.expenses)
  @Field()
  category: Category;

  @ManyToOne(() => User, (user) => user.expenses)
  @Field(() => User)
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(createData?: CreateExpenseInput) {
    if (!createData) {
      return;
    }

    this.category = new Category();
    this.category.id = createData.categoryId;

    this.user = new User();
    this.user.id = createData.userId;

    this.date = createData.date;
    this.amount = createData.amount;
    this.reason = createData.reason;
    this.currency = createData.currency;
    this.exchangeRate = createData.exchangeRate;
  }

  update(updateData: UpdateExpenseInput): void {
    if (updateData.categoryId) {
      this.category = new Category();
      this.category.id = updateData.categoryId;
    }

    if (updateData.userId) {
      this.user = new User();
      this.user.id = updateData.userId;
    }

    this.date = updateData.date || this.date;
    this.amount = updateData.amount || this.amount;
    this.reason = updateData.reason || this.reason;
    this.currency = updateData.currency || this.currency;
  }
}
