import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AccountClientGuard } from 'src/guards/account-client.guard';
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountGuard } from 'src/guards/account.guard';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [UsersService, AccountClientGuard, AccountGuard, AccountsService],
  exports: [UsersService],
})
export class UsersModule {}
