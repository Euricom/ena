import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  skip: number;
  @Field(() => Int)
  take: number;
}
