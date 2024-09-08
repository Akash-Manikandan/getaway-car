import { users } from 'src/drizzle/schema';

type NewUser = typeof users.$inferInsert;

export class CreateUserDto {
  readonly email: NewUser['email'];
  readonly password: NewUser['password'];
}
