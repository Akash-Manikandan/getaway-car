import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Account = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const accountId = request.headers['x-account-id'] ?? '';
    const apiKey = request.headers['x-api-key'] ?? '';
    const clientId = request.headers['x-client-id'] ?? '';

    return { accountId, apiKey, clientId };
  },
);
