import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Role {
    @Field(type => ID)
    id: number;

    @Field(type => ID)
    roleId: number;

    @Field()
    name: string;
}
