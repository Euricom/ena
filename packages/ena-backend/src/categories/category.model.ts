import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Expense } from 'src/expenses/expense.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

const DEFAULT_ACTIVE = true;

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => Int)
  generalLedgerAccount: number;

  @Field({ nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => ID)
  id: string;
}

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
