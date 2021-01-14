import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = 'TEST';
const tenantID = 'TEST';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data) {
    console.log(data);
    return data;
  }
}

@Injectable()
export class AzureADGuard extends AuthGuard('azure-ad') {
  getRequest(context: ExecutionContext) {
    const gql = GqlExecutionContext.create(context);
    return gql.getContext().req;
  }
}
