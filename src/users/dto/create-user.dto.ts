import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
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
  @MinLength(3)
  readonly name: NewUser['name'];

  @ApiProperty({
    type: String,
    description: 'Email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  readonly email: NewUser['email'];

  @ApiProperty({
    type: String,
    description: 'Password of the user',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  readonly password: NewUser['password'];
}
