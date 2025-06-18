import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) { }

  async assignRoles(userId: number, roleIds: number[]): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['roles'] });
    const roles = await this.roleRepo.findByIds(roleIds);
    user.roles = [...(user.roles || []), ...roles];
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id }, relations: ['roles', 'roles.permissions'] });
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      relations: ['roles', 'roles.permissions'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }
}