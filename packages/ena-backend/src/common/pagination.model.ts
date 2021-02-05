import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  skip: number;
  @Field(() => Int)
  take: number;
}

//https://typegraphql.com/docs/generic-types.html

export function PaginationResultClass<T>(TClass: new (...args: any) => T): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginationResult {
    @Field(() => [TClass], { nullable: 'items' })
    items: T[];

    @Field(() => Int)
    total: number;

    constructor(items: T[], total: number) {
      this.total = total;
      this.items = items;
    }
  }
  return PaginationResult;
}
