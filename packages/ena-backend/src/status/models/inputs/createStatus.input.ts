import { Field, ID, InputType } from '@nestjs/graphql';
import { StatusType } from '../../status.enum';

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
