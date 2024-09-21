import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { users } from 'src/drizzle/schema';

type NewUser = typeof users.$inferInsert;
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Name of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: NewUser['name'];

  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: NewUser['email'];

  @ApiProperty({
    type: String,
    description: 'Password of the user',
  })
  @IsString()
  @MinLength(8)
  readonly password: NewUser['password'];
}
