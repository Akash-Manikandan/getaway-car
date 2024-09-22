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
    await this.db.insert(schema.account).values({
      name: createAccountDto.name,
    });
  }

  async findAllAccounts() {
    const result = await this.db.select().from(schema.account);
    return result;
  }

  async findOneAccount(id: string) {
    const result = await this.db
      .select()
      .from(schema.account)
      .where(eq(schema.account.id, id));
    return result;
  }

  async deactivateAccount(id: string) {
    await this.db
      .update(schema.account)
      .set({ name: 'hi' })
      .where(eq(schema.account.id, id));
  }

  async getApiKey(id: string) {
    const [result] = await this.db
      .select({
        apiKey: schema.account.apiKey,
        isActive: schema.account.isActive,
      })
      .from(schema.account)
      .where(eq(schema.account.id, id));
    return result;
  }

  // async editName() {}

  // async editCountry() {}
}
