import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateExpenseInput } from './createExpense.input';

@InputType()
export class UpdateExpenseInput extends PartialType(CreateExpenseInput) {
  @Field(() => ID)
  id: string;
}
