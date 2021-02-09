import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { Currency } from '../../currency.enum';

@InputType()
export class CreateExpenseInput {
  @Field()
  date: Date;

  @Field(() => Float)
  amount: number;

  @Field(() => Currency, { nullable: true })
  currency?: Currency;

  @Field(() => Float, { nullable: true })
  exchangeRate?: number;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => ID)
  userId: string;
}
