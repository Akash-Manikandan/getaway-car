import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
