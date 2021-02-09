import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field(() => Int)
  generalLedgerAccount: number;

  @Field({ nullable: true })
  active?: boolean;
}
