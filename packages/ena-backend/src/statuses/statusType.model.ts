import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusType {
    @Field(type => ID)
    id: number;

    @Field(type => ID)
    statusTypeId: number;

    @Field()
    name: string;
}
