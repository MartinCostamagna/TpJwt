import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(name: string): Promise<import("../entities/role.entity").Role>;
    assignPermissions(roleId: number, permissionIds: number[]): Promise<import("../entities/role.entity").Role>;
    findAll(): Promise<import("../entities/role.entity").Role[]>;
}
