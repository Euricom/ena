import { registerEnumType } from "@nestjs/graphql";

export enum StatusType {
    SUBMITTED = 'submitted',
    REJECTED = 'rejected',
    APPROVED = 'approved',
    REIMBURSED = 'reimbursed'
}

registerEnumType(StatusType, {
    name: 'StatusType',
});