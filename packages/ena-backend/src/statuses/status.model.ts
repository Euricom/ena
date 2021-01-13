import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StatusType } from "src/statuses/statusType.model";
import { User } from "src/users/user.model";


@ObjectType()
export class Status {
    @Field(type => ID)
    id: number;
    
    @Field()
    date: Date;

    @Field({nullable: true})
    reason?: string;

    @Field()
    type: StatusType;
    
    @Field()
    user: User;
}