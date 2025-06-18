import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionService } from './permission.service';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { PermissionsGuard } from '../middlewares/guard/permissions.guard';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }
  @Permissions('permission_create')
  @Post()
  async create(@Body('name') name: string) {
    return this.permissionService.create(name);
  }
  @Permissions('permission_read')
  @Get()
  async findAll() {
    return this.permissionService.findAll();
  }
}
