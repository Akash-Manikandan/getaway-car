import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/users/utils/verifyPassword';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.validateUser(email);
    if (user instanceof Error) {
      return user;
    }
    if (user) {
      const { password: passwordFetched, ...result } = user;
      const isPasswordCorrect = await verifyPassword(password, passwordFetched);
      if (isPasswordCorrect) {
        if (!user.isActive) {
          return new HttpException(
            'User is not active',
            HttpStatus.UNAUTHORIZED,
          );
        }
        return result;
      }
      return new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return null;
  }

  async login(user: LoginDto) {
    const validatedUser = await this.usersService.getUserByEmail(user.email);
    if (validatedUser instanceof Error) {
      throw validatedUser;
    }

    return {
      access_token: this.jwtService.sign({
        ...validatedUser,
        sub: validatedUser.id,
      }),
    };
  }
}
