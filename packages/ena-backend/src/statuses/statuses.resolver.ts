import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/users/user.model";
import { Status } from "./status.model";
import { StatusType } from "./statusType.model";

@Resolver(of => Status)
export class StatusesResolver {
  constructor(
  ) {}

  @Query(retuns => [Status], {name: 'statuses', nullable: 'items'})
  async getStatuses() {
    return [
      {
        id: 1,
    },
    {
      id: 2,
    }
    ]
  }

  @Query(returns => Status, {name: 'status'})
  async getStatus(@Args('id', { type: () => Int }) id: number) {
    return {
        id: id,
    };
  }


  @ResolveField('statusType', returns => StatusType)
  async getCategory(@Parent() status: Status) {
    const { id } = status;
    return {id}
  }

  @ResolveField('user', returns => User)
  async getUser(@Parent() status: Status) {
    const { id } = status;
    return {id}
  }
}