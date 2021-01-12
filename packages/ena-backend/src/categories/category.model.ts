import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Category {
    @Field(type => ID)
    id: number;

    @Field({nullable: true})
    icon?: string;

    @Field()
    name: string;

    @Field(type => Int)
    generalLedgerAccount: number;

    @Field()
    active: boolean;
}
