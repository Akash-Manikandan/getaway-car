import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

interface HeaderOptions {
  accountId?: boolean;
  apiKey?: boolean;
  clientId?: boolean;
}

export function ApiAccountHeaders(options: HeaderOptions = {}) {
  const { accountId = true, apiKey = true, clientId = true } = options;
  const headers = [];
  if (accountId) {
    headers.push(
      ApiHeader({
        name: 'x-account-id',
        description: 'Account ID',
        required: true,
      }),
    );
  }

  if (apiKey) {
    headers.push(
      ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
      }),
    );
  }

  if (clientId) {
    headers.push(
      ApiHeader({
        name: 'x-client-id',
        description: 'Client ID',
        required: true,
      }),
    );
  }

  return applyDecorators(...headers);
}
