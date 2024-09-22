// src/guards/account.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private readonly accountService: AccountsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const accountId = request.headers['x-account-id'] as string;
    const apiKey = request.headers['x-api-key'] as string;

    if (!accountId || !apiKey) {
      throw new UnauthorizedException(
        'Account ID and API key must be provided',
      );
    }

    const account = await this.accountService.getApiKey(accountId);
    if (!account || account.apiKey !== apiKey) {
      throw new UnauthorizedException('Invalid API key or account');
    }
    if (!account.isActive) {
      throw new UnauthorizedException('Account is not active');
    }

    return true;
  }
}
