import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) { }

  async create(name: string): Promise<Role> {
    const role = this.roleRepo.create({ name });
    return this.roleRepo.save(role);
  }

  async assignPermissions(roleId: number, permissionIds: number[]): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id: roleId }, relations: ['permissions'] });
    const permissions = await this.permissionRepo.findByIds(permissionIds);
    role.permissions = [...(role.permissions || []), ...permissions];
    return this.roleRepo.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }
}
