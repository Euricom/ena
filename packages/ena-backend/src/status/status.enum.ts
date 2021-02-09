import { registerEnumType } from '@nestjs/graphql';

export enum StatusType {
  SUBMITTED = 'submitted',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
  APPROVED = 'approved',
  REIMBURSED = 'reimbursed',
}

registerEnumType(StatusType, {
  name: 'StatusType',
});
