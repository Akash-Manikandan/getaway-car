import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAllAccounts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOneAccount(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountsService.update(id, updateAccountDto);
  // }

  @Delete(':id')
  deactivateAccount(@Param('id') id: string) {
    console.log();
    return this.accountsService.deactivateAccount(id);
  }
}
