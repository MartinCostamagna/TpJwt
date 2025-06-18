import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
export declare class RolesService {
    private readonly roleRepo;
    private readonly permissionRepo;
    constructor(roleRepo: Repository<Role>, permissionRepo: Repository<Permission>);
    create(name: string): Promise<Role>;
    assignPermissions(roleId: number, permissionIds: number[]): Promise<Role>;
    findAll(): Promise<Role[]>;
}
