import { Controller, Post, Param, ParseIntPipe, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { PermissionsGuard } from '../middlewares/guard/permissions.guard';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post(':id/roles')
  async assignRoles(
    @Param('id', ParseIntPipe) userId: number,
    @Body('roleIds') roleIds: number[],
  ) {
    return this.usersService.assignRoles(userId, roleIds);
  }
  @Permissions('users_read')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Permissions('users_read')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
