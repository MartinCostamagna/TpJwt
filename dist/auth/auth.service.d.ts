import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        roles: import("../entities/role.entity").Role[];
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
