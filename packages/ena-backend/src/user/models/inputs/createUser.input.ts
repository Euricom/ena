import { Field, InputType, Int } from '@nestjs/graphql';
import { Role } from '../../role.enum';

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
