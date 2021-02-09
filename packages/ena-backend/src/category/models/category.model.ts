import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expense } from 'src/expense/models/expense.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateCategoryInput } from './inputs/createCategory.input';
import { UpdateCategoryInput } from './inputs/updateCategory.input';

const DEFAULT_ACTIVE = true;

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // @Column()
  // @Field()
  // icon: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  generalLedgerAccount: number;

  @Column({ default: DEFAULT_ACTIVE })
  @Field()
  active: boolean;

  @OneToMany(() => Expense, (expense) => expense.category)
  @Field(() => [Expense], { nullable: 'items' })
  expenses: Expense[];

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(createData?: CreateCategoryInput) {
    if (!createData) {
      return;
    }

    this.name = createData.name;
    this.generalLedgerAccount = createData.generalLedgerAccount;
    this.active = createData.active;
  }

  update(updateData: UpdateCategoryInput): void {
    this.name = updateData.name || this.name;
    this.generalLedgerAccount =
      updateData.generalLedgerAccount || this.generalLedgerAccount;
    this.active = updateData.active || this.active;
  }
}
