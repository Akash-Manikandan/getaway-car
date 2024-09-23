import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiAccountHeaders } from 'src/decorators/api-headers.decorator';
import { AccountGuard } from 'src/guards/account.guard';
import { UpdateAccountDto } from './dto/update-account.dto';
@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseGuards(AccountGuard)
  @ApiAccountHeaders({ clientId: false })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Get()
  @UseGuards(AccountGuard)
  @ApiAccountHeaders({ clientId: false })
  findAll() {
    return this.accountsService.findAllAccounts();
  }

  @Get(':id')
  @UseGuards(AccountGuard)
  @ApiAccountHeaders({ clientId: false })
  findOne(@Param('id') id: string) {
    return this.accountsService.findOneAccount(id);
  }

  @Patch(':id')
  @UseGuards(AccountGuard)
  @ApiAccountHeaders()
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @UseGuards(AccountGuard)
  @ApiAccountHeaders()
  deactivateAccount(@Param('id') id: string) {
    return this.accountsService.deactivateAccount(id);
  }
}
