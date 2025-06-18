import { Body, Controller, Post, Param, ParseIntPipe, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesService } from './roles.service';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { PermissionsGuard } from '../middlewares/guard/permissions.guard';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }
  @Permissions('roles_create')
  @Post()
  async create(@Body('name') name: string) {
    return this.rolesService.create(name);
  }
  @Permissions('roles_update')
  @Post(':id/permissions')
  async assignPermissions(
    @Param('id', ParseIntPipe) roleId: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    return this.rolesService.assignPermissions(roleId, permissionIds);
  }
  @Permissions('roles_read')
  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }
}
