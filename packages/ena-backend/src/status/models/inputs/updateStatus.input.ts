import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateStatusInput } from './createStatus.input';

@InputType()
export class UpdateStatusInput extends PartialType(CreateStatusInput) {
  @Field(() => ID)
  id: string;
}
