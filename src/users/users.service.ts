import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';

import { hashPassword } from './utils/hashPassword';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await hashPassword(createUserDto.password);
      const user = await this.db.transaction(async (tx) => {
        const [user] = await tx
          .insert(schema.user)
          .values({
            name: createUserDto.name,
            email: createUserDto.email,
            password: password,
          })
          .returning({ id: schema.user.id });
        const [account] = await tx
          .select({
            id: schema.account.id,
          })
          .from(schema.account)
          .where(eq(schema.account.id, createUserDto.accountId));
        await tx.insert(schema.accountTouser).values({
          accountId: account.id,
          userId: user.id,
        });
        return user;
      });
      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll() {
    try {
      const users = await this.db
        .select({
          id: schema.user.id,
          name: schema.user.name,
          email: schema.user.email,
          account: {
            id: schema.account.id,
            name: schema.account.name,
          },
        })
        .from(schema.accountTouser)
        .leftJoin(schema.user, eq(schema.accountTouser.userId, schema.user.id))
        .leftJoin(
          schema.account,
          eq(schema.accountTouser.accountId, schema.account.id),
        );
      return users;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: string) {
    try {
      const [user] = await this.db
        .select({
          id: schema.user.id,
          name: schema.user.name,
          email: schema.user.email,
        })
        .from(schema.user)
        .where(eq(schema.user.id, id));
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
