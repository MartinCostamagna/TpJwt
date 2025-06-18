import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) { }

  async create(name: string): Promise<Permission> {
    const permission = this.permissionRepo.create({ name });
    return this.permissionRepo.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }

  async findByName(name: string): Promise<Permission | null> {
    return this.permissionRepo.findOne({ where: { name } });
  }
}
