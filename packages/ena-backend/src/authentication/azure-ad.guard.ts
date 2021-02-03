import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor(configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>(
        'NEST_API_AD_TENANT',
      )}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('NEST_API_AD_CLIENT'),
    });
  }

  async validate(data) {
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
