import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { user } from 'src/drizzle/schema';
import { ApiProperty } from '@nestjs/swagger';

type NewUser = typeof user.$inferInsert;

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

  @ApiProperty({
    type: String,
    description: 'Account id',
  })
  @IsString()
  readonly accountId: string;
}
