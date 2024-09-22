// src/guards/account.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AccountsService } from '../accounts/accounts.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountClientGuard implements CanActivate {
  constructor(
    private readonly accountService: AccountsService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const accountId = request.headers['x-account-id'] as string;
    const apiKey = request.headers['x-api-key'] as string;
    const clientId = request.headers['x-client-id'] as string;

    if (!accountId || !apiKey || !clientId) {
      throw new UnauthorizedException(
        'Account ID, API key, and Client ID must be provided',
      );
    }

    const account = await this.accountService.getApiKey(accountId);
    if (!account || account.apiKey !== apiKey) {
      throw new UnauthorizedException('Invalid API key or account');
    }
    if (!account.isActive) {
      throw new UnauthorizedException('Account is not active');
    }

    const user = await this.userService.accountValidation(clientId, accountId); // Assuming request.user contains authenticated user
    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user instanceof HttpException) {
      throw user;
    }
    if (!user || user.clientId !== clientId) {
      throw new UnauthorizedException('User does not belong to this client ID');
    }

    return true;
  }
}
