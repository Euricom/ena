import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expense } from 'src/expense/models/expense.model';
import { Status } from 'src/status/models/status.model';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserInput } from './inputs/createUser.input';
import { Role } from '../role.enum';
import { UpdateUserInput } from './inputs/updateUser.input';

const DEFAULT_ROLES = [Role.USER];
const DEFAULT_ACTIVE = true;

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

  @Column({ unique: true })
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
