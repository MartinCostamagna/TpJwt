import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService {
    private readonly permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(name: string): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findByName(name: string): Promise<Permission | null>;
}
