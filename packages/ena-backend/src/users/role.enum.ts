import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    USER = 'user',
    VALIDATOR = 'validator',
    APPROVER = 'approver'
}

registerEnumType(Role, {
    name: 'Role',
});