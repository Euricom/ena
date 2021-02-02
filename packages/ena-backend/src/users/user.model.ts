import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Expense } from 'src/expenses/expense.model';
import { Status } from 'src/statuses/status.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';

const DEFAULT_ROLES = [Role.USER];
const DEFAULT_ACTIVE = true;

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

  @Field(() => Int)
  costCenter: number;

  @Field(() => Int)
  vendorAccount: number;

  @Field(() => [Role], { nullable: 'itemsAndList' })
  roles?: Role[];

  @Field({ nullable: true })
  active?: boolean;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
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
  @Field(() => Int)
  costCenter: number;

  @Column()
  @Field(() => Int)
  vendorAccount: number;

  @Column({ default: DEFAULT_ACTIVE })
  @Field()
  active: boolean;

  @OneToMany(() => Expense, (expense) => expense.user, {
    cascade: ['soft-remove', 'recover'],
  })
  @Field(() => [Expense], { nullable: 'items' })
  expenses: Expense[];

  @OneToMany(() => Status, (status) => status.user)
  @Field(() => [Status], { nullable: 'items' })
  statuses: Status[];

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: DEFAULT_ROLES,
  })
  @Field(() => [Role])
  roles: Role[];

  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(createData?: CreateUserInput) {
    if (!createData) {
      return;
    }

    this.firstName = createData.firstName;
    this.lastName = createData.lastName;

    this.email = createData.email;

    this.bankAccountNumber = createData.bankAccountNumber;
    this.costCenter = createData.costCenter;
    this.vendorAccount = createData.vendorAccount;

    this.roles = createData.roles;
    this.active = createData.active;
  }

  update(updateData: UpdateUserInput): void {
    this.firstName = updateData.firstName || this.firstName;
    this.lastName = updateData.lastName || this.lastName;

    this.email = updateData.email || this.email;

    this.bankAccountNumber =
      updateData.bankAccountNumber || this.bankAccountNumber;
    this.costCenter = updateData.costCenter || this.costCenter;
    this.vendorAccount = updateData.vendorAccount || this.vendorAccount;

    this.roles = updateData.roles || this.roles;
    this.active = updateData.active || this.active;
  }
}
