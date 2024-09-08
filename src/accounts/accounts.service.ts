import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
// import { UpdateAccountDto } from './dto/update-account.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    await this.db.insert(schema.accounts).values({
      name: createAccountDto.name,
      country: createAccountDto.country,
    });
  }

  async findAllAccounts() {
    const result = await this.db.select().from(schema.accounts);
    return result;
  }

  async findOneAccount(id: string) {
    const result = await this.db
      .select()
      .from(schema.accounts)
      .where(eq(schema.accounts.id, id));
    return result;
  }

  async deactivateAccount(id: string) {
    await this.db
      .update(schema.accounts)
      .set({ name: 'hi' })
      .where(eq(schema.accounts.id, id));
  }

  async editName() {}

  async editCountry() {}
}
