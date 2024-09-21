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
    const user = await this.db
      .insert(schema.user)
      .values({
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
      })
      .returning({ id: schema.user.id });
    return user;
  }

  async findAll() {
    const users = await this.db.select().from(schema.user);
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
