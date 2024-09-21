import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.transaction(async (tx) => {
      const [user] = await tx
        .insert(schema.user)
        .values({
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        }).returning({ id: schema.user.id });
      const [account] = await tx.select({
        id: schema.account.id,
      }).from(schema.account).where(eq(schema.account.id, createUserDto.accountId));
      await tx.insert(schema.accountTouser).values({
        accountId: account.id,
        userId: user.id,
      });
      return user
    })
    return user;
  }

  async findAll() {
    const users = await this.db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        password: schema.user.password,
        account: {
          id: schema.account.id,
          name: schema.account.name,
        },
      }).from(schema.accountTouser)
      .leftJoin(schema.user, eq(schema.accountTouser.userId, schema.user.id))
      .leftJoin(schema.account, eq(schema.accountTouser.accountId, schema.account.id));
    return users;
  }

  async findOne(id: string) {
    const user = await this.db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id));
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
