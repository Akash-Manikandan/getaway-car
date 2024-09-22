import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AccountClientGuard } from 'src/guards/account-client.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DrizzleModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountClientGuard, UsersService],
  exports: [AccountsService],
})
export class AccountsModule {}
