import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { users } from 'src/drizzle/schema';

type NewUser = typeof users.$inferInsert;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: NewUser['name'];

  @IsEmail()
  @IsNotEmpty()
  readonly email: NewUser['email'];

  @IsString()
  @MinLength(8)
  readonly password: NewUser['password'];
}
