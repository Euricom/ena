import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Status } from "src/statuses/status.model";
import { Category } from "src/categories/category.model";

@ObjectType()
export class Expense {
    @Field(type => ID)
    id: number;

    @Field()
    date: Date;

    @Field(type => Float)
    amount: number;

    @Field({nullable: true})
    reason?: string;

    @Field(type => [Status])
    statuses: Status[];

    @Field()
    category: Category;
}