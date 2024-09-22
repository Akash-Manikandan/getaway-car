import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccountClientGuard } from 'src/guards/account-client.guard';
import { Account } from 'src/decorators/account.decorator';
import { ApiAccountHeaders } from 'src/decorators/api-headers.decorator';
import { Header } from 'types/headers';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AccountGuard } from 'src/guards/account.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AccountGuard)
  @ApiAccountHeaders({ clientId: false })
  create(@Body() createUserDto: CreateUserDto, @Account() account: Header) {
    const accountId = account.accountId;
    return this.usersService.create(createUserDto, accountId);
  }

  @Get()
  @UseGuards(AccountClientGuard, JwtAuthGuard)
  @ApiAccountHeaders()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AccountClientGuard, JwtAuthGuard)
  @ApiAccountHeaders()
  findOne(@Param('id') id: string, @Account() account: Header) {
    console.log(account);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
